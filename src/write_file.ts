import fs from "node:fs";
import path from "node:path";

export function writeFile(filePath: string, contents: string | Buffer) {
  console.log(`Writing ${filePath}`);

  const dir = path.dirname(filePath);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, contents);
}
