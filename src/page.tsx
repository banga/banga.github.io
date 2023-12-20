import { ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

export function renderPage(title: string, children: ReactElement): string {
  const cacheBuster = Date.now().toString();

  return `
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="google-site-verification" content="pRrkd4gy53JhwF_29of9W-qdyjE0pVe9X2Kmrtd7vZ0" />
        <title>${title}</title>
        <link rel="stylesheet" type="text/css" href="/style.css?${cacheBuster}" />
    </head>
    <body>
        ${renderToStaticMarkup(children)}
    </body>
</html>
`.trim();
}
