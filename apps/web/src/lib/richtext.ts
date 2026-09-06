// src/lib/richtext.ts
type LexicalNode = {
  text?: string;
  children?: LexicalNode[];
};

type LexicalRichText =
  | { root: { children: LexicalNode[] } }
  | null
  | undefined;

function extractText(node: LexicalNode): string {
  if (typeof node.text === "string") return node.text;
  if (!node.children?.length) return "";
  return node.children.map(extractText).join("");
}

/** Плоский текст из richText-поля Payload (Lexical JSON). Абзацы через \n\n. */
export function richTextToPlainText(value: unknown): string {
  const children = (value as LexicalRichText)?.root?.children;
  if (!children?.length) return "";

  return children.map(extractText).filter(Boolean).join("\n\n").trim();
}