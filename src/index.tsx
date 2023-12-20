import React, { ReactElement } from "react";
import * as fs from "node:fs";
import * as path from "node:path";
import {
  PostData,
  readPost,
  renderPostAsync,
  renderPostContentAsync,
  PostOGImage,
} from "./blog/post.js";
import { HomePage } from "./home.js";
import { renderBlogFeedAsync } from "./blog/feed.js";
import { renderToStaticMarkup } from "react-dom/server";
import { writeOGImageAsync } from "./og-image.js";
import { hostname } from "node:os";

function renderElementToFile(element: ReactElement, outputPath: string) {
  fs.writeFileSync(outputPath, renderToStaticMarkup(element));
}

function readPosts(postsPath: string): PostData[] {
  const postPaths = fs.readdirSync(postsPath);
  const posts = postPaths.map((postPath) =>
    readPost(path.join(postsPath, postPath))
  );
  // Newest first. This matters when rendering the feed.
  posts.sort((a, b) => (a.createdDate < b.createdDate ? 1 : -1));
  return posts;
}

async function writePostsAsync({
  outputDir,
  blogPath,
  posts,
  hostname,
  blogUrl,
}: {
  outputDir: string;
  blogPath: string;
  posts: PostData[];
  hostname: string;
  blogUrl: string;
}) {
  await Promise.all(
    posts.map(async (post) => {
      const postElement = await renderPostAsync({ post, hostname, blogUrl });
      const outputPath = path.join(outputDir, blogPath, post.relativePath);
      const ogImageOutputPath = path.join(
        outputDir,
        blogPath,
        post.relativeOgImagePath
      );

      const postDir = path.dirname(outputPath);
      if (!fs.existsSync(postDir)) {
        fs.mkdirSync(postDir, { recursive: true });
      }

      console.log(`Writing post og image to ${ogImageOutputPath}`);
      await writeOGImageAsync(
        <PostOGImage post={post} hostname={hostname} />,
        ogImageOutputPath
      );

      console.log(`Writing post "${post.title}" to ${outputPath}`);
      renderElementToFile(postElement, outputPath);
    })
  );
}

async function writeBlogAsync({
  outputDir,
  blogPath,
  posts,
  hostname,
  blogUrl,
}: {
  outputDir: string;
  blogPath: string;
  posts: PostData[];
  hostname: string;
  blogUrl: string;
}) {
  await writePostsAsync({ outputDir, blogPath, posts, hostname, blogUrl });

  // Write the feed
  const outputPath = path.join(outputDir, blogPath, "index.html");
  console.log(`Writing blog feed to ${outputPath}`);
  renderElementToFile(
    await renderBlogFeedAsync(posts, hostname, blogUrl),
    outputPath
  );
}

function writeHomepage(outputDir: string, baseUrl: string) {
  const outputPath = path.join(outputDir, "index.html");
  console.log(`Writing homepage to ${outputPath}`);
  renderElementToFile(<HomePage baseUrl={baseUrl} />, outputPath);
}

async function main() {
  const [
    baseUrl = "https://shreyb.dev",
    postsDir = "./posts",
    outputDir = "./_site/",
    blogPath = "/blog/",
  ] = process.argv.slice(2);
  console.log({ baseUrl, postsDir, outputDir, blogPath });

  const posts = readPosts(postsDir);
  console.log(`Found ${posts.length} posts`);

  const hostname = new URL("", baseUrl).hostname;
  const blogUrl = new URL(blogPath, baseUrl).toString();

  await writeBlogAsync({ outputDir, blogPath, posts, hostname, blogUrl });

  writeHomepage(outputDir, baseUrl);
}

main();
