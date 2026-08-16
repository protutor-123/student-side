'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { submitLead, ActionState } from '@/app/actions/submit-lead';
import { whatsappHref } from '../lib/whatsapp';

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

              {/* Submit Button + WhatsApp */}
              <div className="flex items-stretch gap-3">
                <button
                  type="submit"
                  disabled={pending}
                  className="inline-flex flex-1 items-center justify-center rounded-xl bg-accent-blue px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:bg-accent-blue-hover disabled:bg-zinc-700 active:scale-[0.99]"
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

                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat with us on WhatsApp"
                  className="inline-flex shrink-0 items-center justify-center rounded-xl bg-[#25D366] px-4 shadow-lg transition-transform hover:scale-105 active:scale-95"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-white" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12.001 2C6.478 2 2 6.477 2 12c0 1.892.526 3.66 1.438 5.166L2 22l4.964-1.406A9.945 9.945 0 0 0 12.001 22C17.523 22 22 17.523 22 12S17.523 2 12.001 2zm0 18.06a8.02 8.02 0 0 1-4.09-1.12l-.293-.174-2.946.834.84-2.87-.19-.295A8.02 8.02 0 0 1 3.94 12c0-4.446 3.616-8.06 8.061-8.06 4.444 0 8.06 3.614 8.06 8.06 0 4.446-3.616 8.06-8.06 8.06z" />
                  </svg>
                </a>
              </div>

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
