import { BlogPostData } from "./blog_post.js";
import { renderToStaticMarkup } from "react-dom/server";
import { encode } from "html-entities";
import React from "react";
import { BlogPostContent } from "../markdown/BlogPostContent.js";

function renderPostEntry({
  post,
  baseUrl,
  blogUrl,
}: {
  post: BlogPostData;
  baseUrl: string;
  blogUrl: string;
}): string {
  const postUrl = new URL(post.relativePath, blogUrl);
  const postHtml = renderToStaticMarkup(
    // Render content tweaked for atom feeds:
    // - Don't insert anchor links next to headings, since the css doesn't translate
    // - Convert relative urls to absolute urls
    <BlogPostContent
      content={post.content}
      autolinkHeadings={false}
      absoluteUrls={true}
      baseUrl={baseUrl}
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
  baseUrl,
  blogUrl,
  atomFeedUrl,
}: {
  posts: BlogPostData[];
  baseUrl: string;
  blogUrl: string;
  atomFeedUrl: string;
}): string {
  const entries = posts.map((post) =>
    renderPostEntry({ post, baseUrl, blogUrl })
  );
  const lastUpdated = posts
    .map((p) => p.createdDate)
    .reduce((a, b) => (a > b ? a : b), posts[0]!.createdDate);
  return `
<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
    <title>Shrey Banga's blog</title>
    <link href="${atomFeedUrl}" rel="self" />
    <link href="${atomFeedUrl}" />
    <updated>${lastUpdated.toISOString()}</updated>
    <id>${atomFeedUrl}</id>
    <author>
        <name>Shrey Banga</name>
    </author>
${entries.join("\n")}
</feed>
`.trim();
}
