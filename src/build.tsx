import React, { ReactElement } from "react";
import fs from "node:fs";
import path from "node:path";
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
import assert from "node:assert";
import { BuildContext, BuildContextType } from "./components/build_context.js";
import { CSS_FILE_PATH } from "./components/Page.js";
import { writeBuildHash } from "./auto_reload.js";
import { writeFile } from "./writeFile.js";

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

function writeBlogPosts({
  outputDir,
  blogPath,
  posts,
  hostname,
  blogUrl,
  buildContext,
}: {
  outputDir: string;
  blogPath: string;
  posts: BlogPostData[];
  hostname: string;
  blogUrl: string;
  buildContext: BuildContextType;
}) {
  for (const post of posts) {
    const postElement = (
      <BlogPost post={post} hostname={hostname} blogUrl={blogUrl} />
    );
    const outputPath = path.join(outputDir, blogPath, post.relativePath);
    renderElementToFile({ element: postElement, outputPath, buildContext });
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
  buildContext,
}: {
  outputDir: string;
  blogPath: string;
  posts: BlogPostData[];
  hostname: string;
  baseUrl: string;
  blogUrl: string;
  buildContext: BuildContextType;
}) {
  // Blog posts and their opengraph preview images
  writeBlogPosts({
    outputDir,
    blogPath,
    posts,
    hostname,
    blogUrl,
    buildContext,
  });
  await writeBlogPostOpenGraphImagesAsync({
    outputDir,
    blogPath,
    posts,
    hostname,
  });

  // Write the feed
  const blogOutputPath = path.join(outputDir, blogPath, "index.html");
  renderElementToFile({
    element: <BlogFeed posts={posts} hostname={hostname} blogUrl={blogUrl} />,
    outputPath: blogOutputPath,
    buildContext,
  });

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

function writeHomepage({
  outputDir,
  baseUrl,
  buildContext,
}: {
  outputDir: string;
  baseUrl: string;
  buildContext: BuildContextType;
}) {
  const outputPath = path.join(outputDir, "index.html");
  renderElementToFile({
    element: <HomePage baseUrl={baseUrl} />,
    outputPath,
    buildContext,
  });
}

export async function buildAsync({
  baseUrl,
  postsDir,
  outputDir,
  blogPath,
  shouldAutoReload,
  hashFile,
}: {
  baseUrl: string;
  postsDir: string;
  outputDir: string;
  blogPath: string;
  shouldAutoReload: boolean;
  hashFile: string;
}) {
  assert.equal(new Date().getTimezoneOffset(), 0, `Time-zone should be UTC`);

  const cssCacheBuster = fs.statSync(CSS_FILE_PATH).mtime.getTime().toString();
  const buildContext: BuildContextType = {
    cssCacheBuster,
    shouldAutoReload,
    hashFile,
  };

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
    buildContext,
  });

  writeHomepage({ outputDir, baseUrl, buildContext });

  if (buildContext.shouldAutoReload) {
    writeBuildHash(outputDir, buildContext.hashFile);
  }
}
