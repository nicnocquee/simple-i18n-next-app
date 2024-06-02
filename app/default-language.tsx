"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { LanguageSelector } from "./language-selector";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function DefaultLanguageChange({
  languages,
  initialDefaultLanguage,
}: {
  languages: { value: string; label: string }[];
  initialDefaultLanguage?: string;
}) {
  const searchParams = useSearchParams();
  const defaultLanguageFromSearchParams =
    searchParams.get("default-language") ||
    initialDefaultLanguage ||
    languages[0].value;
  const [defaultLanguage, setDefaultLanguage] = useState(
    defaultLanguageFromSearchParams
  );
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Change</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit default language</DialogTitle>
          <DialogDescription>
            The keys in the default language will be used as the base for the
            other languages.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <LanguageSelector
            defaultValue={defaultLanguage}
            languages={languages}
            onChange={setDefaultLanguage}
          />
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              const newSearchParams = new URLSearchParams(searchParams);
              newSearchParams.set("default-language", defaultLanguage);

              router.push(`${pathname}?${newSearchParams}`);
              setOpen(false);
            }}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
