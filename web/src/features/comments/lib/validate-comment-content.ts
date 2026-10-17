type TiptapMark = {
  type?: unknown;
  attrs?: unknown;
};

type TiptapNode = {
  type?: unknown;
  text?: unknown;
  content?: unknown;
  marks?: unknown;
};

const ALLOWED_NODES = new Set([
  "doc",
  "paragraph",
  "text",
  "hardBreak",
  "codeBlock",
]);

const ALLOWED_MARKS = new Set([
  "bold",
  "italic",
  "code",
  "link",
]);

export function validateCommentContentJson(
  raw: string,
  expectedText: string,
): string | null {
  try {
    const parsed: unknown = JSON.parse(raw);

    if (
      !parsed ||
      typeof parsed !== "object" ||
      !validateNode(parsed as TiptapNode, 0)
    ) {
      return null;
    }

    const extractedText = extractText(
      parsed as TiptapNode,
    ).trim();

    if (extractedText !== expectedText.trim()) {
      return null;
    }

    return raw;
  } catch {
    return null;
  }
}

function validateNode(
  node: TiptapNode,
  depth: number,
): boolean {
  if (depth > 10) {
    return false;
  }

  if (
    typeof node.type !== "string" ||
    !ALLOWED_NODES.has(node.type)
  ) {
    return false;
  }

  if (node.type === "text") {
    if (typeof node.text !== "string") {
      return false;
    }

    if (node.marks !== undefined) {
      if (!Array.isArray(node.marks)) {
        return false;
      }

      for (const mark of node.marks as TiptapMark[]) {
        if (!validateMark(mark)) {
          return false;
        }
      }
    }

    return true;
  }

  if (node.content === undefined) {
    return true;
  }

  if (!Array.isArray(node.content)) {
    return false;
  }

  return node.content.every((child) =>
    validateNode(child as TiptapNode, depth + 1),
  );
}

function validateMark(mark: TiptapMark): boolean {
  if (
    typeof mark.type !== "string" ||
    !ALLOWED_MARKS.has(mark.type)
  ) {
    return false;
  }

  if (mark.type !== "link") {
    return true;
  }

  if (
    !mark.attrs ||
    typeof mark.attrs !== "object"
  ) {
    return false;
  }

  const href = (
    mark.attrs as Record<string, unknown>
  ).href;

  if (typeof href !== "string") {
    return false;
  }

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

function extractText(node: TiptapNode): string {
  if (node.type === "text") {
    return typeof node.text === "string"
      ? node.text
      : "";
  }

  if (node.type === "hardBreak") {
    return "\n";
  }

  if (!Array.isArray(node.content)) {
    return "";
  }

  const children = node.content.map((child) =>
    extractText(child as TiptapNode),
  );

  if (node.type === "doc") {
    return children.join("\n");
  }

  return children.join("");
}