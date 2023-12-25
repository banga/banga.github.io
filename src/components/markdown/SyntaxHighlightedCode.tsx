import React from "react";
import { Prism } from "react-syntax-highlighter";
// @ts-expect-error: types are wrong
import codeStyle from "react-syntax-highlighter/dist/cjs/styles/prism/vsc-dark-plus.js";

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
    !Prism.supportedLanguages.includes(language) ||
    typeof children !== "string"
  ) {
    return (
      <code {...rest} className={className}>
        {children}
      </code>
    );
  }

  return (
    <Prism
      children={children}
      language={language}
      style={codeStyle.default}
      // The node we get here is already wrapped in a `pre` tag, so
      // we replace it with a `div` here to avoid having nested
      // `pre` tags
      PreTag={"div"}
      // Reset a bunch of styles that Prism injects here so we can
      // style it from CSS
      customStyle={{
        padding: 0,
        margin: 0,
        fontFamily: undefined,
        fontSize: undefined,
        background: undefined,
      }}
      {...rest}
    />
  );
}
