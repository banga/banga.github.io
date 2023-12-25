import fs from "node:fs";
import path from "node:path";
import { BuildContextType } from "../components/BuildContext.js";

export type BlogPostData = {
  title: string;
  description: string;
  content: string;
  relativePath: string;
  relativeOpenGraphImagePath: string;
  createdDate: Date;
};

/**
 * @param post
 * @returns roughly the first paragraph of the post after the title
 */
function getBlogPostDescription(content: string): string {
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

const BLOG_POST_FILE_NAME_RE =
  /^(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})-(?<name>.+)\.md$/;
const BLOG_POST_TITLE_RE = /^\s*#\s+(?<title>.+)/;

function readBlogPost(filePath: string): BlogPostData {
  const fileName = path.basename(filePath);
  const result = BLOG_POST_FILE_NAME_RE.exec(fileName);
  if (!result || !result.groups) {
    throw `${filePath} does not match the expected format of yyyy-mm-dd-name.md`;
  }

  const createdYear = result.groups["year"]!;
  const createdMonth = result.groups["month"]!;
  const createdDay = result.groups["day"]!;
  const outputFileName = result.groups["name"]! + ".html";

  const relativePath = path.join(
    createdYear,
    createdMonth,
    createdDay,
    outputFileName
  );
  const relativeOpenGraphImagePath = relativePath.replace(".html", ".png");

  const content = fs.readFileSync(filePath, "utf-8");

  // Extract out the title using regex for now
  const titleMatch = content.match(BLOG_POST_TITLE_RE);
  const title = titleMatch?.groups?.["title"] ?? "";
  const description = getBlogPostDescription(content);

  const createdDate = new Date(
    `${createdYear}-${createdMonth}-${createdDay}T00:00:00.000Z`
  );

  return {
    title,
    description,
    content,
    relativePath,
    relativeOpenGraphImagePath,
    createdDate,
  };
}

export function readBlogPosts(buildContext: BuildContextType): BlogPostData[] {
  const postPaths = fs.readdirSync(buildContext.postsDir);
  const posts = postPaths.map((postPath) =>
    readBlogPost(path.join(buildContext.postsDir, postPath))
  );
  // Newest first. This matters when rendering the feed.
  posts.sort((a, b) => (a.createdDate < b.createdDate ? 1 : -1));
  return posts;
}
