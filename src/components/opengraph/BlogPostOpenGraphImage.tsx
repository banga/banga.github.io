import React from "react";
import { ReactElement } from "react";
import { fontFamily } from "../../lib/opengraph-image.js";
import { renderDate } from "../../lib/date.js";
import { BlogPostData } from "../../lib/read-blog-posts.js";

export function BlogPostOpenGraphImage({
  post,
  baseUrl,
}: {
  post: BlogPostData;
  baseUrl: string;
}): ReactElement {
  // TODO: Switch to CSS-in-JS so we can share styles here
  // Copied from style.css
  const backgroundColor = "#15181a";
  const textColor = "#e0e0e0";
  const linkColor = "#1e88e5";
  const hostname = new URL(baseUrl).hostname;

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
