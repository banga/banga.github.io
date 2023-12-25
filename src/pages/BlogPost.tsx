import React from "react";
import { ReactElement } from "react";
import path from "node:path";
import { Header } from "../components/Header.js";
import { Footer } from "../components/Footer.js";
import { Page } from "../components/Page.js";
import { BlogPostContent } from "../components/markdown/BlogPostContent.js";
import { BuildContext } from "../components/BuildContext.js";
import { BLOG_PATH } from "../consts.js";
import { BlogPostData } from "../lib/read-blog-posts.js";

export function BlogPost({ post }: { post: BlogPostData }): ReactElement {
  const postPath = path.join(BLOG_PATH, post.relativePath);
  const ogImagePath = path.join(BLOG_PATH, post.relativeOpenGraphImagePath);

  return (
    <BuildContext.Consumer>
      {({ baseUrl }) => (
        <Page
          title={post.title}
          description={post.description}
          canonicalUrl={new URL(postPath, baseUrl).toString()}
          ogImageUrl={new URL(ogImagePath, baseUrl).toString()}
          type="article"
        >
          <div className="m1 flex-col">
            <Header />
            <BlogPostContent
              content={post.content}
              autolinkHeadings={true}
              absoluteUrls={false}
            />
            <Footer />
          </div>
        </Page>
      )}
    </BuildContext.Consumer>
  );
}
