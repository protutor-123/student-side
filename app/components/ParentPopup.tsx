'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { submitParentPopup, ParentPopupActionState } from '@/app/actions/submit-parent-popup';

const DISMISSED_KEY = 'parentPopupDismissed';

const BOARDS = ['CBSE', 'ICSE', 'IB', 'IGCSE', 'State Board', 'Other'];
const SUBJECTS = ['Mathematics', 'Science', 'English', 'Social Studies', 'Computer Science', 'Second Language'];

const initialState: ParentPopupActionState = {
  success: false,
};

export default function ParentPopup() {
  const [visible, setVisible] = useState(false);
  const [state, formAction, pending] = useActionState(submitParentPopup, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!localStorage.getItem(DISMISSED_KEY)) {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismiss();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function dismiss() {
    localStorage.setItem(DISMISSED_KEY, 'true');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="parent-popup-heading"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-navy-dark/70 backdrop-blur-sm" onClick={dismiss} />

      {/* Modal */}
      <div className="relative w-full max-w-md rounded-3xl bg-navy text-white shadow-2xl border border-navy-light/50 max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={dismiss}
          aria-label="Close"
          className="absolute right-4 top-4 rounded-full p-1.5 text-zinc-400 hover:text-white hover:bg-navy-light/50 transition-colors"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-6 sm:p-8">
          {state?.success ? (
            <div className="flex flex-col items-center text-center py-8">
              <div className="inline-flex rounded-full bg-emerald-500/10 p-4 text-emerald-400 mb-6">
                <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">You&apos;re on the list!</h3>
              <p className="text-zinc-300 text-sm max-w-sm">
                We&apos;ll reach out shortly with your discount details.
              </p>
              <button
                type="button"
                onClick={dismiss}
                className="mt-6 rounded-xl bg-accent-blue hover:bg-accent-blue-hover px-6 py-3 text-sm font-bold transition-all"
              >
                Done
              </button>
            </div>
          ) : (
            <>
              <span className="inline-block rounded-full bg-accent-blue/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent-blue">
                Limited Time
              </span>
              <h3 id="parent-popup-heading" className="mt-4 text-2xl font-extrabold tracking-tight leading-tight">
                First 10 sign-ups get an exclusive discount!
              </h3>
              <p className="mt-2 text-sm text-zinc-300">
                Parents — leave your details and we&apos;ll lock in your spot.
              </p>

              <form ref={formRef} action={formAction} className="mt-6 space-y-4">
                {/* Honeypot field (hidden from view) */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="popup-company">Company</label>
                  <input type="text" id="popup-company" name="company" tabIndex={-1} autoComplete="off" />
                </div>

                {/* Mobile Number */}
                <div>
                  <label htmlFor="popup-mobile" className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    id="popup-mobile"
                    name="mobile"
                    required
                    placeholder="+91 98765 43210"
                    className="w-full bg-navy-dark border border-navy-light/60 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-all"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="popup-email" className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="popup-email"
                    name="email"
                    required
                    placeholder="e.g. jane@example.com"
                    className="w-full bg-navy-dark border border-navy-light/60 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-all"
                  />
                </div>

                {/* Board */}
                <div>
                  <label htmlFor="popup-board" className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                    Board
                  </label>
                  <select
                    id="popup-board"
                    name="board"
                    required
                    defaultValue=""
                    className="w-full bg-navy-dark border border-navy-light/60 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-all"
                  >
                    <option value="" disabled>
                      Select board
                    </option>
                    {BOARDS.map((board) => (
                      <option key={board} value={board}>
                        {board}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Subjects (optional) */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                    Subjects <span className="normal-case font-medium text-zinc-500">(optional)</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {SUBJECTS.map((subject) => (
                      <label
                        key={subject}
                        className="flex items-center gap-2 rounded-lg border border-navy-light/60 bg-navy-dark px-3 py-2 text-xs font-semibold text-zinc-300 cursor-pointer hover:border-accent-blue/50 transition-colors"
                      >
                        <input
                          type="checkbox"
                          name="subjects"
                          value={subject}
                          className="rounded border-navy-light bg-navy-dark text-accent-blue focus:ring-accent-blue focus:ring-offset-0"
                        />
                        {subject}
                      </label>
                    ))}
                  </div>
                </div>

                {state?.error && (
                  <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-3 flex items-start gap-2">
                    <svg className="h-4 w-4 text-red-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                    </svg>
                    <span className="text-xs font-semibold text-red-200">{state.error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={pending}
                  className="w-full inline-flex items-center justify-center rounded-xl bg-accent-blue hover:bg-accent-blue-hover disabled:bg-zinc-700 py-3.5 px-6 text-sm font-bold text-white shadow-lg transition-all active:scale-[0.99]"
                >
                  {pending ? 'Submitting...' : 'Claim My Discount'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
