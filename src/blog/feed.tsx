import React, { ReactElement } from "react";
import { Page } from "../components/Page.js";
import { Header } from "../components/Header.js";
import { Footer } from "../components/Footer.js";
import { BlogPostData } from "./blog_post.js";
import { renderDate } from "../date.js";
import { BuildContext } from "../components/build_context.js";
import { BLOG_PATH } from "../consts.js";

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

export function BlogFeed({ posts }: { posts: BlogPostData[] }): ReactElement {
  return (
    <BuildContext.Consumer>
      {({ baseUrl }) => (
        <Page
          title="Shrey Banga's blog"
          description="Shrey Banga's blog"
          canonicalUrl={new URL(BLOG_PATH, baseUrl).toString()}
          type="website"
        >
          <div className="flex-col m1">
            <Header />
            {posts.map((post, i) => (
              <PostPreview post={post} key={i} />
            ))}
            <Footer />
          </div>
        </Page>
      )}
    </BuildContext.Consumer>
  );
}
