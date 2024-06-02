import { Suspense } from "react";
import LocalesList from "./locales-list";

export default function Home({
  searchParams: { path, "default-language": defaultLanguage },
}: {
  searchParams: { path?: string; "default-language"?: string };
}) {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between p-4 space-y-8">
      <Suspense>
        <LocalesList
          defaultLanguage={defaultLanguage}
          initialPath={path ? decodeURIComponent(path) : undefined}
        />
      </Suspense>
    </main>
  );
}
