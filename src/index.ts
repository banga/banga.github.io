import React from "react";
import * as fs from "node:fs";
import * as path from "node:path";
import { PostData, readPost, renderPostAsync } from "./blog/post.js";
import { renderPage } from "./page.js";
import { renderHomePage } from "./home.js";
import { renderBlogFeedAsync } from "./blog/feed.js";

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
    fs.writeFileSync(outputPath, renderPage(post.title, postElement));
  }
}

async function writeBlogAsync(blogDir: string, posts: PostData[]) {
  const outputPath = path.join(blogDir, "index.html");
  console.log(`Writing blog to ${outputPath}`);
  fs.writeFileSync(outputPath, await renderBlogFeedAsync(posts));
}

function writeHomepage(outputDir: string) {
  const outputPath = path.join(outputDir, "index.html");
  console.log(`Writing homepage to ${outputPath}`);
  fs.writeFileSync(outputPath, renderHomePage());
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
