import { readFileSync } from "fs";

export function readFileAsText(path: string): string {
  const input = readFileSync(path, "utf-8");
  return input;
}

//es6 export
