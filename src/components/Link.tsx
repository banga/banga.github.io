import assert from "assert";
import fs from "node:fs";
import path from "node:path";
import React from "react";
import { ReactNode } from "react";
import { OUTPUT_DIR } from "../consts.js";

const linkedRelativePaths = new Set<string>();

// Checks that all relative paths that have links to them actually exist. This
// should be run after all rendering has been finished.
export function verifyLinkedRelativePathsExist() {
  for (const relativePath of linkedRelativePaths) {
    assert(
      fs.existsSync(path.join(OUTPUT_DIR, relativePath)),
      `Relative path "${relativePath}" does not exist in output directory "${OUTPUT_DIR}"`
    );
  }
}

export function Link({
  href,
  children,
  target,
  ...rest
}: {
  href?: string | undefined;
  children?: ReactNode;
} & React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>) {
  if (href !== undefined) {
    const isRelative = href.startsWith("/");
    const isAnchorLink = href.startsWith("#");

    if (isRelative) {
      linkedRelativePaths.add(href);
    } else if (isAnchorLink) {
      // Can't validate anchor links
    } else {
      assert.doesNotThrow(
        () => new URL(href),
        TypeError,
        `Invalid external URL: "${href}"`
      );
      assert(
        !target,
        `Setting target=${target} on "${href}" will have no effect`
      );

      // Opens in a window and with a fresh browsing context
      target = "_blank";
    }
  }

  return (
    <a href={href} {...rest} target={target}>
      {children}
    </a>
  );
}
