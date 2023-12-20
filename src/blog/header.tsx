import React from "react";

export function Header({ hostname }: { hostname: string }) {
  return (
    <div>
      <a href="/">{hostname}</a> / <a href="/blog">blog</a>
    </div>
  );
}
