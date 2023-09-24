import { readFileAsText } from "../commons/ReadFileAsText";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

export default function solution() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const inputPath = join(__dirname, "input.txt");
  const input = readFileAsText(inputPath);

  const listString = input.split("\n");
  console.log(listString);
  let sum: number[] = [];
  let tempList: number[] = [];

  for (let text of listString) {
    if (text === "") {
      sum.push(tempList.reduce((a, b) => a + b));
      tempList = [];
    } else {
      tempList.push(Number(text));
    }
  }

  sum.sort((a, b) => b - a);
  console.log(sum[0]);
}

solution();
