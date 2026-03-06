'use client';

import { useEffect, useRef, useCallback } from 'react';
import { EditorView, basicSetup } from 'codemirror';
import { html } from '@codemirror/lang-html';
import { EditorState } from '@codemirror/state';
import { keymap } from '@codemirror/view';

interface CodeEditorProps {
  initialValue?: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
}

export default function CodeEditor({ initialValue = '', onChange, readOnly = false }: CodeEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const stableOnChange = useCallback((val: string) => {
    onChangeRef.current(val);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const state = EditorState.create({
      doc: initialValue,
      extensions: [
        basicSetup,
        html(),
        keymap.of([]),
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            stableOnChange(update.state.doc.toString());
          }
        }),
        EditorState.readOnly.of(readOnly),
        EditorView.theme({
          '&': {
            fontSize: '14px',
            height: '100%',
          },
          '.cm-scroller': {
            overflow: 'auto',
            fontFamily: '"Fira Code", "JetBrains Mono", monospace',
          },
          '.cm-content': {
            padding: '12px 0',
          },
          '.cm-gutters': {
            backgroundColor: '#1e293b',
            color: '#64748b',
            border: 'none',
          },
          '&.cm-focused .cm-cursor': {
            borderLeftColor: '#60a5fa',
          },
          '&.cm-focused .cm-selectionBackground, .cm-selectionBackground': {
            backgroundColor: '#334155',
          },
        }),
        EditorView.theme({}, { dark: true }),
      ],
    });

    viewRef.current = new EditorView({
      state,
      parent: containerRef.current,
    });

    return () => viewRef.current?.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-full overflow-hidden rounded-lg border border-slate-700 bg-slate-900"
    />
  );
}
