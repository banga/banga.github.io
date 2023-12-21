import React from "react";

export function AutolinkedHeading(
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  > & { node?: import("hast").Element | undefined }
) {
  const { children, node, ...rest } = props;
  if (node === undefined) {
    throw "Should have a child heading node";
  }
  if (typeof children !== "string") {
    throw "Found a heading with non-string content";
  }

  const anchorId = children.replace(/\s+/g, "-").toLowerCase();

  return React.createElement(node.tagName, {
    className: "flex-row align-baseline relative",
    children: [
      <a
        className="permalink absolute"
        id={anchorId}
        href={`#${anchorId}`}
        title="Permalink to this location"
        style={{ left: "-1.2rem" }}
      >
        #
      </a>,
      children,
    ],
    ...rest,
  });
}
