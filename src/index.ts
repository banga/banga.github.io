import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import * as fs from "node:fs";
import * as path from "node:path";
import { readPost } from "./post.js";

function writePosts(postsPath: string, outputDir: string) {
  console.log({ postsPath, outputDir });

  for (const filePath of fs.readdirSync(postsPath)) {
    const { outputPath: postOutputPath, content } = readPost(
      path.join(postsPath, filePath)
    );
    const outputPath = path.join(outputDir, postOutputPath);
    const postDir = path.dirname(outputPath);

    if (!fs.existsSync(postDir)) {
      fs.mkdirSync(postDir, { recursive: true });
    }

    console.log(`Writing ${outputPath}`);
    fs.writeFileSync(outputPath, renderToStaticMarkup(content));
  }
}

function main() {
  const [postsPath = "./posts", outputDir = "./_site/blog"] =
    process.argv.slice(2);

  writePosts(postsPath, outputDir);
}

main();
