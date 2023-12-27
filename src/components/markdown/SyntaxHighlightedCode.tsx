import React from "react";
import { getHighlighter, BundledLanguage } from "shikiji";
import { toJsxRuntime } from "hast-util-to-jsx-runtime";

const langs: BundledLanguage[] = [
  "bash",
  "js",
  "json",
  "md",
  "ts",
  "tsx",
  "rs",
  "rust",
  "markdown",
];

const highlighter = await getHighlighter({
  themes: ["github-dark", "vitesse-light"],
  langs,
});

export function SyntaxHighlightedCode(
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > & { node?: import("hast").Element | undefined }
) {
  const { children, className = "", node, ref, ...rest } = props;

  // The original node looks like <code class="langage-sh">
  const [_, language = ""] = /language-(\w+)/.exec(className) ?? [];

  if (
    !langs.includes(language as BundledLanguage) ||
    typeof children !== "string"
  ) {
    if (language) {
      console.warn(`Could not render code block with language="${language}"`);
    }
    return (
      <code {...rest} className={className}>
        {children}
      </code>
    );
  }

  const hastRoot = highlighter.codeToHast(children, {
    lang: language,
    themes: {
      light: "vitesse-light",
      dark: "github-dark",
    },
    defaultColor: false,
  });

  // TODO: Slightly annoying that this will render a <pre> tag when we are
  // replacing a <code> tag
  return toJsxRuntime(hastRoot, {
    Fragment: React.Fragment,
    jsx: (type, props) => React.createElement(type as string, props),
    jsxs: (type, props) => React.createElement(type as string, props),
  });
}
