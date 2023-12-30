import React, { ReactElement } from "react";
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { AutolinkedHeading } from "./AutolinkedHeading.js";
import { SyntaxHighlightedCode } from "./SyntaxHighlightedCode.js";
import { Link } from "../Link.js";

export function BlogPostContent({
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
)): ReactElement {
  return (
    <Markdown
      remarkPlugins={[remarkMath, remarkGfm]}
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
        code: SyntaxHighlightedCode,
        a: Link,
        ...(autolinkHeadings
          ? { h2: AutolinkedHeading, h3: AutolinkedHeading }
          : {}),
      }}
    >
      {content}
    </Markdown>
  );
}
