import React from "react";
import { renderPage } from "./page.js";
import { LinkedIn } from "./icons/linkedin.js";
import { Twitter } from "./icons/twitter.js";
import { Mastodon } from "./icons/mastodon.js";

function Home() {
  return (
    <div className="m2 flex-col">
      <div className="flex-col">
        <img className="m1 circle photo" src="me.jpg" alt="me" />
      </div>
      <div className="flex-col">
        <div className="m1">
          <div className="font-large bold">Shrey Banga</div>
          <div className="light">banga.shrey@gmail.com</div>
        </div>
        <div className="m1">
          I have worked as a Software Engineer at{" "}
          <a href="https://www.airtable.com">Airtable</a>,{" "}
          <a href="https://www.quip.com">Quip</a>,{" "}
          <a href="https://www.quora.com">Quora</a>,{" "}
          <a href="https://www.google.com">Google</a> and{" "}
          <a href="https://www.adobe.com">Adobe</a>.
        </div>
        <div className="m1">
          My other work can be found on my{" "}
          <a href="https://github.com/banga">GitHub</a>. I also write to my{" "}
          <a href="/blog">blog</a> on occasion.
        </div>
        <div className="m1 flex-row">
          <a className="mr1" href="https://www.linkedin.com/in/shrey-banga">
            <LinkedIn />
          </a>
          <a className="mr1" href="https://twitter.com/banga_shrey">
            <Twitter />
          </a>
          <a rel="me" href="https://hachyderm.io/@shrey">
            <Mastodon />
          </a>
        </div>
      </div>
    </div>
  );
}

export function renderHomePage() {
  return renderPage("Shrey Banga", <Home />);
}