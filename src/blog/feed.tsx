import React, { ReactElement, ReactNode } from "react";
import { Page } from "../components/Page.js";
import { Header } from "../components/Header.js";
import { Footer } from "../components/Footer.js";
import { BlogPostData } from "./blog_post.js";
import { renderDate } from "../date.js";

function PostPreview({ post }: { post: BlogPostData }): ReactElement {
  return (
    <div className="mt1 pb1">
      <div>
        <a href={post.relativePath}>{post.title}</a>
      </div>
      <div className="font-small">{renderDate(post.createdDate)}</div>
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

export function BlogFeed({
  posts,
  hostname,
  blogUrl,
}: {
  posts: BlogPostData[];
  hostname: string;
  blogUrl: string;
}): ReactElement {
  return (
    <Page
      title="Shrey Banga's blog"
      description="Shrey Banga's blog"
      canonicalUrl={blogUrl}
      type="website"
    >
      <Feed hostname={hostname}>
        {posts.map((post, i) => (
          <PostPreview post={post} key={i} />
        ))}
      </Feed>
    </Page>
  );
}
