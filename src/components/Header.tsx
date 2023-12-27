import React from "react";
import { BuildContext } from "./BuildContext.js";

export function Header({ pathName }: { pathName: string }) {
  // Remove leading and trailing slashes
  const title = pathName.replace(/^\//g, "").replace(/\/$/g, "");
  return (
    <BuildContext.Consumer>
      {({ baseUrl }) => (
        <div>
          <a href="/">{new URL(baseUrl).hostname}</a> /{" "}
          <a href={pathName}>{title}</a>
        </div>
      )}
    </BuildContext.Consumer>
  );
}
