import { buildAsync } from "./build.js";

function main() {
  const baseUrl = process.env["BASE_URL"] ?? "https://shreyb.dev";
  const postsDir = process.env["POSTS_DIR"] ?? "./posts";
  const outputDir = process.env["OUTPUT_DIR"] ?? "./_site/";
  const blogPath = process.env["BLOG_PATH"] ?? "/blog/";
  const shouldAutoReload = ["1", "yes", "true"].includes(
    process.env["SHOULD_AUTO_RELOAD"] ?? ""
  );
  const hashFile = process.env["HASH_FILE"] ?? ".build-hash";
  const timeZone = process.env["TZ"];

  console.log({
    baseUrl,
    postsDir,
    outputDir,
    blogPath,
    timeZone,
  });

  buildAsync({
    baseUrl,
    postsDir,
    outputDir,
    blogPath,
    shouldAutoReload,
    hashFile,
  }).catch((e) => {
    console.error("Build failed:", e);
    process.exit(1);
  });
}

main();
