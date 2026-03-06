import type { TargetNode } from '@/data/schema';
import { parseHtml, elementToSimpleTree, type SimpleNode } from './parser';

export type MatchMode = 'EXACT_MATCH' | 'STRUCTURE_MATCH' | 'CONTAINS';

export interface CompareResult {
  isCorrect: boolean;
  missingNodes: string[];
  extraNodes: string[];
  wrongOrder: boolean;
}

export function compareWithTarget(
  userHtml: string,
  target: TargetNode,
  mode: MatchMode
): CompareResult {
  const { bodyChildren } = parseHtml(userHtml);
  const userTrees = bodyChildren.map(elementToSimpleTree);

  switch (mode) {
    case 'EXACT_MATCH':
      return exactMatch(userTrees, target);
    case 'STRUCTURE_MATCH':
      return structureMatch(userTrees, target);
    case 'CONTAINS':
      return containsMatch(userTrees, target);
  }
}

function exactMatch(userTrees: SimpleNode[], target: TargetNode): CompareResult {
  const missing: string[] = [];
  const extra: string[] = [];

  // If target has tag 'body', compare children
  if (target.tag === 'body' && target.children) {
    if (userTrees.length !== target.children.length) {
      return {
        isCorrect: false,
        missingNodes: findMissing(userTrees, target.children),
        extraNodes: findExtra(userTrees, target.children),
        wrongOrder: false,
      };
    }
    for (let i = 0; i < target.children.length; i++) {
      if (!nodesMatch(userTrees[i], target.children[i], true)) {
        return {
          isCorrect: false,
          missingNodes: [target.children[i].tag],
          extraNodes: [],
          wrongOrder: false,
        };
      }
    }
    return { isCorrect: true, missingNodes: [], extraNodes: [], wrongOrder: false };
  }

  // Single root target
  if (userTrees.length !== 1) {
    return {
      isCorrect: false,
      missingNodes: [target.tag],
      extraNodes: extra,
      wrongOrder: false,
    };
  }

  const isCorrect = nodesMatch(userTrees[0], target, true);
  if (!isCorrect) {
    missing.push(target.tag);
  }

  return { isCorrect, missingNodes: missing, extraNodes: extra, wrongOrder: false };
}

function structureMatch(userTrees: SimpleNode[], target: TargetNode): CompareResult {
  if (target.tag === 'body' && target.children) {
    if (userTrees.length !== target.children.length) {
      return {
        isCorrect: false,
        missingNodes: findMissing(userTrees, target.children),
        extraNodes: [],
        wrongOrder: false,
      };
    }
    for (let i = 0; i < target.children.length; i++) {
      if (!nodesMatch(userTrees[i], target.children[i], false)) {
        return {
          isCorrect: false,
          missingNodes: [target.children[i].tag],
          extraNodes: [],
          wrongOrder: false,
        };
      }
    }
    return { isCorrect: true, missingNodes: [], extraNodes: [], wrongOrder: false };
  }

  if (userTrees.length < 1) {
    return { isCorrect: false, missingNodes: [target.tag], extraNodes: [], wrongOrder: false };
  }

  const isCorrect = userTrees.some((t) => nodesMatch(t, target, false));
  return {
    isCorrect,
    missingNodes: isCorrect ? [] : [target.tag],
    extraNodes: [],
    wrongOrder: false,
  };
}

function containsMatch(userTrees: SimpleNode[], target: TargetNode): CompareResult {
  const found = findNodeInTrees(userTrees, target);
  return {
    isCorrect: found,
    missingNodes: found ? [] : [target.tag],
    extraNodes: [],
    wrongOrder: false,
  };
}

function nodesMatch(user: SimpleNode | undefined, target: TargetNode, exact: boolean): boolean {
  if (!user) return false;
  if (user.tag !== target.tag) return false;

  // Check text content if specified
  if (target.textContent && user.textContent !== target.textContent) {
    // Allow trimmed match
    if (user.textContent?.trim() !== target.textContent.trim()) {
      return false;
    }
  }

  // Check attributes in exact mode
  if (exact && target.attributes) {
    for (const [key, val] of Object.entries(target.attributes)) {
      if (user.attributes?.[key] !== val) return false;
    }
  }

  // Check children
  if (target.children) {
    if (!user.children || user.children.length < target.children.length) return false;
    for (let i = 0; i < target.children.length; i++) {
      if (!nodesMatch(user.children[i], target.children[i], exact)) return false;
    }
  }

  return true;
}

function findNodeInTrees(trees: SimpleNode[], target: TargetNode): boolean {
  for (const tree of trees) {
    if (nodesMatch(tree, target, false)) return true;
    if (tree.children && findNodeInTrees(tree.children, target)) return true;
  }
  return false;
}

function findMissing(userTrees: SimpleNode[], targets: TargetNode[]): string[] {
  return targets
    .filter((t) => !userTrees.some((u) => u.tag === t.tag))
    .map((t) => t.tag);
}

function findExtra(userTrees: SimpleNode[], targets: TargetNode[]): string[] {
  return userTrees
    .filter((u) => !targets.some((t) => t.tag === u.tag))
    .map((u) => u.tag);
}
