import React, { ReactElement, ReactNode } from "react";
import { Page } from "../page.js";
import { Header } from "./header.js";
import { Footer } from "./footer.js";
import { PostData, renderPostContentAsync } from "./post.js";
import { renderDate } from "./date.js";

export async function renderPostPreviewAsync(
  post: PostData
): Promise<ReactElement> {
  const preview = await renderPostContentAsync(post.description);

  return (
    <div key={post.relativePath} className="mt1">
      <div className="flex-row space-between align-baseline">
        <div className="bold" style={{ flexBasis: "80%" }}>
          <a href={post.relativePath}>{post.title}</a>
        </div>
        <div className="font-small">{renderDate(post.createdDate)}</div>
      </div>
      <blockquote className="m1 pl1 bl1">{preview}</blockquote>
    </div>
  );
}

function Feed({
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

export async function renderBlogFeedAsync(
  posts: PostData[],
  hostname: string,
  blogUrl: string
): Promise<ReactElement> {
  const postPreviews = await Promise.all(posts.map(renderPostPreviewAsync));
  return (
    <Page
      title="Shrey Banga's blog"
      description="Shrey Banga's blog"
      canonicalUrl={blogUrl}
      type="website"
    >
      <Feed hostname={hostname}>{postPreviews}</Feed>
    </Page>
  );
}
