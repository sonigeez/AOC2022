import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

function getCurrentDirectory(): string {
  const filename = fileURLToPath(import.meta.url);
  return dirname(filename);
}

function readInputFile(fileName: string): string {
  const dir = getCurrentDirectory();
  const path = join(dir, fileName);
  return readFileSync(path, "utf-8");
}

function computeSums(input: string): number[] {
  const listString = input.split("\n");
  let sums: number[] = [];
  let currentGroup: number[] = [];

  for (let text of listString) {
    if (text === "") {
      sums.push(currentGroup.reduce((a, b) => a + b, 0));
      currentGroup = [];
    } else {
      currentGroup.push(Number(text));
    }
  }

  if (currentGroup.length) {
    sums.push(currentGroup.reduce((a, b) => a + b, 0));
  }

  sums.sort((a, b) => b - a);

  return sums;
}

export default function solution1() {
  const input = readInputFile("input.txt");
  const sums = computeSums(input);

  console.log("Highest sum:", sums[0]);
}

export function solution2() {
  const input = readInputFile("input.txt");
  const sums = computeSums(input);

  console.log("sum of top 3:", sums[0] + sums[1] + sums[2]);
}

solution1();
solution2();
