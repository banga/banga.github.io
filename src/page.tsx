import React from "react";
import { ReactElement } from "react";

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
  children: ReactElement;
}): ReactElement {
  const cacheBuster = Date.now().toString();
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
        {ogImageUrl && <meta property="og:image" content={ogImageUrl} />}
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
