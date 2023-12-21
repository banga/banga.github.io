import React from "react";
import { ReactElement } from "react";
import * as fs from "node:fs";
import * as path from "node:path";
import { Header } from "../components/Header.js";
import { Footer } from "../components/Footer.js";
import { Page } from "../components/Page.js";
import { fontFamily } from "../opengraph/opengraph_image.js";
import { renderDate } from "../date.js";
import { BlogPostContent } from "../markdown/BlogPostContent.js";

export type BlogPostData = {
  title: string;
  description: string;
  content: string;
  relativePath: string;
  relativeOpenGraphImagePath: string;
  createdDate: Date;
};

/**
 * @param post
 * @returns roughly the first paragraph of the post after the title
 */
function getBlogPostDescription(content: string): string {
  const lines = [];
  for (const line of content
    .split("\n")
    // Skip the title
    .slice(1)) {
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith("#")) {
      // Stop at the first heading
      break;
    }
    // Stop at the next para
    if (trimmedLine.length == 0) {
      if (lines.length > 0) {
        break;
      } else {
        // Ignore any leading newlines before the first paragraph
        continue;
      }
    }
    lines.push(line);
  }
  return lines.join("\n");
}

const BLOG_POST_FILE_NAME_RE =
  /^(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})-(?<name>.+)\.md$/;
const BLOG_POST_TITLE_RE = /^\s*#\s+(?<title>.+)/;

function readBlogPost(filePath: string): BlogPostData {
  const fileName = path.basename(filePath);
  const result = BLOG_POST_FILE_NAME_RE.exec(fileName);
  if (!result || !result.groups) {
    throw `${filePath} does not match the expected format of yyyy-mm-dd-name.md`;
  }

  const createdYear = result.groups["year"]!;
  const createdMonth = result.groups["month"]!;
  const createdDay = result.groups["day"]!;
  const outputFileName = result.groups["name"]! + ".html";

  const relativePath = path.join(
    createdYear,
    createdMonth,
    createdDay,
    outputFileName
  );
  const relativeOpenGraphImagePath = relativePath.replace(".html", ".png");

  const content = fs.readFileSync(filePath, "utf-8");

  // Extract out the title using regex for now
  const titleMatch = content.match(BLOG_POST_TITLE_RE);
  const title = titleMatch?.groups?.["title"] ?? "";
  const description = getBlogPostDescription(content);

  const createdDate = new Date(
    `${createdYear}-${createdMonth}-${createdDay}T00:00:00.000Z`
  );

  return {
    title,
    description,
    content,
    relativePath,
    relativeOpenGraphImagePath,
    createdDate,
  };
}

export function readBlogPosts(postsPath: string): BlogPostData[] {
  const postPaths = fs.readdirSync(postsPath);
  const posts = postPaths.map((postPath) =>
    readBlogPost(path.join(postsPath, postPath))
  );
  // Newest first. This matters when rendering the feed.
  posts.sort((a, b) => (a.createdDate < b.createdDate ? 1 : -1));
  return posts;
}

export function BlogPost({
  post,
  hostname,
  blogUrl,
}: {
  post: BlogPostData;
  hostname: string;
  blogUrl: string;
}): ReactElement {
  return (
    <Page
      title={post.title}
      description={post.description}
      canonicalUrl={new URL(post.relativePath, blogUrl).toString()}
      ogImageUrl={new URL(post.relativeOpenGraphImagePath, blogUrl).toString()}
      type="article"
    >
      <div className="m1 flex-col">
        <Header hostname={hostname} />
        <BlogPostContent
          content={post.content}
          autolinkHeadings={true}
          absoluteUrls={false}
        />
        <Footer />
      </div>
    </Page>
  );
}

export function BlogPostOpenGraphImage({
  post,
  hostname,
}: {
  post: BlogPostData;
  hostname: string;
}): ReactElement {
  // TODO: Switch to CSS-in-JS so we can share styles here
  // Copied from style.css
  const backgroundColor = "#15181a";
  const textColor = "#e0e0e0";
  const linkColor = "#1e88e5";

  return (
    <div
      style={{
        fontFamily: fontFamily(400),
        fontSize: 24,
        display: "flex",
        width: "100%",
        height: "100%",
        flexDirection: "column",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor,
        color: textColor,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "60px",
          lineHeight: 1.5,
        }}
      >
        <div style={{ fontFamily: fontFamily(600), fontSize: 32 }}>
          {post.title}
        </div>
        <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
          <div style={{ color: linkColor }}>{hostname}</div>•
          <div>{renderDate(post.createdDate)}</div>
        </div>
      </div>
    </div>
  );
}
