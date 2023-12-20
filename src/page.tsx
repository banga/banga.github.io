import React from "react";
import { ReactElement } from "react";
import { BASE_URL } from "./consts.js";

export function Page({
  title,
  description,
  relativeUrl,
  type,
  children,
}: {
  title: string;
  description: string;
  relativeUrl: string;
  type: "website" | "article";
  children: ReactElement;
}): ReactElement {
  const cacheBuster = Date.now().toString();
  const canonicalUrl = new URL(relativeUrl, BASE_URL).toString();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={description} />
        <meta
          name="google-site-verification"
          content="pRrkd4gy53JhwF_29of9W-qdyjE0pVe9X2Kmrtd7vZ0"
        />
        <meta property="og:title" content={title} />
        <meta property="og:type" content={type} />
        {/* 
        TODO: generate image previews of pages
        <meta property="og:image" content={}> 
        */}
        <meta property="og:url" content={canonicalUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:description" content={description} />
        <meta property="og:site_name" content={"Shrey Banga"} />
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
