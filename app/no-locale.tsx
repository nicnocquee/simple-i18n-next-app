"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function NoLocale({ thePath }: { thePath: string }) {
  const [inputPath, setInputPath] = useState(thePath);
  return (
    <div className="flex flex-col w-full items-center justify-center h-screen">
      <Card className="w-full max-w-lg">
        <form method="GET" action={`/?path=${encodeURIComponent(inputPath)}`}>
          <CardHeader>
            <CardTitle>No Locales Found</CardTitle>
            <CardDescription>
              Enter the absolute path to the locales directory of your Next.js
              project.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Path</Label>
                <Input
                  id="path"
                  name="path"
                  onChange={(e) => setInputPath(e.target.value)}
                  value={inputPath}
                  placeholder="Path to your Next.js project"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="submit">Load</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
