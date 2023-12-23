import { BlogPostData } from "./blog_post.js";
import { renderToStaticMarkup } from "react-dom/server";
import { encode } from "html-entities";
import React from "react";
import { BlogPostContent } from "../markdown/BlogPostContent.js";
import { BuildContextType } from "../components/build_context.js";
import { ATOM_FILE_NAME, BLOG_PATH } from "../consts.js";
import path from "node:path";

function renderPostEntry({
  post,
  buildContext,
}: {
  post: BlogPostData;
  buildContext: BuildContextType;
}): string {
  const postUrl = new URL(
    path.join(BLOG_PATH, post.relativePath),
    buildContext.baseUrl
  );
  const postHtml = renderToStaticMarkup(
    // Render content tweaked for atom feeds:
    // - Don't insert anchor links next to headings, since the css doesn't translate
    // - Convert relative urls to absolute urls
    <BlogPostContent
      content={post.content}
      autolinkHeadings={false}
      absoluteUrls={true}
      baseUrl={buildContext.baseUrl}
    />
  );

  return `
    <entry>
      <title>${post.title}</title>
      <link href="${postUrl}" />
      <updated>${post.createdDate.toISOString()}</updated>
      <id>${postUrl}</id>
      <author>
        <name>Shrey Banga</name>
      </author>
      <content type="html">${encode(postHtml)}</content>
    </entry>
    `.trim();
}

export function renderAtomFeedForBlog({
  posts,
  buildContext,
}: {
  posts: BlogPostData[];
  buildContext: BuildContextType;
}): string {
  const blogUrl = new URL(BLOG_PATH, buildContext.baseUrl).toString();
  const atomFeedUrl = new URL(
    path.join(BLOG_PATH, ATOM_FILE_NAME),
    buildContext.baseUrl
  ).toString();

  const entries = posts.map((post) => renderPostEntry({ post, buildContext }));
  const lastUpdated = posts
    .map((p) => p.createdDate)
    .reduce((a, b) => (a > b ? a : b), posts[0]!.createdDate);
  return `
<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
    <title>Shrey Banga's blog</title>
    <link href="${atomFeedUrl}" rel="self" />
    <link href="${blogUrl}" />
    <updated>${lastUpdated.toISOString()}</updated>
    <id>${atomFeedUrl}</id>
    <author>
        <name>Shrey Banga</name>
    </author>
${entries.join("\n")}
</feed>
`.trim();
}
