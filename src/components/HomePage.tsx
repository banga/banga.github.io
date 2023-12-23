import React from "react";
import { Page } from "./Page.js";
import { SocialIcons } from "./SocialIcons.js";
import { BuildContext } from "./build_context.js";

function Home() {
  return (
    <div className="m2 flex-col">
      <div className="flex-col">
        <img className="m1 circle photo" src="assets/me.jpg" alt="me" />
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
        <div className="m1">
          <SocialIcons />
        </div>
      </div>
    </div>
  );
}

export function HomePage() {
  return (
    <BuildContext.Consumer>
      {({ baseUrl }) => (
        <Page
          title="Shrey Banga"
          description="Shrey Banga's home page and blog"
          canonicalUrl={baseUrl}
          type="website"
        >
          <Home />
        </Page>
      )}
    </BuildContext.Consumer>
  );
}
