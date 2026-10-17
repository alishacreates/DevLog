import {
  Fragment,
  type ReactNode,
} from "react";

type CommentContentProps = {
  content: string;
  contentJson?: string;
};

type TiptapMark = {
  type?: string;
  attrs?: Record<string, unknown>;
};

type TiptapNode = {
  type?: string;
  text?: string;
  content?: TiptapNode[];
  marks?: TiptapMark[];
};

export function CommentContent({
  content,
  contentJson,
}: CommentContentProps) {
  const parsed =
    parseContentJson(contentJson);

  if (!parsed) {
    return (
      <p className="whitespace-pre-wrap font-section text-sm leading-6 text-foreground/90">
        {content}
      </p>
    );
  }

  return (
    <div className="font-section text-sm leading-6 text-foreground/90">
      {renderNode(parsed, "root")}
    </div>
  );
}

function parseContentJson(
  contentJson?: string,
): TiptapNode | null {
  if (!contentJson) {
    return null;
  }

  try {
    const parsed: unknown =
      JSON.parse(contentJson);

    if (
      !parsed ||
      typeof parsed !== "object"
    ) {
      return null;
    }

    return parsed as TiptapNode;
  } catch {
    return null;
  }
}

function renderNode(
  node: TiptapNode,
  key: string,
): ReactNode {
  switch (node.type) {
    case "doc":
      return (
        <Fragment key={key}>
          {renderChildren(node, key)}
        </Fragment>
      );

    case "paragraph":
      return (
        <p
          key={key}
          className="whitespace-pre-wrap"
        >
          {renderChildren(node, key)}
        </p>
      );

    case "text":
      return renderTextNode(node, key);

    case "hardBreak":
      return <br key={key} />;

    case "codeBlock":
      return (
        <pre
          key={key}
          className="
            my-2 overflow-x-auto
            rounded-xl border border-border
            bg-muted/60 p-3
            font-mono text-xs leading-6
          "
        >
          <code>
            {extractPlainText(node)}
          </code>
        </pre>
      );

    default:
      return null;
  }
}

function renderChildren(
  node: TiptapNode,
  parentKey: string,
) {
  if (!Array.isArray(node.content)) {
    return null;
  }

  return node.content.map(
    (child, index) =>
      renderNode(
        child,
        `${parentKey}-${index}`,
      ),
  );
}

function renderTextNode(
  node: TiptapNode,
  key: string,
): ReactNode {
  let rendered: ReactNode =
    node.text ?? "";

  if (!Array.isArray(node.marks)) {
    return (
      <Fragment key={key}>
        {rendered}
      </Fragment>
    );
  }

  for (const mark of node.marks) {
    switch (mark.type) {
      case "bold":
        rendered = (
          <strong className="font-semibold text-foreground">
            {rendered}
          </strong>
        );
        break;

      case "italic":
        rendered = <em>{rendered}</em>;
        break;

      case "code":
        rendered = (
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[0.9em]">
            {rendered}
          </code>
        );
        break;

      case "link": {
        const href =
          typeof mark.attrs?.href ===
          "string"
            ? mark.attrs.href
            : null;

        if (!href || !isSafeLink(href)) {
          break;
        }

        rendered = (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="
              font-medium text-primary
              underline underline-offset-4
              transition-opacity
              hover:opacity-80
              dark:text-accent-warm
            "
          >
            {rendered}
          </a>
        );

        break;
      }
    }
  }

  return (
    <Fragment key={key}>
      {rendered}
    </Fragment>
  );
}

function extractPlainText(
  node: TiptapNode,
): string {
  if (node.type === "text") {
    return node.text ?? "";
  }

  if (node.type === "hardBreak") {
    return "\n";
  }

  if (!Array.isArray(node.content)) {
    return "";
  }

  return node.content
    .map(extractPlainText)
    .join("");
}

function isSafeLink(href: string) {
  try {
    const url = new URL(href);

    return (
      url.protocol === "http:" ||
      url.protocol === "https:"
    );
  } catch {
    return false;
  }
}