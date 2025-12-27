import React from "react";
import { Page } from "../components/Page.js";
import { SocialIcons } from "../components/SocialIcons.js";
import { BuildContext } from "../components/BuildContext.js";
import { BLOG_PATH, PROJECTS_PATH, RESUME_PATH } from "../consts.js";
import { Link } from "../components/Link.js";
import { Img } from "../components/Img.js";

function Home() {
  const separator = <> · </>;
  return (
    <div className="flex-col m2">
      <div className="flex-col">
        <Img className="m1 circle photo" src="/assets/me.jpg" alt="me" />
      </div>
      <div className="flex-col">
        <div className="m1">
          <div className="font-large bold">Shrey Banga</div>
          <div className="dim">banga.shrey@gmail.com</div>
        </div>
        <div className="m1">
          Engineer.
          Previously worked at{" "}
          <Link href="https://www.airtable.com">Airtable</Link>,{" "}
          <Link href="https://www.quip.com">Quip</Link>,{" "}
          <Link href="https://www.quora.com">Quora</Link>,{" "}
          <Link href="https://www.google.com">Google</Link> and{" "}
          <Link href="https://www.adobe.com">Adobe</Link>.
        </div>
        <div className="m1">
          <Link href={RESUME_PATH}>résumé</Link>
          {separator}
          <Link href={BLOG_PATH}>blog</Link>
          {separator}
          <Link href={PROJECTS_PATH}>projects</Link>
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
