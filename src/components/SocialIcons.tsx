import { LinkedIn } from "./icons/linkedin.js";
import { Twitter } from "./icons/twitter.js";
import { Mastodon } from "./icons/mastodon.js";
import React from "react";
import { Atom } from "./icons/atom.js";

export function SocialIcons() {
  return (
    <div className="flex-row gap-1">
      <a href="/blog/atom.xml" title="Atom feed">
        <Atom />
      </a>
      <a
        href="https://www.linkedin.com/in/shrey-banga"
        title="LinkedIn profile"
      >
        <LinkedIn />
      </a>
      <a href="https://twitter.com/banga_shrey" title="Twitter profile">
        <Twitter />
      </a>
      <a rel="me" href="https://hachyderm.io/@shrey" title="Mastodon profile">
        <Mastodon />
      </a>
    </div>
  );
}
