import React from "react";
import { ReactElement } from "react";
import { BASE_URL } from "./consts.js";

export function Page({
  title,
  description,
  relativeUrl,
  children,
}: {
  title: string;
  description: string;
  relativeUrl: string;
  children: ReactElement;
}): ReactElement {
  const cacheBuster = Date.now().toString();
  const canonicalUrl = new URL(relativeUrl, BASE_URL);
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="canonical" href={canonicalUrl.toString()} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={description} />
        <meta
          name="google-site-verification"
          content="pRrkd4gy53JhwF_29of9W-qdyjE0pVe9X2Kmrtd7vZ0"
        />
        <title>{title}</title>
        <link
          rel="stylesheet"
          type="text/css"
          href={`/style.css?${cacheBuster}`}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
