import React, { ReactNode } from "react";
import { ReactElement } from "react";
import * as fs from "node:fs";
import * as path from "node:path";
import Markdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeMathjax from "rehype-mathjax";
import { Prism as ReactSyntaxHighlighter } from "react-syntax-highlighter";

export type PostData = {
  title: string;
  content: ReactElement;
  outputPath: string;
};

function Header() {
  return (
    <div className="flex-row align-center">
      <a href="/">shreyb.dev</a>&nbsp;/&nbsp;<a href="/blog">blog</a>
    </div>
  );
}

function Footer() {
  return (
    <div className="mt1 flex-row align-center">
      <div className="flex-col">
        <div className="bold">Shrey Banga</div>
        <div className="font-small light">banga.shrey@gmail.com</div>
      </div>
    </div>
  );
}

export function Post({ children }: { children: ReactNode }) {
  return (
    <div className="flex-col m1">
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export async function readPostAsync(filePath: string): Promise<PostData> {
  const [createdYear, createdMonth, createdDate, ...rest] = path
    .parse(filePath)
    .name.split("-");
  const outputFileName = rest.join("-") + ".html";

  const markdownContent = fs.readFileSync(filePath, "utf-8");

  const codeStyle = (
    await import(
      // @ts-expect-error: this abomination is needed to load the theme
      // correctly from ESM
      "react-syntax-highlighter/dist/cjs/styles/prism/vsc-dark-plus.js"
    )
  ).default.default;

  // Extract out the title using regex for now
  const titleMatch = markdownContent.match(/^\s*#\s+(?<title>.+)/);
  const title = titleMatch?.groups?.title ?? "";

  return {
    title,
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
                  // The node we get here is already wrapped in a `pre` tag, so
                  // we replace it with a `div` here to avoid having nested
                  // `pre` tags
                  PreTag={'div'}
                  // Reset a bunch of styles that Prism injects here so we can
                  // style it from CSS
                  customStyle={{
                    padding: 0,
                    margin: 0,
                    fontFamily: undefined,
                    fontSize: undefined,
                    background: undefined
                  }}
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
          {markdownContent}
        </Markdown>
      </Post>
    ),
    outputPath: `${createdYear}/${createdMonth}/${createdDate}/${outputFileName}`,
  };
}
