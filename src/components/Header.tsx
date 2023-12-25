import React from "react";
import { BuildContext } from "./BuildContext.js";

export function Header() {
  return (
    <BuildContext.Consumer>
      {({ baseUrl }) => (
        <div>
          <a href="/">{new URL(baseUrl).hostname}</a> / <a href="/blog">blog</a>
        </div>
      )}
    </BuildContext.Consumer>
  );
}
