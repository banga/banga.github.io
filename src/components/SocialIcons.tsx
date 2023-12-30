import { LinkedIn } from "./icons/linkedin.js";
import { Twitter } from "./icons/twitter.js";
import { Mastodon } from "./icons/mastodon.js";
import React from "react";
import { Atom } from "./icons/atom.js";
import { GitHub } from "./icons/github.js";
import { Link } from "./Link.js";

export function SocialIcons() {
  return (
    <div className="flex-row gap-1">
      <Link href="/blog/atom.xml" title="Atom feed">
        <Atom />
      </Link>
      <Link href="https://www.github.com/banga" title="GitHub profile">
        <GitHub />
      </Link>
      <Link
        href="https://www.linkedin.com/in/shrey-banga"
        title="LinkedIn profile"
      >
        <LinkedIn />
      </Link>
      <Link href="https://twitter.com/banga_shrey" title="Twitter profile">
        <Twitter />
      </Link>
      <Link
        rel="me"
        href="https://hachyderm.io/@shrey"
        title="Mastodon profile"
      >
        <Mastodon />
      </Link>
    </div>
  );
}
