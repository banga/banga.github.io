import { PostData, renderPostContentAsync } from "./post.js";
import { renderToStaticMarkup } from "react-dom/server";
import { encode } from "html-entities";

async function renderPostEntryAsync({
  post,
  baseUrl,
  blogUrl,
}: {
  post: PostData;
  baseUrl: string;
  blogUrl: string;
}): Promise<string> {
  const postUrl = new URL(post.relativePath, blogUrl);
  const postHtml = renderToStaticMarkup(
    // Render content tweaked for atom feeds:
    // - Don't insert anchor links next to headings, since the css doesn't translate
    // - Convert relative urls to absolute urls
    await renderPostContentAsync({
      content: post.content,
      autolinkHeadings: false,
      absoluteUrls: true,
      baseUrl,
    })
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

export async function renderAtomFeedForBlogAsync({
  posts,
  baseUrl,
  blogUrl,
  atomFeedUrl,
}: {
  posts: PostData[];
  baseUrl: string;
  blogUrl: string;
  atomFeedUrl: string;
}): Promise<string> {
  const entries = await Promise.all(
    posts.map((post) => renderPostEntryAsync({ post, baseUrl, blogUrl }))
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
