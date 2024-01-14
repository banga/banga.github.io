import React, { ReactNode } from "react";
import { Page } from "../components/Page.js";
import { BuildContext } from "../components/BuildContext.js";
import { PROJECTS_PATH, RESUME_PATH } from "../consts.js";
import { Header } from "../components/Header.js";
import { Link } from "../components/Link.js";
import { Footer } from "../components/Footer.js";
import { Img } from "../components/Img.js";

function Heading() {
  return (
    <div className="flex-row space-between align-center pt1 pb1 bb1">
      <div className="flex-col font-large">
        <div className="bold">Shrey Banga</div>
        <div className="font-medium dim">banga.shrey@gmail.com</div>
      </div>
      <Img className="m1 circle photo-small" src="/assets/me.jpg" alt="me" />
    </div>
  );
}

const LEFT_COLUMN_SIZE = "6rem";

function Skills({ skills }: { skills: string[] }) {
  return (
    <div className="flex-row flex-wrap col-gap-half">
      {skills.map((name, i) => (
        <code key={i}>{name}</code>
      ))}
    </div>
  );
}

function Employer({
  name,
  title,
  skills,
  children,
}: {
  name: string;
  title: string;
  skills?: string[];
  children?: ReactNode;
}) {
  return (
    <div className="flex-col gap-1 pt1 pb1 bb1">
      <div className="flex-row align-start gap-1">
        <div className="bold flex-0" style={{ flexBasis: LEFT_COLUMN_SIZE }}>
          {name}
        </div>
        <div className="flex-col">
          <div className="bold">{title}</div>
          {skills && <Skills skills={skills} />}
        </div>
      </div>
      {children}
    </div>
  );
}

function WorkItem({
  date,
  subtitle,
  children,
}: {
  date: string;
  subtitle?: string;
  children: ReactNode;
}): React.JSX.Element {
  return (
    <div className="flex-row gap-1 align-baseline">
      <div
        className="flex-0 flex-col font-x-small thin"
        style={{ flexBasis: LEFT_COLUMN_SIZE }}
      >
        {subtitle && <div>{subtitle}</div>}
        <div className="dim">{date}</div>
      </div>
      <div className="font-small">{children}</div>
    </div>
  );
}

function Work() {
  return (
    <div className="flex-col">
      <Employer
        name="Airtable"
        title="Staff Software Engineer"
        skills={["TypeScript", "React", "node", "MySQL", "Kibana", "Mode"]}
      >
        <WorkItem date="2022 — 2023" subtitle="Product Performance">
          Tech led and project managed a cross-team product performance
          improvement effort. Reduced p75 TTI by 54% and bundle size by 22%.
          Drastically improved load times for customers with a lot of bases or
          users.
          <br />
          <br />
          Implemented HTML streaming and parallelized backend data fetching with
          frontend rendering, which improved load times for smaller bases. Built
          tooling to collect performance profiles directly from browsers.
        </WorkItem>
        <WorkItem date="2021 — 2022" subtitle="Performance & Architecture">
          Helped launch <i>view projection</i>, which dramatically improved load
          times of our largest bases, including solving the{" "}
          <Link href="https://medium.com/airtable-eng/the-curious-case-of-the-missing-cell-8ff47d745de7">
            curious case of the missing cell
          </Link>
          . Built backend for a new UI to show previews of large views and
          optimize them for view projection. Implemented several other
          optimizations to improve base health and performance.
        </WorkItem>
        <WorkItem date="2020 — 2021" subtitle="Platform">
          Helped launch{" "}
          <Link href="https://www.airtable.com/platform/automations">
            Automations
          </Link>
          . Built several of the most popular triggers and actions working
          across the stack. Built a type checker that drives autocompletion and
          validation in inputs. Added multi-action automations, support for
          rich-text, attachments and sending records in emails. Built recipes
          and walkthroughs to increase adoption.
          <br />
          <br />
          Helped launch the{" "}
          <Link href="https://www.airtable.com/newsroom/product-and-technology/introducing-scripting-block">
            Scripting Block
          </Link>
          . Worked on the editor, autocomplete and several API endpoints.
        </WorkItem>
        <WorkItem date="2020 — 2023" subtitle="Tools">
          Built several popular internal tools and abstractions: a tool to
          explore models backing parts of the UI, running local JS in non-local
          environments, a repl with autocompletion for the backend, autocomplete
          for CSS classNames, type-aware codemod, a triaging tool for crashers
          etc.
        </WorkItem>
        <WorkItem date="2023" subtitle="Recruiting">
          Surveyed interviewers to identify top pain points. Led efforts to
          standardize debriefs and periodically refresh interviewer calibration.
        </WorkItem>
      </Employer>
      <Employer
        name="Quip"
        title="Staff Software Engineer"
        skills={[
          "TypeScript",
          "React",
          "Python",
          "Objective-C",
          "Java",
          "Mode",
        ]}
      >
        <WorkItem date="2019" subtitle="Client Infra">
          Worked with three highly tenured engineers to{" "}
          <Link href="https://quip.com/blog/the-road-to-typescript-at-quip-part-one">
            migrate
          </Link>{" "}
          the codebase to TypeScript.
        </WorkItem>
        <WorkItem date="2018 — 2019" subtitle="Documents">
          Tech led the Documents team. Designed a new cross-platform caret &
          selection API to improve the editor's reliability and extensibility.
          We shipped Document History, Font Colors,{" "}
          <Link href="https://quip.com/blog/sync-content-with-Live-Paste">
            Live Paste
          </Link>
          , Find-and-Replace, Custom List Numbering, Drag-n-drop list items,
          paste from markdown etc.
        </WorkItem>
        <WorkItem date="2018" subtitle="Performance">
          Built a client-side caching layer using <code>IndexedDB</code> to make
          the web app behave like native apps and load instantly.
        </WorkItem>
        <WorkItem date="2016 - 2017" subtitle="Product">
          Built multi-column layouts, document outline, quotes and horizontal
          rules, page break previews, print headers and footers. Built a new
          sharing model and migrated a major customer to Quip. Shipped some
          growth experiments.
        </WorkItem>
        <WorkItem date="2016 - 2019" subtitle="Productivity">
          Built several tools and abstractions to improve productivity: a fast
          pre-commit check runner, test status dashboard, overlays for
          debugging, async properties, github code review extension etc.
        </WorkItem>
      </Employer>
      <Employer
        name="Quora"
        title="Software Engineer"
        skills={["Python", "JavaScript", "MySQL", "CSS"]}
      >
        <WorkItem date="2014 — 2016" subtitle="Platform">
          <Link href="https://quorablog.quora.com/A-New-Quora-Editor">
            Rebuilt
          </Link>{" "}
          the rich text editor from the ground up, which obsoleted numerous bugs
          and allowed us to support several new features, such as inline math
          previews.
          <br />
          <br />
          Wrote several highly used internal tools, including an extensible
          linter, a tool for managing how code is pushed, per-developer
          instances, and a UI testing system. Maintained{" "}
          <Link href="https://github.com/quora/asynq">asynq</Link>.
        </WorkItem>
        <WorkItem date="2013 — 2014">
          Built{" "}
          <Link href="https://quorablog.quora.com/A-New-Way-to-Browse-Your-Own-Content">
            Your Content
          </Link>
          . Re-designed the feature gating abstraction. Led the code quality
          group. Built speed measurement tools. Ran growth experiments.
        </WorkItem>
      </Employer>
      <Employer
        name="Google"
        title="Software Engineering Intern"
        skills={["C++", "Python", "JavaScript", "HTML"]}
      >
        <WorkItem date="2012" subtitle="Chrome">
          Built a tool for automatic regression alerts in Chrome's performance.{" "}
          <Link href="https://github.com/WebKit/WebKit/commit/843368ba00b6d430f0825d2b1b4e41eec0983f8b">
            Fixed
          </Link>{" "}
          a WebKit parser bug, reducing rendering delays. Analyzed the effects
          of an alternative DNS alias selection strategy.
        </WorkItem>
      </Employer>
    </div>
  );
}

function Education() {
  return (
    <div className="flex-col pb1 bb1">
      {/* <div className="font-large">Education</div> */}
      <div className="pt1">
        <div className="bold">University of North Carolina at Chapel Hill</div>
        <div className="flex-row gap-1 font-small">
          <div
            className="flex-0 font-x-small dim"
            style={{ flexBasis: LEFT_COLUMN_SIZE }}
          >
            2011 – 2013
          </div>
          <div>Masters in Computer Science</div>
        </div>
      </div>
      <div className="pt1">
        <div className="bold">Indian Institute of Technology Roorkee</div>
        <div className="flex-row gap-1 font-small">
          <div
            className="flex-0 font-x-small dim"
            style={{ flexBasis: LEFT_COLUMN_SIZE }}
          >
            2005 – 2009
          </div>
          <div>Bachelor of Technology in Electrical Engineering</div>
        </div>
      </div>
    </div>
  );
}

function Projects() {
  return (
    <BuildContext.Consumer>
      {({ baseUrl }) => (
        <div className="pb1 pt1">
          A list of my side projects is at{" "}
          <Link href={PROJECTS_PATH}>
            {new URL(PROJECTS_PATH, baseUrl)
              .toString()
              .replace(/^https?:\/\//g, "")}
          </Link>
          .
        </div>
      )}
    </BuildContext.Consumer>
  );
}

function Resume() {
  return (
    <div className="flex-col">
      {Heading()}
      {Work()}
      {Education()}
      {Projects()}
    </div>
  );
}

export function ResumePage() {
  return (
    <BuildContext.Consumer>
      {({ baseUrl }) => (
        <Page
          title="Shrey Banga"
          description="Shrey Banga's résumé"
          canonicalUrl={new URL(RESUME_PATH, baseUrl).toString()}
          type="website"
        >
          <div className="flex-col m1">
            <Header pathName={RESUME_PATH} />
            <Resume />
            <Footer />
          </div>
        </Page>
      )}
    </BuildContext.Consumer>
  );
}
