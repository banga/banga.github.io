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
import {
  STATIC_DIR,
  BLOG_PATH,
  OUTPUT_DIR,
  RESUME_PATH,
  PROJECTS_PATH,
} from "../consts.js";
import { ResumePage } from "../pages/ResumePage.js";
import { ProjectsPage } from "../pages/ProjectsPage.js";

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

function writePage(
  buildContext: BuildContextType,
  pagePath: string,
  element: ReactElement
) {
  const outputPath = path.join(OUTPUT_DIR, pagePath, "index.html");
  renderElementToFile({
    element,
    outputPath,
    buildContext,
  });
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
  writePage(buildContext, BLOG_PATH, <BlogFeed posts={posts} />);

  // Write the atom feed for the blog
  const atomFeed = renderAtomFeedForBlog({ posts, buildContext });
  const atomOutputPath = path.join(OUTPUT_DIR, BLOG_PATH, "atom.xml");
  writeFile(atomOutputPath, atomFeed);
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

  writePage(buildContext, RESUME_PATH, <ResumePage />);
  writePage(buildContext, PROJECTS_PATH, <ProjectsPage />);
  writePage(buildContext, "/", <HomePage />);

  writeBuildHash(buildContext);
}
