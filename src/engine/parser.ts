export interface ParseResult {
  document: Document;
  bodyChildren: Element[];
  hasParseError: boolean;
}

export function parseHtml(input: string): ParseResult {
  const parser = new DOMParser();
  const doc = parser.parseFromString(
    `<!DOCTYPE html><html><body>${input}</body></html>`,
    'text/html'
  );

  const hasError = !!doc.querySelector('parsererror');

  return {
    document: doc,
    bodyChildren: [...doc.body.children] as Element[],
    hasParseError: hasError,
  };
}

export function elementToSimpleTree(el: Element): SimpleNode {
  const children: SimpleNode[] = [];
  for (const child of el.children) {
    children.push(elementToSimpleTree(child));
  }

  const attrs: Record<string, string> = {};
  for (const attr of el.attributes) {
    attrs[attr.name] = attr.value;
  }

  return {
    tag: el.tagName.toLowerCase(),
    attributes: Object.keys(attrs).length > 0 ? attrs : undefined,
    textContent: el.children.length === 0 ? (el.textContent?.trim() || undefined) : undefined,
    children: children.length > 0 ? children : undefined,
  };
}

export interface SimpleNode {
  tag: string;
  attributes?: Record<string, string>;
  textContent?: string;
  children?: SimpleNode[];
}
