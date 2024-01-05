import React from "react";
import { BuildContext } from "./BuildContext.js";
import { Link } from "./Link.js";

export function Header({ pathName }: { pathName: string }) {
  // Remove leading and trailing slashes
  const title = pathName.replace(/^\//g, "").replace(/\/$/g, "");
  return (
    <BuildContext.Consumer>
      {({ baseUrl }) => (
        <div className="no-print">
          <Link href="/">{new URL(baseUrl).hostname}</Link>
          <span className="dim"> / </span>
          <Link href={pathName}>{title}</Link>
        </div>
      )}
    </BuildContext.Consumer>
  );
}
