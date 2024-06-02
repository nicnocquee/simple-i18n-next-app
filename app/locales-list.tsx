import { promises as fs } from "node:fs";
import path from "node:path";
import * as React from "react";
import NoLocale from "./no-locale";
import { getLanguages } from "simple-i18n-next/dist/generate-locale";
import { DefaultLanguageChange } from "./default-language";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function LocalesList({
  initialPath,
  defaultLanguage,
}: {
  initialPath?: string;
  defaultLanguage?: string;
}) {
  const cwd = process.env.ORIGINAL_CWD || process.cwd();
  const thePath = initialPath || path.join(cwd, "locales");

  let files: string[] = [];
  let languages: { langs: string[]; invalidLangs: string[] } | undefined =
    undefined;
  try {
    // check if thePath is a valid directory
    const stats = await fs.stat(thePath);
    if (!stats.isDirectory()) {
      console.log(`${thePath} is not a valid directory`);
    } else {
      languages = getLanguages(thePath);
    }
  } catch (error) {
    console.log(`No locales found in ${thePath}`, error);
  }

  if (!languages) {
    return <NoLocale thePath={thePath} />;
  }

  let defaultLanguageToUse = defaultLanguage;

  if (!defaultLanguageToUse) {
    try {
      const typesFile = path.join(thePath, ".generated", "types.ts");
      const stats = await fs.stat(typesFile);
      if (!stats.isFile()) {
        console.log(`No types file found in ${thePath}`);
      } else {
        const typesFileContent = await fs.readFile(typesFile, "utf8");
        const match = typesFileContent.match(
          /export\s+const\s+defaultLanguage:\s*SupportedLanguage\s*=\s*'(\w+)';/
        );
        if (match && match.length > 1 && match[1]) {
          defaultLanguageToUse = match[1];
        }
      }
    } catch (error) {
      console.log(`No types file found in ${thePath}`, error);
    }
  }

  if (!defaultLanguageToUse) {
    defaultLanguageToUse = languages.langs[0];
  }

  const defaultDisplayName = new Intl.DisplayNames(["en"], {
    type: "language",
  }).of(defaultLanguageToUse);

  return (
    <div className="w-full">
      <div className="w-full flex flex-row space-x-2 items-center">
        <Card>
          <CardHeader>
            <CardTitle>Languages</CardTitle>
            <CardDescription>
              Found {languages.langs.length} languages. Default:{" "}
              {defaultDisplayName}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DefaultLanguageChange
              initialDefaultLanguage={defaultLanguageToUse}
              languages={languages.langs.map((l) => ({
                value: l,
                label:
                  new Intl.DisplayNames(["en"], { type: "language" }).of(l) ||
                  l,
              }))}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
