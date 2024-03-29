import React, { ReactElement } from "react";
import { Page } from "../components/Page.js";
import { Header } from "../components/Header.js";
import { Footer } from "../components/Footer.js";
import { BlogPostData } from "../lib/read-blog-posts.js";
import { renderDate } from "../lib/date.js";
import { BuildContext } from "../components/BuildContext.js";
import { BLOG_PATH } from "../consts.js";
import { Link } from "../components/Link.js";
import path from "node:path";

function PostPreview({ post }: { post: BlogPostData }): ReactElement {
  return (
    <div className="mt1 pb1">
      <div>
        <Link href={path.join(BLOG_PATH, post.relativePath)}>{post.title}</Link>
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
            <Header pathName={BLOG_PATH} />
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
