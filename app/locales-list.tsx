import { promises as fs } from "node:fs";
import path from "node:path";
import * as React from "react";
import NoLocale from "./no-locale";

export default async function LocalesList({
  initialPath,
}: {
  initialPath?: string;
}) {
  const cwd = process.env.ORIGINAL_CWD || process.cwd();
  const thePath = initialPath || path.join(cwd, "locales");

  let files: string[] = [];
  // get json files from the locales directory
  try {
    files = (await fs.readdir(thePath)).filter((file) =>
      file.endsWith(".json")
    );
  } catch (error) {
    console.log(`No locales found in ${thePath}`, error);
  }

  if (files.length === 0) {
    return <NoLocale thePath={thePath} />;
  }

  return (
    <div>
      {files.map((file) => (
        <div key={file}>
          <a href={`/locales/${file}`}>{file}</a>
        </div>
      ))}
    </div>
  );
}
