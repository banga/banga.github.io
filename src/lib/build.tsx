import React, { ReactElement } from "react";
import path from "node:path";
import fs from "node:fs";
import { BlogPost } from "../pages/BlogPost.js";
import { BlogPostData, readBlogPosts } from "./read-blog-posts.js";
import { BlogPostOpenGraphImage } from "../components/opengraph/BlogPostOpenGraphImage.js";
import { HomePage } from "../pages/HomePage.js";
import { BlogFeed } from "../pages/BlogFeed.js";
import { renderToStaticMarkup } from "react-dom/server";
import { generateOpenGraphImageAsync } from "./opengraph-image.js";
import { renderAtomFeedForBlog } from "./atom.js";
import assert from "node:assert";
import { BuildContext, BuildContextType } from "../components/BuildContext.js";
import { writeBuildHash } from "./auto-reload.js";
import { writeFile } from "./write-file.js";
import * as consts from "../consts.js";
import { STATIC_DIR, BLOG_PATH, OUTPUT_DIR, RESUME_PATH } from "../consts.js";
import { ResumePage } from "../pages/ResumePage.js";

function renderElementToFile({
  element,
  outputPath,
  buildContext,
}: {
  element: ReactElement;
  outputPath: string;
  buildContext: BuildContextType;
}) {
  const html = renderToStaticMarkup(
    <BuildContext.Provider value={buildContext}>
      {element}
    </BuildContext.Provider>
  );
  writeFile(outputPath, `<!DOCTYPE html>\n${html}`);
}

function writeBlogPosts(buildContext: BuildContextType, posts: BlogPostData[]) {
  for (const post of posts) {
    const postElement = <BlogPost post={post} />;
    const outputPath = path.join(OUTPUT_DIR, BLOG_PATH, post.relativePath);
    renderElementToFile({ element: postElement, outputPath, buildContext });
  }
}

async function writeBlogPostOpenGraphImagesAsync(
  buildContext: BuildContextType,
  posts: BlogPostData[]
) {
  await Promise.all(
    posts.map(async (post) => {
      const openGraphImageOutputPath = path.join(
        OUTPUT_DIR,
        BLOG_PATH,
        post.relativeOpenGraphImagePath
      );

      const imageBuffer = await generateOpenGraphImageAsync(
        // Can't use context provider here because `satori` can't handle it
        <BlogPostOpenGraphImage post={post} baseUrl={buildContext.baseUrl} />,
        1200,
        600
      );
      writeFile(openGraphImageOutputPath, imageBuffer);
    })
  );
}

async function writeBlogAsync(
  buildContext: BuildContextType,
  posts: BlogPostData[]
) {
  // Blog posts and their opengraph preview images
  writeBlogPosts(buildContext, posts);
  await writeBlogPostOpenGraphImagesAsync(buildContext, posts);

  // Write the feed
  const blogOutputPath = path.join(OUTPUT_DIR, BLOG_PATH, "index.html");
  renderElementToFile({
    element: <BlogFeed posts={posts} />,
    outputPath: blogOutputPath,
    buildContext,
  });

  // Write the atom feed for the blog
  const atomFeed = renderAtomFeedForBlog({ posts, buildContext });
  const atomOutputPath = path.join(OUTPUT_DIR, BLOG_PATH, "atom.xml");
  writeFile(atomOutputPath, atomFeed);
}

function writeHomepage(buildContext: BuildContextType) {
  const outputPath = path.join(OUTPUT_DIR, "index.html");
  renderElementToFile({
    element: <HomePage />,
    outputPath,
    buildContext,
  });
}

function writeResume(buildContext: BuildContextType) {
  const outputPath = path.join(OUTPUT_DIR, RESUME_PATH, "index.html");
  renderElementToFile({
    element: <ResumePage />,
    outputPath,
    buildContext,
  });
}

function copyStaticFiles() {
  fs.cpSync(STATIC_DIR, OUTPUT_DIR, { recursive: true });
}

export async function buildAsync(buildContext: BuildContextType) {
  assert.equal(new Date().getTimezoneOffset(), 0, `Time-zone should be UTC`);

  console.log({ consts, buildContext });

  copyStaticFiles();

  const posts = readBlogPosts(buildContext);

  await writeBlogAsync(buildContext, posts);

  writeResume(buildContext);

  writeHomepage(buildContext);

  writeBuildHash(buildContext);
}
