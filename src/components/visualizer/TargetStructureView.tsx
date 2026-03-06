'use client';

import type { TargetNode } from '@/data/schema';

const TAG_BG: Record<string, string> = {
  header: 'bg-blue-900/40 border-blue-700',
  nav: 'bg-blue-900/30 border-blue-600',
  main: 'bg-green-900/40 border-green-700',
  section: 'bg-orange-900/40 border-orange-700',
  article: 'bg-yellow-900/40 border-yellow-700',
  aside: 'bg-purple-900/40 border-purple-700',
  footer: 'bg-blue-900/30 border-blue-600',
  ul: 'bg-emerald-900/40 border-emerald-700',
  ol: 'bg-emerald-900/40 border-emerald-700',
  li: 'bg-emerald-900/30 border-emerald-600',
  h1: 'bg-rose-900/40 border-rose-700',
  h2: 'bg-rose-900/30 border-rose-600',
  h3: 'bg-rose-900/30 border-rose-600',
  p: 'bg-slate-800/60 border-slate-600',
  a: 'bg-cyan-900/30 border-cyan-700',
  div: 'bg-slate-800/40 border-slate-600',
  figure: 'bg-amber-900/30 border-amber-700',
  form: 'bg-indigo-900/30 border-indigo-700',
  strong: 'bg-orange-900/30 border-orange-600',
  em: 'bg-orange-900/30 border-orange-600',
  hr: 'bg-slate-800/40 border-slate-600',
  body: 'bg-slate-800/20 border-slate-700',
};

function TargetNodeBox({ node, depth }: { node: TargetNode; depth: number }) {
  const style = TAG_BG[node.tag] || 'bg-slate-800/40 border-slate-600';

  return (
    <div
      className={`rounded-lg border p-2 ${style}`}
      style={{ marginLeft: depth > 0 ? '8px' : '0' }}
    >
      <div className="flex items-center gap-2">
        <span className="rounded bg-slate-900/60 px-2 py-0.5 font-mono text-xs font-semibold text-slate-200">
          {node.tag}
        </span>
        {node.textContent && (
          <span className="text-xs text-slate-400">&quot;{node.textContent}&quot;</span>
        )}
        {node.attributes && Object.keys(node.attributes).length > 0 && (
          <span className="text-xs text-slate-500">
            {Object.entries(node.attributes).map(([k, v]) => `${k}="${v}"`).join(' ')}
          </span>
        )}
      </div>
      {node.children && node.children.length > 0 && (
        <div className="mt-1.5 space-y-1.5">
          {node.children.map((child, i) => (
            <TargetNodeBox key={`${child.tag}-${i}`} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function TargetStructureView({ target }: { target: TargetNode }) {
  return (
    <div className="overflow-auto rounded-lg bg-slate-900/50 p-3">
      <TargetNodeBox node={target} depth={0} />
    </div>
  );
}
