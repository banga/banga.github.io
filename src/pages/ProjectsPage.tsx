import React, { ReactNode } from "react";
import { Page } from "../components/Page.js";
import { BuildContext } from "../components/BuildContext.js";
import { PROJECTS_PATH } from "../consts.js";
import { Header } from "../components/Header.js";

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
        <a className="font-medium thin" href={url} target="_blank">
          ↗
        </a>
      )}
    </div>
  );
}

function Project({
  name,
  date,
  stars,
  url,
  technologies = [],
  children,
}: {
  name: string;
  date: string;
  stars?: number;
  url?: string;
  technologies?: string[];
  children?: ReactNode;
}) {
  return (
    <div className="flex-col bb1 pb1 mb1">
      <div className="flex-row space-between align-center">
        <ProjectTitle name={name} url={url} />
        <div className="flex-row gap-half">
          {technologies.map((name, i) => (
            <code key={i}>{name}</code>
          ))}
          {stars && stars > 1000 && (
            <div className="font-x-small dim">
              {"★ " + Math.round(stars / 100) / 10 + "k"}
            </div>
          )}
          <div className="font-x-small dim">{date}</div>
        </div>
      </div>
      <div className="mt1 font-small">{children}</div>
    </div>
  );
}

function Screenshot({ url }: { url: string }) {
  return (
    <a className="flex-row pt1 pb1" href={url} target="_blank">
      <img src={url} />
    </a>
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
            <div className="flex-col mt1">
              <Project
                name="git-split-diffs"
                date="2021"
                stars={2496}
                url="https://github.com/banga/git-split-diffs"
                technologies={["typescript", "node"]}
              >
                A tool to display git diffs with syntax highlighting in a
                side-by-side view:
                <Screenshot url="https://raw.githubusercontent.com/banga/git-split-diffs/main/screenshots/dark.png" />
                When collaborating with other developers, we spend a lot of time
                staring at diffs in our terminals. The default formatting of
                those lags pretty far behind what you can see on GitHub or a
                modern IDE like VS Code. So I built this tool, which acts as a{" "}
                <a href="https://en.wikipedia.org/wiki/Terminal_pager">pager</a>{" "}
                for diffs, parses them, reformats them and applies a syntax
                highlighting theme on them.
              </Project>
              <Project
                name="powerline-shell"
                url="https://github.com/b-ryan/powerline-shell"
                date="2013"
                stars={6200}
                technologies={["python", "shell"]}
              >
                A highly customizable shell prompt:
                <Screenshot url="https://raw.githubusercontent.com/banga/powerline-shell/master/bash-powerline-screenshot.png" />
                This was inspired by the beautiful{" "}
                <a
                  href="https://github.com/powerline/powerline"
                  target="_blank"
                >
                  Powerline
                </a>{" "}
                plugin for vim. It comes with a long list of segment types (git
                status, battery, node version etc.) that you can mix and match
                to create a prompt you like. It inspired a{" "}
                <a href="https://github.com/justjanne/powerline-go">go fork</a>.{" "}
                <a href="https://github.com/b-ryan" target="_blank">
                  Buck Ryan
                </a>{" "}
                took over its ownership in 2018.
              </Project>
              <Project
                name="craytracer"
                url="https://github.com/banga/craytracer"
                date="2023"
                technologies={["rust"]}
              >
                A hobby raytracer in rust:
                <Screenshot url="https://github.com/banga/craytracer/blob/master/images/dragon.png?raw=true" />
                Started it to learn rust, but admittedly got carried away while
                reading <a href="https://pbrt.org/">pbrt</a> and implemented a{" "}
                <a
                  href="https://pbr-book.org/4ed/Primitives_and_Intersection_Acceleration/Bounding_Volume_Hierarchies"
                  target="_blank"
                >
                  BVH
                </a>
                , a parser for my own scene file format, support for triangle
                meshes, and a multi-threaded tile-based renderer.
              </Project>
              <Project
                name="prefactor"
                date="2017"
                url="https://github.com/banga/prefactor"
              >
                A tool for writing AST-based refactorings for large Python
                codebases. While working on Quip's large Python codebase, which
                we refactored{" "}
                <a
                  href="https://www.quora.com/What%E2%80%99s-it-like-to-work-at-Quip-as-a-Software-Engineer/answer/Shrey-Banga#:~:text=Frequent%20Refactoring"
                  target="_blank"
                >
                  often
                </a>
                , I felt the need for a better refactoring option than regexes.
                It uses the <code>lib2to3</code> library to convert between an
                AST and code, which preserves comments and whitespace much
                better than the <code>ast</code> module.
              </Project>
              <Project
                name="Gmail multi-account mail checker"
                date="TODO"
                url="https://github.com/banga/Gmail-Extension--Multiple-Accounts"
              >
                A Chrome extension that expanded on the{" "}
                <a href="https://chromewebstore.google.com/detail/google-mail-checker/mihcahmgecmbnbcchbopgniflfhgnkff">
                  Google Mail Checker
                </a>{" "}
                extensions provided by Google by allowing you to track multiple
                accounts at once:
                <Screenshot url="https://github.com/milkbikis/Gmail-Extension--Multiple-Accounts/raw/master/title_image.png" />
                At its peak, it had around 35k users, according to the Chrome
                web store. It also had the dubious honor of causing a "DDoS on
                Gmail", to quote the PM on the extensions team.
              </Project>
              <Project
                name="DownloadAccelerator"
                date="TODO"
                url="https://github.com/banga/DownloadAccelerator"
              />
              <Project
                name="Intel 8085A emulator"
                date="TODO"
                url="https://github.com/banga/Emulator"
              />
              <Project
                name="miniJava compiler"
                date="TODO"
                url="https://github.com/banga/miniJava-compiler"
              />
              <Project
                name="shreyb.dev"
                date="TODO"
                url="https://github.com/banga/banga.github.io"
              />
              <Project
                name="GitHub PR Extension"
                date="TODO"
                url="https://github.com/banga/github-pr-extension"
              />
            </div>
          </div>
        </Page>
      )}
    </BuildContext.Consumer>
  );
}
