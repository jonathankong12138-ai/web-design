import { useEffect, useMemo, useState } from 'react';
import { Download } from 'lucide-react';

type FlowScreenId = 'overview' | 'create' | 'review';
type FlowState = 'default' | 'empty' | 'error' | 'success';

type Comment = {
  id: string;
  screenId: FlowScreenId;
  body: string;
  resolved: boolean;
  createdAt: string;
  updatedAt: string;
};

const STORAGE_KEY = 'prototype-flow-comments-v1';

const screens: Array<{ id: FlowScreenId; title: string; states: FlowState[] }> = [
  { id: 'overview', title: 'Overview', states: ['default', 'empty'] },
  { id: 'create', title: 'Create', states: ['default', 'error', 'success'] },
  { id: 'review', title: 'Review', states: ['default', 'success'] },
];

function nowIso() {
  return new Date().toISOString();
}

function loadComments(): Comment[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Comment[]) : [];
  } catch {
    return [];
  }
}

function saveComments(comments: Comment[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
  } catch {
    // localStorage may be unavailable in strict browser modes.
  }
}

function renderScreen(title: string, state: FlowState) {
  return (
    <div className="rounded-[32px] border border-slate-950 bg-slate-950 p-2 shadow-xl">
      <div className="overflow-hidden rounded-[26px] bg-white">
        <div className="flex h-8 items-center justify-between px-5 text-[11px] font-semibold text-slate-900">
          <span>9:41</span>
          <span className="h-3 w-16 rounded-full bg-slate-900" />
          <span>5G</span>
        </div>
        <div className="min-h-[360px] border-t border-slate-100 p-4">
          <h3 className="text-lg font-semibold text-slate-950">{title}</h3>
          <p className="mt-2 rounded-xl bg-slate-50 p-3 text-sm text-slate-600">State: {state}</p>
          <div className="mt-4 h-44 rounded-2xl border border-slate-200 bg-slate-50" />
          <button type="button" className="mt-4 w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white">
            Primary action
          </button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [comments, setComments] = useState<Comment[]>(() => loadComments());
  const [states, setStates] = useState<Partial<Record<FlowScreenId, FlowState>>>({});
  const unresolved = useMemo(() => comments.filter((comment) => !comment.resolved).length, [comments]);

  useEffect(() => {
    saveComments(comments);
  }, [comments]);

  const addComment = (screenId: FlowScreenId) => {
    const body = window.prompt('Add review comment');
    if (!body?.trim()) return;
    const timestamp = nowIso();
    setComments((current) => [
      ...current,
      {
        id: window.crypto?.randomUUID?.() ?? `comment-${Date.now()}`,
        screenId,
        body: body.trim(),
        resolved: false,
        createdAt: timestamp,
        updatedAt: timestamp,
      },
    ]);
  };

  const editComment = (commentId: string) => {
    const target = comments.find((comment) => comment.id === commentId);
    if (!target) return;
    const body = window.prompt('Edit comment', target.body);
    if (!body?.trim()) return;
    setComments((current) =>
      current.map((comment) => (comment.id === commentId ? { ...comment, body: body.trim(), updatedAt: nowIso() } : comment)),
    );
  };

  const exportNotes = () => {
    const blob = new Blob([JSON.stringify({ exportedAt: nowIso(), comments, states }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'review-notes.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-3 px-4 py-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Review Prototype</div>
            <h1 className="text-2xl font-semibold">PRD Prototype</h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-900">
              Pending {unresolved}
            </span>
            <button type="button" className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold" onClick={exportNotes}>
              <Download className="h-4 w-4" />
              Export JSON
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto grid max-w-[1400px] gap-5 px-4 py-5 md:grid-cols-2 xl:grid-cols-3">
        {screens.map((screen) => {
          const activeState = states[screen.id] ?? screen.states[0];
          const screenComments = comments.filter((comment) => comment.screenId === screen.id);
          return (
            <article key={screen.id}>
              {renderScreen(screen.title, activeState)}
              <div className="mt-3 rounded-2xl border border-slate-200 bg-white p-3">
                <div className="mb-3 flex flex-wrap gap-1.5">
                  {screen.states.map((state) => (
                    <button
                      key={state}
                      type="button"
                      className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${activeState === state ? 'border-slate-950 bg-slate-950 text-white' : 'border-slate-200 bg-slate-50 text-slate-600'}`}
                      onClick={() => setStates((current) => ({ ...current, [screen.id]: state }))}
                    >
                      {state}
                    </button>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-700">Comments {screenComments.length}</span>
                  <button type="button" className="rounded-full border border-slate-300 px-3 py-1 text-xs font-semibold" onClick={() => addComment(screen.id)}>
                    Add
                  </button>
                </div>
                <div className="mt-2 space-y-1.5">
                  {screenComments.map((comment) => (
                    <div key={comment.id} className={`rounded-xl border p-2 text-xs ${comment.resolved ? 'border-emerald-200 bg-emerald-50' : 'border-amber-200 bg-amber-50'}`}>
                      <button
                        type="button"
                        className="w-full text-left"
                        onClick={() => setComments((current) => current.map((item) => (item.id === comment.id ? { ...item, resolved: !item.resolved, updatedAt: nowIso() } : item)))}
                      >
                        <strong>{comment.resolved ? 'Resolved' : 'Open'}:</strong> {comment.body}
                      </button>
                      <div className="mt-2 flex justify-end gap-1">
                        <button type="button" className="rounded-full border px-2 py-0.5" onClick={() => editComment(comment.id)}>
                          Edit
                        </button>
                        <button type="button" className="rounded-full border px-2 py-0.5" onClick={() => setComments((current) => current.filter((item) => item.id !== comment.id))}>
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </main>
    </div>
  );
}
