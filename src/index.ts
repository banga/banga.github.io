import React from "react";
import * as fs from "node:fs";
import * as path from "node:path";
import { readPost, renderPostAsync } from "./post.js";
import { renderPage } from "./page.js";
import { renderHomePage } from "./home.js";

function writeHomepage(outputDir: string) {
  const outputPath = path.join(outputDir, "index.html");
  console.log(`Writing homepage to ${outputPath}`);
  fs.writeFileSync(outputPath, renderHomePage());
}

async function writePosts(postsPath: string, blogDir: string) {
  const postPaths = fs.readdirSync(postsPath);
  const posts = postPaths.map((postPath) =>
    readPost(path.join(postsPath, postPath))
  );

  for (const post of posts) {
    const postElement = await renderPostAsync(post);
    const outputPath = path.join(blogDir, post.relativePath);

    const postDir = path.dirname(outputPath);
    if (!fs.existsSync(postDir)) {
      fs.mkdirSync(postDir, { recursive: true });
    }

    console.log(`Writing "${post.title}" to ${outputPath}`);
    fs.writeFileSync(outputPath, renderPage(post.title, postElement));
  }
}

async function main() {
  const [postsPath = "./posts", outputDir = "./_site/"] = process.argv.slice(2);
  console.log({ postsPath, outputDir });

  const blogDir = path.join(outputDir, "blog");
  await writePosts(postsPath, blogDir);
  writeHomepage(outputDir);
}

main();
