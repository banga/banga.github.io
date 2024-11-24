import { LinkedIn } from "./icons/linkedin.js";
import { Mastodon } from "./icons/mastodon.js";
import React from "react";
import { Atom } from "./icons/atom.js";
import { GitHub } from "./icons/github.js";
import { Link } from "./Link.js";
import { Bluesky } from "./icons/bluesky.js";

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
      <Link href="https://bsky.app/profile/shreyb.dev" title="Bluesky profile">
        <Bluesky />
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
