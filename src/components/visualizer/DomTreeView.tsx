'use client';

import { useMemo } from 'react';
import { parseHtml, elementToSimpleTree, type SimpleNode } from '@/engine/parser';

interface DomTreeViewProps {
  html: string;
  className?: string;
}

const TAG_COLORS: Record<string, string> = {
  header: 'text-blue-400',
  nav: 'text-blue-300',
  main: 'text-green-400',
  section: 'text-orange-400',
  article: 'text-yellow-400',
  aside: 'text-purple-400',
  footer: 'text-blue-400',
  ul: 'text-emerald-400',
  ol: 'text-emerald-400',
  li: 'text-emerald-300',
  h1: 'text-rose-400',
  h2: 'text-rose-400',
  h3: 'text-rose-400',
  h4: 'text-rose-300',
  h5: 'text-rose-300',
  h6: 'text-rose-300',
  p: 'text-slate-300',
  a: 'text-cyan-400',
  img: 'text-pink-400',
  div: 'text-slate-500',
  span: 'text-slate-500',
  form: 'text-indigo-400',
  input: 'text-indigo-300',
  button: 'text-indigo-300',
  table: 'text-teal-400',
  figure: 'text-amber-400',
  strong: 'text-orange-300',
  em: 'text-orange-300',
  hr: 'text-slate-500',
  br: 'text-slate-500',
};

function TreeNode({ node, depth }: { node: SimpleNode; depth: number }) {
  const colorClass = TAG_COLORS[node.tag] || 'text-slate-400';

  return (
    <div className="select-none">
      <div
        className="flex items-center gap-1 py-0.5 font-mono text-sm hover:bg-slate-800/50"
        style={{ paddingLeft: `${depth * 20 + 8}px` }}
      >
        {node.children && node.children.length > 0 && (
          <span className="mr-1 text-slate-600">{'├──'}</span>
        )}
        {!node.children && (
          <span className="mr-1 text-slate-600">{'├──'}</span>
        )}
        <span className={`font-semibold ${colorClass}`}>{node.tag}</span>
        {node.attributes && Object.keys(node.attributes).length > 0 && (
          <span className="text-slate-500">
            {Object.entries(node.attributes).map(([k, v]) => (
              <span key={k} className="ml-1">
                <span className="text-yellow-600">{k}</span>
                {v && (
                  <>
                    <span className="text-slate-600">=</span>
                    <span className="text-green-500">&quot;{v}&quot;</span>
                  </>
                )}
              </span>
            ))}
          </span>
        )}
        {node.textContent && (
          <span className="ml-2 text-slate-500">&quot;{node.textContent}&quot;</span>
        )}
      </div>
      {node.children?.map((child, i) => (
        <TreeNode key={`${child.tag}-${i}`} node={child} depth={depth + 1} />
      ))}
    </div>
  );
}

export default function DomTreeView({ html: htmlString, className = '' }: DomTreeViewProps) {
  const trees = useMemo(() => {
    if (!htmlString.trim()) return [];
    const { bodyChildren } = parseHtml(htmlString);
    return bodyChildren.map(elementToSimpleTree);
  }, [htmlString]);

  if (trees.length === 0) {
    return (
      <div className={`flex h-full items-center justify-center text-slate-500 ${className}`}>
        Write code to see the DOM tree
      </div>
    );
  }

  return (
    <div className={`overflow-auto rounded-lg bg-slate-900 p-4 ${className}`}>
      <div className="mb-2 text-xs font-medium text-slate-500">DOM Tree</div>
      {trees.map((tree, i) => (
        <TreeNode key={`${tree.tag}-${i}`} node={tree} depth={0} />
      ))}
    </div>
  );
}
