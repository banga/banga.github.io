import React, { ReactElement } from "react";
import * as fs from "node:fs";
import * as path from "node:path";
import { PostData, readPost, renderPostAsync } from "./blog/post.js";
import { HomePage } from "./home.js";
import { renderBlogFeedAsync } from "./blog/feed.js";
import { renderToStaticMarkup } from "react-dom/server";

function renderElementToFile(element: ReactElement, outputPath: string) {
  fs.writeFileSync(outputPath, renderToStaticMarkup(element));
}

function readPosts(postsPath: string): PostData[] {
  const postPaths = fs.readdirSync(postsPath);
  return postPaths.map((postPath) => readPost(path.join(postsPath, postPath)));
}

async function writePostsAsync(posts: PostData[], blogDir: string) {
  for (const post of posts) {
    const postElement = await renderPostAsync(post);
    const outputPath = path.join(blogDir, post.relativePath);

    const postDir = path.dirname(outputPath);
    if (!fs.existsSync(postDir)) {
      fs.mkdirSync(postDir, { recursive: true });
    }

    console.log(`Writing post "${post.title}" to ${outputPath}`);
    renderElementToFile(postElement, outputPath);
  }
}

async function writeBlogAsync(blogDir: string, posts: PostData[]) {
  const outputPath = path.join(blogDir, "index.html");
  console.log(`Writing blog to ${outputPath}`);
  renderElementToFile(await renderBlogFeedAsync(posts), outputPath);
}

function writeHomepage(outputDir: string) {
  const outputPath = path.join(outputDir, "index.html");
  console.log(`Writing homepage to ${outputPath}`);
  renderElementToFile(<HomePage />, outputPath);
}

async function main() {
  const [postsPath = "./posts", outputDir = "./_site/"] = process.argv.slice(2);
  console.log({ postsPath, outputDir });

  const posts = readPosts(postsPath);
  console.log(`Found ${posts.length} posts`);

  const blogDir = path.join(outputDir, "blog");
  await writePostsAsync(posts, blogDir);

  await writeBlogAsync(blogDir, posts);

  writeHomepage(outputDir);
}

main();
