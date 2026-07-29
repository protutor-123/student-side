'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { submitLead, ActionState } from '@/app/actions/submit-lead';

const initialState: ActionState = {
  success: false,
};

export default function LeadForm() {
  const [state, formAction, pending] = useActionState(submitLead, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const [role, setRole] = useState<'student' | 'parent'>('parent');

  // Reset form inputs upon successful submission
  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
      setRole('parent');
    }
  }, [state]);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-navy-light bg-navy text-white shadow-2xl">
      {/* Subtle grid pattern background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1E355E_1px,transparent_1px),linear-gradient(to_bottom,#1E355E_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_70%,transparent_100%)] opacity-40" />

      <div className="relative p-6 sm:p-8">
        {state?.success ? (
          // Success State View
          <div className="flex flex-col items-center justify-center text-center py-14 px-2">
            <div className="inline-flex rounded-full bg-emerald-500/10 p-4 text-emerald-400 mb-6">
              <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-2">Request Received!</h3>
            <p className="text-sm text-zinc-300 max-w-sm leading-relaxed">
              Thanks — we&apos;ll reach out via email or WhatsApp within 24 hours to coordinate your first steps.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-extrabold tracking-tight leading-tight">
                Book Your Free Consultation
              </h2>
              <p className="mt-2 text-sm text-zinc-300 leading-relaxed">
                Tell us a little about yourself and an academic advisor will reach out within 24 hours.
              </p>
            </div>

            <form ref={formRef} action={formAction} className="space-y-5">
              {/* Segmented Control for Role */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                  I am a:
                </label>
                <div className="grid grid-cols-2 gap-2 rounded-xl border border-navy-light/40 bg-navy-dark p-1">
                  <button
                    type="button"
                    onClick={() => setRole('parent')}
                    className={`rounded-lg px-4 py-2.5 text-sm font-bold transition-all ${
                      role === 'parent'
                        ? 'bg-accent-blue text-white shadow-md'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Parent
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('student')}
                    className={`rounded-lg px-4 py-2.5 text-sm font-bold transition-all ${
                      role === 'student'
                        ? 'bg-accent-blue text-white shadow-md'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Student
                  </button>
                </div>
                <input type="hidden" name="role" value={role} />
              </div>

              {/* Honeypot field (hidden from view) */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="company">Company</label>
                <input type="text" id="company" name="company" tabIndex={-1} autoComplete="off" />
              </div>

              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  placeholder="e.g. John Doe"
                  className="w-full rounded-xl border border-navy-light/60 bg-navy-dark px-4 py-3 text-sm text-white placeholder-zinc-500 transition-all focus:border-accent-blue focus:outline-none focus:ring-1 focus:ring-accent-blue"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="e.g. john@example.com"
                  className="w-full rounded-xl border border-navy-light/60 bg-navy-dark px-4 py-3 text-sm text-white placeholder-zinc-500 transition-all focus:border-accent-blue focus:outline-none focus:ring-1 focus:ring-accent-blue"
                />
              </div>

              {/* WhatsApp Number */}
              <div>
                <label htmlFor="whatsapp" className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                  WhatsApp Number
                </label>
                <input
                  type="tel"
                  id="whatsapp"
                  name="whatsapp"
                  required
                  placeholder="+91 98765 43210"
                  className="w-full rounded-xl border border-navy-light/60 bg-navy-dark px-4 py-3 text-sm text-white placeholder-zinc-500 transition-all focus:border-accent-blue focus:outline-none focus:ring-1 focus:ring-accent-blue"
                />
              </div>

              {/* Server Validation/Submission Error Message */}
              {state?.error && (
                <div className="flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-3">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-red-400" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                  </svg>
                  <span className="text-xs font-semibold text-red-200">{state.error}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={pending}
                className="inline-flex w-full items-center justify-center rounded-xl bg-accent-blue px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:bg-accent-blue-hover disabled:bg-zinc-700 active:scale-[0.99]"
              >
                {pending ? (
                  <div className="flex items-center gap-2">
                    <svg className="h-5 w-5 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Submitting...
                  </div>
                ) : (
                  'Request Free Consultation'
                )}
              </button>

              <p className="text-center text-xs text-zinc-400">
                No commitments or upfront fees · 100% satisfaction guarantee
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
