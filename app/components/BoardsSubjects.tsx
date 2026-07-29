'use client';

import { useState } from 'react';
import { BOARDS } from '@/app/data/boards';

export default function BoardsSubjects() {
  const [activeId, setActiveId] = useState(BOARDS[0].id);
  const activeBoard = BOARDS.find((board) => board.id === activeId) ?? BOARDS[0];

  return (
    <section id="boards" className="bg-white py-20 lg:py-28 scroll-mt-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="text-base font-semibold uppercase tracking-wider text-accent-blue">
            Curricula We Cover
          </h2>
          <p className="mt-2 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
            Boards &amp; Subjects
          </p>
          <p className="mt-4 text-lg text-zinc-600">
            Tutoring mapped to your exact board, level, and subject list.
          </p>
        </div>

        {/* Tab bar */}
        <div className="flex flex-wrap justify-center gap-2 rounded-2xl border border-zinc-200 bg-off-white p-2">
          {BOARDS.map((board) => (
            <button
              key={board.id}
              type="button"
              onClick={() => setActiveId(board.id)}
              className={`rounded-xl px-5 py-2.5 text-sm font-bold transition-all ${
                activeId === board.id
                  ? 'bg-accent-blue text-white shadow-md'
                  : 'text-zinc-600 hover:bg-white hover:text-navy'
              }`}
            >
              {board.name}
            </button>
          ))}
        </div>

        {/* Active board panel */}
        <div className="mt-8 rounded-3xl border border-zinc-100 bg-off-white p-6 sm:p-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {activeBoard.groups.map((group) => (
              <div key={group.label}>
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                  {group.label}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-navy"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
