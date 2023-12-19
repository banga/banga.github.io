import React from "react";
import * as fs from "node:fs";
import * as path from "node:path";
import { readPostAsync } from "./post.js";
import { renderPage } from "./page.js";

async function writePosts(postsPath: string, outputDir: string) {
  console.log({ postsPath, outputDir });

  for (const filePath of fs.readdirSync(postsPath)) {
    const { outputPath: postOutputPath, title, content } = await readPostAsync(
      path.join(postsPath, filePath)
    );
    const outputPath = path.join(outputDir, postOutputPath);
    const postDir = path.dirname(outputPath);

    if (!fs.existsSync(postDir)) {
      fs.mkdirSync(postDir, { recursive: true });
    }

    console.log(`Writing "${title}" to ${outputPath}`);
    fs.writeFileSync(outputPath, renderPage(title, content));
  }
}

async function main() {
  const [postsPath = "./posts", outputDir = "./_site/blog"] =
    process.argv.slice(2);

  await writePosts(postsPath, outputDir);
}

main();
