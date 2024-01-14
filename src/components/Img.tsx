import { imageSize } from "image-size";
import path from "path";
import { STATIC_DIR } from "../consts.js";
import React from "react";

export function Img({
  src,
  ...rest
}: {
  src?: string | undefined;
  className?: string | undefined;
  alt?: string | undefined;
  width?: string | number | undefined;
  height?: string | number | undefined;
}) {
  if (src === undefined) {
    throw new Error("Image without src not supported");
  }
  // For local files, read the file and determine the dimensions automatically.
  // Also acts as a check that the file exists. Since we convert to absolute
  // URLs for atom feeds, this will not trigger for those.
  if (!/http(s)?:\/\//.test(src)) {
    const { width, height } = imageSize(path.join(STATIC_DIR, src));
    rest = { width, height, ...rest };
  }

  return <img src={src} loading="lazy" {...rest} />;
}
