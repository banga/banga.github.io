import React, { ReactNode } from "react";
import { ReactElement } from "react";
import * as fs from "node:fs";
import * as path from "node:path";
import Markdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeMathjax from "rehype-mathjax";
import { Prism as ReactSyntaxHighlighter } from "react-syntax-highlighter";
import { Header } from "./header.js";
import { Footer } from "./footer.js";
import { AutolinkedHeading } from "./autolinkedheading.js";
import { Page } from "../page.js";

export type PostData = {
  title: string;
  description: string;
  content: string;
  relativePath: string;
  createdDate: Date;
};

/**
 * @param post
 * @returns roughly the first paragraph of the post after the title
 */
function getPostDescription(content: string): string {
  const lines = [];
  for (const line of content
    .split("\n")
    // Skip the title
    .slice(1)) {
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

export function readPost(filePath: string): PostData {
  const [createdYear, createdMonth, createdDay, ...rest] = path
    .parse(filePath)
    .name.split("-");
  const outputFileName = rest.join("-") + ".html";

  const content = fs.readFileSync(filePath, "utf-8");

  // Extract out the title using regex for now
  const titleMatch = content.match(/^\s*#\s+(?<title>.+)/);
  const title = titleMatch?.groups?.title ?? "";
  const description = getPostDescription(content);

  return {
    title,
    description,
    content,
    relativePath: `${createdYear}/${createdMonth}/${createdDay}/${outputFileName}`,
    createdDate: new Date(`${createdYear}-${createdMonth}-${createdDay}`),
  };
}

export async function renderPostContentAsync(
  content: string
): Promise<ReactElement> {
  const codeStyle = (
    await import(
      // @ts-expect-error: this abomination is needed to load the theme
      // correctly from ESM
      "react-syntax-highlighter/dist/cjs/styles/prism/vsc-dark-plus.js"
    )
  ).default.default;

  return (
    <Markdown
      remarkPlugins={[remarkMath]}
      rehypePlugins={[rehypeMathjax]}
      components={{
        h2: AutolinkedHeading,
        h3: AutolinkedHeading,
        // Syntax highlight code blocks if possible
        code(props) {
          const { children, className, node, ref, ...rest } = props;
          const [_, language] = /language-(\w+)/.exec(className || "") ?? [];
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
              PreTag={"div"}
              // Reset a bunch of styles that Prism injects here so we can
              // style it from CSS
              customStyle={{
                padding: 0,
                margin: 0,
                fontFamily: undefined,
                fontSize: undefined,
                background: undefined,
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
      {content}
    </Markdown>
  );
}

function Post({ children }: { children: ReactNode }) {
  return (
    <div className="flex-col m1">
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export async function renderPostAsync(post: PostData): Promise<ReactElement> {
  return (
    <Page
      title={post.title}
      description={post.description}
      relativeUrl={post.relativePath}
      type="article"
    >
      <Post>{await renderPostContentAsync(post.content)}</Post>
    </Page>
  );
}
