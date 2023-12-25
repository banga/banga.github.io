import React from "react";
import { ReactElement } from "react";
import { BuildContext } from "./BuildContext.js";
import { AutoReloadScript } from "../lib/auto-reload.js";
import { CSS_FILE_PATH } from "../consts.js";

export function Page({
  title,
  description,
  canonicalUrl,
  type,
  ogImageUrl,
  children,
}: {
  title: string;
  description: string;
  canonicalUrl: string;
  type: "website" | "article";
  ogImageUrl?: string;
  children: ReactElement | ReactElement[];
}): ReactElement {
  return (
    <BuildContext.Consumer>
      {(buildContext) => (
        <html lang="en">
          <head>
            <meta charSet="utf-8" />
            <link rel="canonical" href={canonicalUrl} />
            <link
              href="/blog/atom.xml"
              type="application/atom+xml"
              rel="alternate"
              title="Blog atom feed"
            />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <meta name="description" content={description} />
            <meta
              name="google-site-verification"
              content="pRrkd4gy53JhwF_29of9W-qdyjE0pVe9X2Kmrtd7vZ0"
            />
            <meta property="og:title" content={title} />
            <meta property="og:type" content={type} />
            {ogImageUrl && <meta property="og:image" content={ogImageUrl} />}
            <meta property="og:url" content={canonicalUrl} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta property="og:description" content={description} />
            <meta property="og:site_name" content={"Shrey Banga"} />
            <title>{title}</title>
            <link
              rel="stylesheet"
              type="text/css"
              // Cache busting is needed even in prod because we want the CSS to
              // be allowed to be cached, but also want it to change when we
              // change its source. We could also instead generate a unique name
              // for the file based on the hash of its contents, but this is
              // easier.
              href={`/${CSS_FILE_PATH}?${buildContext.cssCacheBuster}`}
            />
            {buildContext.shouldAutoReload && <AutoReloadScript />}
          </head>
          <body>{children}</body>
        </html>
      )}
    </BuildContext.Consumer>
  );
}
