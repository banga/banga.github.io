import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { writeFile } from "./write-file.js";
import React from "react";
import { BuildContextType } from "../components/BuildContext.js";
import { HASH_FILE, OUTPUT_DIR } from "../consts.js";

// Provides very basic auto-reloading such that when any output files change,
// all html pages reload themselves. This works as follows:
// - At the end of the build, we hash the contents of the output directory and
//   save the hash to a hash file
// - We insert a <script> to every page that polls this hash file and if the
//   contents change, reloads the page
//
// Note that this relies on two things to work:
// - Something that reruns the build when the sources change. I use nodemon,
//   configured in package.json
// - Something that serves the content uncached. I use http-server with the
//   `-c-1` option. If caching were enabled, we would not see newer versions of
//   the hash file.

export function writeBuildHash(buildContext: BuildContextType) {
  if (!buildContext.shouldAutoReload) {
    return;
  }

  const hash = createHash("md5");

  const hashFilePath = path.join(OUTPUT_DIR, HASH_FILE);
  const inputFiles = fs
    .readdirSync(OUTPUT_DIR, {
      encoding: "utf-8",
      recursive: true,
    })
    .map((relativePath) => path.join(OUTPUT_DIR, relativePath))
    .filter((path) => fs.statSync(path).isFile() && path !== hashFilePath);
  inputFiles.sort();

  console.log("Hashing files:");
  console.log(inputFiles);
  for (const inputFile of inputFiles) {
    hash.update(fs.readFileSync(inputFile, "utf-8"));
  }

  const inputHash = hash.digest("hex");
  console.log(`Hash = ${inputHash}`);
  writeFile(hashFilePath, inputHash);
}

export function AutoReloadScript() {
  return (
    <script
      type="module"
      dangerouslySetInnerHTML={{
        __html: `
        async function setTimeoutAsync(delay) {
          return new Promise(resolve => setTimeout(resolve, delay));
        }
        let prevHash = null;
        while (true) {
          await setTimeoutAsync(300);
          const hash = await (await fetch('/${HASH_FILE}?' + Date.now().toString())).text();
          if (hash !== prevHash && prevHash !== null) {
            console.log('Build hash changed, reloading...');
            window.location.reload();
          }
          prevHash = hash;
        }
          `.trim(),
      }}
    ></script>
  );
}
