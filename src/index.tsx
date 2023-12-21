import React, { ReactElement } from "react";
import * as fs from "node:fs";
import * as path from "node:path";
import {
  BlogPostData,
  readBlogPosts,
  BlogPostOpenGraphImage,
  BlogPost,
} from "./blog/blog_post.js";
import { HomePage } from "./components/HomePage.js";
import { BlogFeed } from "./blog/feed.js";
import { renderToStaticMarkup } from "react-dom/server";
import { generateOpenGraphImageAsync } from "./opengraph/opengraph_image.js";
import { renderAtomFeedForBlog } from "./blog/atom.js";

function writeFile(filePath: string, contents: string | Buffer) {
  console.log(`Writing ${filePath}`);

  const dir = path.dirname(filePath);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, contents);
}

function renderElementToFile(element: ReactElement, outputPath: string) {
  writeFile(outputPath, renderToStaticMarkup(element));
}

function writeBlogPosts({
  outputDir,
  blogPath,
  posts,
  hostname,
  blogUrl,
}: {
  outputDir: string;
  blogPath: string;
  posts: BlogPostData[];
  hostname: string;
  blogUrl: string;
}) {
  for (const post of posts) {
    const postElement = (
      <BlogPost post={post} hostname={hostname} blogUrl={blogUrl} />
    );
    const outputPath = path.join(outputDir, blogPath, post.relativePath);
    renderElementToFile(postElement, outputPath);
  }
}

async function writeBlogPostOpenGraphImagesAsync({
  outputDir,
  blogPath,
  posts,
  hostname,
}: {
  outputDir: string;
  blogPath: string;
  posts: BlogPostData[];
  hostname: string;
}) {
  await Promise.all(
    posts.map(async (post) => {
      const openGraphImageOutputPath = path.join(
        outputDir,
        blogPath,
        post.relativeOpenGraphImagePath
      );

      const imageBuffer = await generateOpenGraphImageAsync(
        <BlogPostOpenGraphImage post={post} hostname={hostname} />
      );
      writeFile(openGraphImageOutputPath, imageBuffer);
    })
  );
}

async function writeBlogAsync({
  outputDir,
  blogPath,
  posts,
  hostname,
  baseUrl,
  blogUrl,
}: {
  outputDir: string;
  blogPath: string;
  posts: BlogPostData[];
  hostname: string;
  baseUrl: string;
  blogUrl: string;
}) {
  // Blog posts and their opengraph preview images
  writeBlogPosts({ outputDir, blogPath, posts, hostname, blogUrl });
  await writeBlogPostOpenGraphImagesAsync({
    outputDir,
    blogPath,
    posts,
    hostname,
  });

  // Write the feed
  const blogOutputPath = path.join(outputDir, blogPath, "index.html");
  renderElementToFile(
    <BlogFeed posts={posts} hostname={hostname} blogUrl={blogUrl} />,
    blogOutputPath
  );

  // Write the atom feed for the blog
  const atomFeedUrl = new URL("atom.xml", blogUrl).toString();
  const atomFeed = renderAtomFeedForBlog({
    posts,
    baseUrl,
    blogUrl,
    atomFeedUrl,
  });
  const atomOutputPath = path.join(outputDir, blogPath, "atom.xml");
  writeFile(atomOutputPath, atomFeed);
}

function writeHomepage(outputDir: string, baseUrl: string) {
  const outputPath = path.join(outputDir, "index.html");
  renderElementToFile(<HomePage baseUrl={baseUrl} />, outputPath);
}

async function main() {
  const baseUrl = process.env["BASE_URL"] ?? "https://shreyb.dev";
  const postsDir = process.env["POSTS_DIR"] ?? "./posts";
  const outputDir = process.env["OUTPUT_DIR"] ?? "./_site/";
  const blogPath = process.env["BLOG_PATH"] ?? "/blog/";

  console.log({ baseUrl, postsDir, outputDir, blogPath });

  const posts = readBlogPosts(postsDir);

  const hostname = new URL("", baseUrl).hostname;
  const blogUrl = new URL(blogPath, baseUrl).toString();

  await writeBlogAsync({
    outputDir,
    blogPath,
    posts,
    hostname,
    baseUrl,
    blogUrl,
  });

  writeHomepage(outputDir, baseUrl);
}

main();
