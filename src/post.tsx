import React from "react";
import { ReactElement } from "react";
import * as fs from "node:fs";
import * as path from "node:path";
import Markdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeMathjax from "rehype-mathjax";

export type Post = {
  content: ReactElement;
  outputPath: string;
};

export function readPost(filePath: string): Post {
  const content = fs.readFileSync(filePath, "utf-8");
  const [createdYear, createdMonth, createdDate, ...rest] = path
    .parse(filePath)
    .name.split("-");
  const fileName = rest.join("-") + ".html";

  return {
    content: (
      <Markdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeMathjax]}>
        {content}
      </Markdown>
    ),
    outputPath: `${createdYear}/${createdMonth}/${createdDate}/${fileName}`,
  };
}
