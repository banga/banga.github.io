import React, { ReactNode } from "react";
import { ReactElement } from "react";
import * as fs from "node:fs";
import * as path from "node:path";
import Markdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeMathjax from "rehype-mathjax";
import { Prism as ReactSyntaxHighlighter } from "react-syntax-highlighter";

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

export async function readPostAsync(filePath: string): Promise<PostData> {
  const content = fs.readFileSync(filePath, "utf-8");
  const [createdYear, createdMonth, createdDate, ...rest] = path
    .parse(filePath)
    .name.split("-");
  const fileName = rest.join("-") + ".html";

  const codeStyle = (
    await import(
      // @ts-expect-error: this abomination is needed to load the theme
      // correctly from ESM
      "react-syntax-highlighter/dist/cjs/styles/prism/vsc-dark-plus.js"
    )
  ).default.default;

  return {
    content: (
      <Post>
        <Markdown
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeMathjax]}
          components={{
            // Syntax highlight code blocks if possible
            code(props) {
              const { children, className, node, ref, ...rest } = props;
              const [_, language] =
                /language-(\w+)/.exec(className || "") ?? [];
              return ReactSyntaxHighlighter.supportedLanguages.includes(
                language
              ) ? (
                <ReactSyntaxHighlighter
                  children={String(children).replace(/\n$/, "")}
                  language={language}
                  style={codeStyle}
                  {...rest}
                />
              ) : (
                <code {...rest} className={className}>
                  {children}
                </code>
              );
            },
          }}
        >
          {content}
        </Markdown>
      </Post>
    ),
    outputPath: `${createdYear}/${createdMonth}/${createdDate}/${fileName}`,
  };
}
