import React, { ReactElement, ReactNode } from "react";
import { renderPage } from "../page.js";
import { Header } from "./header.js";
import { Footer } from "./footer.js";
import { PostData, renderPostContentAsync } from "./post.js";
import { renderDate } from "./date.js";

/**
 * @param post
 * @returns roughly the first paragraph of the post after the title
 */
function getPostPreview(post: PostData): string {
  const content = post.content
    .split("\n")
    // Skip the title
    .slice(1);
  const lines = [];
  for (const line of content) {
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

export async function renderPostPreviewAsync(
  post: PostData
): Promise<ReactElement> {
  const preview = await renderPostContentAsync(getPostPreview(post));

  return (
    <div key={post.relativePath} className="mt1">
      <div className="bold">
        <a href={post.relativePath}>{post.title}</a>
      </div>
      <code className="font-small">{renderDate(post.createdDate)}</code>
      <blockquote className="m1 pl1 bl1">{preview}</blockquote>
    </div>
  );
}

function Feed({ children }: { children: ReactNode }) {
  return (
    <div className="flex-col m1">
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export async function renderBlogFeedAsync(posts: PostData[]) {
  const postPreviews = await Promise.all(posts.map(renderPostPreviewAsync));
  return renderPage("Shrey Banga's blog", <Feed>{postPreviews}</Feed>);
}
