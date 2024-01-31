import React, { ReactNode } from "react";
import { Page } from "../components/Page.js";
import { BuildContext } from "../components/BuildContext.js";
import { PROJECTS_PATH, RESUME_PATH } from "../consts.js";
import { Header } from "../components/Header.js";
import { Footer } from "../components/Footer.js";
import { Link } from "../components/Link.js";
import { Img } from "../components/Img.js";

function ProjectTitle({
  name,
  url,
}: {
  name: string;
  url?: string | undefined;
}) {
  return (
    <div className="flex-row align-center gap-half font-large bold">
      {name}
      {url && (
        <Link className="font-medium thin" href={url}>
          ↗
        </Link>
      )}
    </div>
  );
}

function ProjectDetails({
  date,
  stars,
  technologies,
}: {
  date: string;
  stars: number;
  technologies: string[];
}) {
  return (
    <div className="flex-row gap-half lowercase">
      {technologies.map((name, i) => (
        <code className="button" key={i}>
          {name}
        </code>
      ))}
      {stars > 1000 && (
        <div className="font-x-small dim">
          {"★ " + Math.round(stars / 100) / 10 + "k"}
        </div>
      )}
      <div className="font-x-small dim">{date}</div>
    </div>
  );
}

function Project({
  name,
  url,
  date,
  stars = 0,
  technologies,
  children,
}: {
  name: string;
  date: string;
  stars?: number;
  url?: string;
  technologies: string[];
  children?: ReactNode;
}) {
  return (
    <div className="flex-col bb1 pb1 mb1">
      <div className="flex-row flex-wrap space-between align-center">
        <ProjectTitle name={name} url={url} />
        <ProjectDetails date={date} stars={stars} technologies={technologies} />
      </div>
      <div className="mt1 font-small">{children}</div>
    </div>
  );
}

function Screenshot({ src }: { src: string }) {
  return (
    <Link className="flex-row pt1 pb1" href={src}>
      <Img src={src} />
    </Link>
  );
}

function Projects() {
  return (
    <div className="flex-col mt1">
      <Project
        name="git-split-diffs"
        date="2021"
        stars={2496}
        url="https://github.com/banga/git-split-diffs"
        technologies={["TypeScript", "node"]}
      >
        A tool to display git diffs with syntax highlighting in a side-by-side
        view:
        <Screenshot src="/assets/git-split-diffs.webp" />
        When collaborating with other developers, we spend a lot of time staring
        at diffs in our terminals. The default formatting of those lags pretty
        far behind what you can see on GitHub or a modern IDE like VS Code. So I
        built this tool, which acts as a{" "}
        <Link href="https://en.wikipedia.org/wiki/Terminal_pager">
          pager
        </Link>{" "}
        for diffs, parses them, reformats them and applies a syntax highlighting
        theme on them.
      </Project>
      <Project
        name="powerline-shell"
        url="https://github.com/b-ryan/powerline-shell"
        date="2013"
        stars={6200}
        technologies={["Python", "shell"]}
      >
        A highly customizable shell prompt:
        <Screenshot src="/assets/bash-powerline-screenshot.png" />
        This was inspired by the beautiful{" "}
        <Link href="https://github.com/powerline/powerline">
          Powerline
        </Link>{" "}
        plugin for vim. It comes with a long list of segment types (git status,
        battery, node version etc.) that you can mix and match to create a
        prompt you like. It inspired a{" "}
        <Link href="https://github.com/justjanne/powerline-go">go fork</Link>.{" "}
        <Link href="https://github.com/b-ryan">Buck Ryan</Link> took over its
        ownership in 2018.
      </Project>
      <Project
        name="craytracer"
        url="https://github.com/banga/craytracer"
        date="2023"
        technologies={["Rust"]}
      >
        A physically based raytracer in rust. Some sample images:
        <div className="flex-row">
          <Screenshot src="/assets/staircase.png" />
          <Screenshot src="/assets/helmet.png" />
        </div>
        Started it to learn rust, but admittedly got carried away while reading{" "}
        <Link href="https://pbrt.org/">pbrt</Link> and implemented a{" "}
        <Link href="https://pbr-book.org/4ed/Primitives_and_Intersection_Acceleration/Bounding_Volume_Hierarchies">
          BVH
        </Link>
        , a parser for my own scene file format, a multi-threaded renderer and
        support for triangle meshes, focal blur, textures, multiple importance
        sampling and several materials.
      </Project>
      <Project
        name="prefactor"
        date="2017"
        url="https://github.com/banga/prefactor"
        technologies={["Python"]}
      >
        A tool for writing AST-based refactorings for large Python codebases.
        While working on Quip's large Python codebase, which we refactored{" "}
        <Link href="https://www.quora.com/What%E2%80%99s-it-like-to-work-at-Quip-as-a-Software-Engineer/answer/Shrey-Banga#:~:text=Frequent%20Refactoring">
          often
        </Link>
        , I felt the need for a better refactoring option than regexes. It uses
        the <code>lib2to3</code> library to convert between an AST and code,
        which preserves comments and whitespace much better than the{" "}
        <code>ast</code> module.
        <br />
        <br />I wrote a similar tool for TypeScript{" "}
        <Link href="https://github.com/banga/ts-transform/">here</Link>, which I
        used at Airtable to safely remove some deprecated functions.
      </Project>
      <Project
        name="miniJava compiler"
        date="2012"
        url="https://github.com/banga/miniJava-compiler"
        technologies={["Java"]}
      >
        A compiler for a subset of Java, for the{" "}
        <Link href="https://www.cs.unc.edu/~prins/Classes/520/">COMP 520</Link>{" "}
        class at UNC. I had a lot of fun writing this and trying to maximize the
        points we got on the assignment by adding more features like function
        overloading and making it more reliable by writing a fuzzer. I was told
        by the professor that it was one of the best performing compilers he had
        seen in this class.
      </Project>
      <Project
        name="shreyb.dev"
        date="2023"
        url="https://github.com/banga/banga.github.io"
        technologies={["React", "node", "CSS"]}
      >
        This very website. I wrote all about it in{" "}
        <Link href="/blog/2023/12/23/building-this-blog.html">this</Link> blog
        post, but I essentially wrote a static site generator that builds and
        deploys this site to GitHub pages on every push.
      </Project>
      <Project
        name="Gmail multi-account mail checker"
        date="2013"
        url="https://github.com/banga/Gmail-Extension--Multiple-Accounts"
        technologies={["JavaScript"]}
      >
        A Chrome extension that expanded on the{" "}
        <Link href="https://chromewebstore.google.com/detail/google-mail-checker/mihcahmgecmbnbcchbopgniflfhgnkff">
          Google Mail Checker
        </Link>{" "}
        extensions provided by Google by allowing you to track multiple accounts
        at once:
        <Screenshot src="/assets/gmail-extension.png" />
        At its peak, it had around 35k users, according to the Chrome web store.
        It also had the dubious honor of causing a "DDoS on Gmail", to quote the
        PM on the extensions team.
      </Project>
      <Project
        name="DownloadAccelerator"
        date="2011"
        url="https://github.com/banga/DownloadAccelerator"
        technologies={["Android", "Java"]}
      >
        In the early days of the internet, "download accelerators" were popular
        tools to help you speed up downloads of large files. These worked if the
        source limited outgoing bandwidth per connection, but supported{" "}
        <Link href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Range_requests">
          Range requests
        </Link>
        . If so, the accelerator would split up the byte range of the requested
        file into chunks, establish a connection per chunk and then combine the
        chunks when downloaded. I wrote an Android app that did the same thing.
        I wrote it partly to learn the platform, but got a few paying users too.
      </Project>
      <Project
        name="GitHub PR Extension"
        date="2022"
        url="https://github.com/banga/github-pr-extension"
        technologies={["JavaScript"]}
      >
        Fills in a gap in the GitHub UI of adding keyboard shortcuts for
        navigating between comments on a PR. This was popular internally at both
        my previous companies.
      </Project>
      <Project
        name="Intel 8085A emulator"
        date="2022"
        url="https://github.com/banga/Emulator"
        technologies={["c++", "asm", ".NET"]}
      >
        Built an emulator for Intel 8085A assembly for a class project in
        undergrad.
      </Project>
    </div>
  );
}

export function ProjectsPage() {
  return (
    <BuildContext.Consumer>
      {({ baseUrl }) => (
        <Page
          title="Shrey Banga"
          description="Shrey Banga's projects"
          canonicalUrl={new URL(PROJECTS_PATH, baseUrl).toString()}
          type="website"
        >
          <div className="flex-col m1">
            <Header pathName={PROJECTS_PATH} />
            <Projects />
            <div className="pb1">
              My <Link href={RESUME_PATH}>résumé</Link> lists interesting
              projects I did for work.
            </div>
            <Footer />
          </div>
        </Page>
      )}
    </BuildContext.Consumer>
  );
}
