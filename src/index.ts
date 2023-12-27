import fs from "node:fs";
import { buildAsync } from "./lib/build.js";
import {
  BuildContextType,
  DEFAULT_BUILD_CONTEXT,
} from "./components/BuildContext.js";
import { CSS_FILE_PATH, STATIC_DIR } from "./consts.js";
import path from "node:path";

function main() {
  const baseUrl = process.env["BASE_URL"] ?? DEFAULT_BUILD_CONTEXT.baseUrl;
  const postsDir = process.env["POSTS_DIR"] ?? DEFAULT_BUILD_CONTEXT.postsDir;
  const shouldAutoReload = process.env["SHOULD_AUTO_RELOAD"]
    ? ["1", "yes", "true"].includes(process.env["SHOULD_AUTO_RELOAD"] ?? "")
    : DEFAULT_BUILD_CONTEXT.shouldAutoReload;

  const cssCacheBuster = fs
    .statSync(path.join(STATIC_DIR, CSS_FILE_PATH))
    .mtime.getTime()
    .toString();

  const buildContext: BuildContextType = {
    baseUrl,
    postsDir,
    cssCacheBuster,
    shouldAutoReload,
  };

  buildAsync(buildContext).catch((e) => {
    console.error("Build failed:\n", e);
    process.exit(1);
  });
}

main();
