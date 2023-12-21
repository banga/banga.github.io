import React, { ReactNode } from "react";
import { ReactElement } from "react";
import * as fs from "node:fs";
import * as path from "node:path";
import Markdown from "react-markdown";
import remarkMath from "remark-math";
import { Prism as ReactSyntaxHighlighter } from "react-syntax-highlighter";
import { Header } from "./header.js";
import { Footer } from "./footer.js";
import { AutolinkedHeading } from "./autolinkedheading.js";
import { Page } from "../page.js";
import { fontFamily } from "../og-image.js";
import { renderDate } from "./date.js";
import rehypeKatex from "rehype-katex";

export type PostData = {
  title: string;
  description: string;
  content: string;
  relativePath: string;
  relativeOgImagePath: string;
  createdDate: Date;
};

/**
 * @param post
 * @returns roughly the first paragraph of the post after the title
 */
function getPostDescription(content: string): string {
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

export function readPost(filePath: string): PostData {
  const [createdYear, createdMonth, createdDay, ...rest] = path
    .parse(filePath)
    .name.split("-");
  const outputFileName = rest.join("-") + ".html";
  const relativePath = path.join(
    createdYear!,
    createdMonth!,
    createdDay!,
    outputFileName
  );
  const relativeOgImagePath = relativePath.replace(".html", ".png");

  const content = fs.readFileSync(filePath, "utf-8");

  // Extract out the title using regex for now
  const titleMatch = content.match(/^\s*#\s+(?<title>.+)/);
  const title = titleMatch?.groups?.["title"] ?? "";
  const description = getPostDescription(content);

  return {
    title,
    description,
    content,
    relativePath,
    relativeOgImagePath,
    createdDate: new Date(`${createdYear}-${createdMonth}-${createdDay}`),
  };
}

export async function renderPostContentAsync({
  content,
  baseUrl,
  autolinkHeadings,
  absoluteUrls,
}: {
  content: string;
  autolinkHeadings: boolean;
} & (
  | { baseUrl: string; absoluteUrls: true }
  | { absoluteUrls: false; baseUrl?: never }
)): Promise<ReactElement> {
  const codeStyle = (
    await import(
      // @ts-expect-error: this abomination is needed to load the theme
      // correctly from ESM
      "react-syntax-highlighter/dist/cjs/styles/prism/vsc-dark-plus.js"
    )
  ).default.default;

  return (
    <Markdown
      remarkPlugins={[remarkMath]}
      rehypePlugins={[
        [
          rehypeKatex,
          {
            // Produces both svg and mathml by default, which is unnecessary
            output: "mathml",
          },
        ],
      ]}
      urlTransform={
        absoluteUrls
          ? (url) =>
              url.startsWith("/") ? new URL(url, baseUrl).toString() : url
          : undefined
      }
      components={{
        // Syntax highlight code blocks if possible
        code(props) {
          const { children, className, node, ref, ...rest } = props;
          const [_, language] = /language-(\w+)/.exec(className || "") ?? [];
          return language &&
            ReactSyntaxHighlighter.supportedLanguages.includes(language) ? (
            <ReactSyntaxHighlighter
              children={String(children).replace(/\n$/, "")}
              language={language}
              style={codeStyle}
              // The node we get here is already wrapped in a `pre` tag, so
              // we replace it with a `div` here to avoid having nested
              // `pre` tags
              PreTag={"div"}
              // Reset a bunch of styles that Prism injects here so we can
              // style it from CSS
              customStyle={{
                padding: 0,
                margin: 0,
                fontFamily: undefined,
                fontSize: undefined,
                background: undefined,
              }}
              {...rest}
            />
          ) : (
            <code {...rest} className={className}>
              {children}
            </code>
          );
        },
        ...(autolinkHeadings
          ? { h2: AutolinkedHeading, h3: AutolinkedHeading }
          : {}),
      }}
    >
      {content}
    </Markdown>
  );
}

function Post({
  hostname,
  children,
}: {
  hostname: string;
  children: ReactNode;
}) {
  return (
    <div className="flex-col m1">
      <Header hostname={hostname} />
      {children}
      <Footer />
    </div>
  );
}

export async function renderPostAsync({
  post,
  hostname,
  blogUrl,
}: {
  post: PostData;
  hostname: string;
  blogUrl: string;
}): Promise<ReactElement> {
  return (
    <Page
      title={post.title}
      description={post.description}
      canonicalUrl={new URL(post.relativePath, blogUrl).toString()}
      ogImageUrl={new URL(post.relativeOgImagePath, blogUrl).toString()}
      type="article"
    >
      <Post hostname={hostname}>
        {await renderPostContentAsync({
          content: post.content,
          autolinkHeadings: true,
          absoluteUrls: false,
        })}
      </Post>
    </Page>
  );
}

export function PostOGImage({
  post,
  hostname,
}: {
  post: PostData;
  hostname: string;
}): ReactElement {
  // TODO: Switch to CSS-in-JS so we can share styles here
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
        backgroundColor: "#15181a",
        color: "#e0e0e0",
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
          <div style={{ color: "#55abd9" }}>{hostname}</div>•
          <div>{renderDate(post.createdDate)}</div>
        </div>
      </div>
    </div>
  );
}
