import React from "react";
import { Page } from "../components/Page.js";
import { SocialIcons } from "../components/SocialIcons.js";
import { BuildContext } from "../components/BuildContext.js";
import { BLOG_PATH, RESUME_PATH } from "../consts.js";

function Home() {
  const separator = <> · </>;
  return (
    <div className="flex-col m2">
      <div className="flex-col">
        <img className="m1 circle photo" src="assets/me.jpg" alt="me" />
      </div>
      <div className="flex-col">
        <div className="m1">
          <div className="font-large bold">Shrey Banga</div>
          <div className="dim">banga.shrey@gmail.com</div>
        </div>
        <div className="m1">
          Full-stack software engineer in the DC area. Previously worked at{" "}
          <a href="https://www.airtable.com">Airtable</a>,{" "}
          <a href="https://www.quip.com">Quip</a>,{" "}
          <a href="https://www.quora.com">Quora</a>,{" "}
          <a href="https://www.google.com">Google</a> and{" "}
          <a href="https://www.adobe.com">Adobe</a>.
        </div>
        <div className="m1">
          <a href={RESUME_PATH}>résumé</a>
          {separator}
          <a href={BLOG_PATH}>blog</a>
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
