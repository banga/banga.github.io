import React, { ReactNode } from "react";
import { ReactElement } from "react";
import * as fs from "node:fs";
import * as path from "node:path";
import Markdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeMathjax from "rehype-mathjax";

export type PostData = {
  content: ReactElement;
  outputPath: string;
};

function Header() {
  return (
    <div className="mt1 flex-row align-center">
      <a href="/">shreyb.dev</a>&nbsp;/&nbsp;<a href="/blog">blog</a>
    </div>
  );
}

function Footer() {
  return (
    <div className="mt1 flex-row align-center">
      <img className="mr1 circle photo" src="/me.jpg" alt="me" />
      <div className="flex-col">
        <div className="font-large bold">Shrey Banga</div>
        <div className="light">banga.shrey@gmail.com</div>
      </div>
    </div>
  );
}

export function Post({ children }: { children: ReactNode }) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <link rel="stylesheet" type="text/css" href="/blog.css" />
      </head>
      <body>
        <div className="flex-col m1">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}

export function readPost(filePath: string): PostData {
  const content = fs.readFileSync(filePath, "utf-8");
  const [createdYear, createdMonth, createdDate, ...rest] = path
    .parse(filePath)
    .name.split("-");
  const fileName = rest.join("-") + ".html";

  return {
    content: (
      <Post>
        <Markdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeMathjax]}>
          {content}
        </Markdown>
      </Post>
    ),
    outputPath: `${createdYear}/${createdMonth}/${createdDate}/${fileName}`,
  };
}
