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

  const defaultDisplayName = new Intl.DisplayNames(["en"], {
    type: "language",
  }).of(defaultLanguage || languages.langs[0]);

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
