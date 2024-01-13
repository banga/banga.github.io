import React from "react";
import { BuildContext } from "../components/BuildContext.js";
import { CSS_FILE_PATH } from "../consts.js";
import { Link } from "../components/Link.js";
import { AutoReloadScript } from "../lib/auto-reload.js";

export function ErrorPage() {
  return (
    <BuildContext.Consumer>
      {({ baseUrl, cssCacheBuster, shouldAutoReload }) => (
        <html lang="en" style={{ height: "100%" }}>
          <head>
            <meta charSet="utf-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <title>Page not found</title>
            <link
              rel="stylesheet"
              type="text/css"
              href={`/${CSS_FILE_PATH}?${cssCacheBuster}`}
            />
            {shouldAutoReload && <AutoReloadScript />}
          </head>
          <body style={{ height: "100%" }} className="flex-col space-around">
            <div className="m1 flex-col align-center gap-1">
              <div className="font-large">404</div>
              <div>This page does not seem to exist.</div>
              <div>
                Click <Link href={baseUrl}>here</Link> to visit the home page.
              </div>
            </div>
          </body>
        </html>
      )}
    </BuildContext.Consumer>
  );
}
