'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { submitLead, ActionState } from '@/app/actions/submit-lead';

const initialState: ActionState = {
  success: false,
};

export default function LeadFormSection() {
  const [state, formAction, pending] = useActionState(submitLead, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const [role, setRole] = useState<'student' | 'parent'>('parent');

  // Reset form inputs upon successful submission
  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
      setRole('parent'); // Reset segmented control to default
    }
  }, [state]);

  return (
    <section id="get-started" className="bg-white py-20 lg:py-28 scroll-mt-16 relative">
      {/* Decorative background blob */}
      <div className="absolute inset-0 bg-zinc-50/50 -z-10" />
      <div className="absolute bottom-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-accent-blue/5 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-3xl bg-navy text-white shadow-2xl overflow-hidden relative border border-navy-light">
          {/* Subtle grid pattern background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1E355E_1px,transparent_1px),linear-gradient(to_bottom,#1E355E_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-navy-light/50">
            {/* Left Side: Call to Action Information */}
            <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-accent-blue">Get in Touch</span>
                <h3 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl leading-tight">
                  Start Your Child’s Learning Pathway
                </h3>
                <p className="mt-4 text-sm text-zinc-300 leading-relaxed">
                  Submit the form, and our academic advisors will reach out within 24 hours to schedule your free diagnostic assessment and matched mentor consult.
                </p>
              </div>

              {/* Bullet list of trust points */}
              <div className="mt-8 space-y-4">
                {[
                  { text: 'No commitments or upfront fees' },
                  { text: 'Customized tutor matching process' },
                  { text: '100% satisfaction guarantee' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="rounded-full bg-accent-blue/20 p-1 text-accent-blue shrink-0">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <span className="text-sm font-semibold text-zinc-200">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side: Interactive Lead Form */}
            <div className="lg:col-span-7 p-8 sm:p-12 bg-navy-dark/40">
              {state?.success ? (
                // Success State View
                <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4">
                  <div className="inline-flex rounded-full bg-emerald-500/10 p-4 text-emerald-400 mb-6 animate-bounce">
                    <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-2">Request Received!</h4>
                  <p className="text-zinc-300 max-w-sm text-sm leading-relaxed">
                    Thanks — we'll reach out via email or WhatsApp within 24 hours to coordinate your first steps.
                  </p>
                </div>
              ) : (
                // Form View
                <form ref={formRef} action={formAction} className="space-y-6">
                  {/* Segmented Control for Role */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
                      I am a:
                    </label>
                    <div className="grid grid-cols-2 gap-2 bg-navy-dark p-1 rounded-xl border border-navy-light/40">
                      <button
                        type="button"
                        onClick={() => setRole('parent')}
                        className={`py-3 px-4 rounded-lg text-sm font-bold transition-all ${
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
                        className={`py-3 px-4 rounded-lg text-sm font-bold transition-all ${
                          role === 'student'
                            ? 'bg-accent-blue text-white shadow-md'
                            : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        Student
                      </button>
                    </div>
                    {/* Hidden Input for Form Submission */}
                    <input type="hidden" name="role" value={role} />
                  </div>

                  {/* Honeypot field (hidden from view) */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="company">Company</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      tabIndex={-1}
                      autoComplete="off"
                    />
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
                      className="w-full bg-navy-dark border border-navy-light/60 rounded-xl px-4 py-3.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-all"
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
                      className="w-full bg-navy-dark border border-navy-light/60 rounded-xl px-4 py-3.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-all"
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
                      className="w-full bg-navy-dark border border-navy-light/60 rounded-xl px-4 py-3.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-all"
                    />
                  </div>

                  {/* Server Validation/Submission Error Message */}
                  {state?.error && (
                    <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-4 flex items-start gap-3">
                      <svg className="h-5 w-5 text-red-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                      </svg>
                      <span className="text-xs font-semibold text-red-200">{state.error}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={pending}
                    className="w-full inline-flex items-center justify-center rounded-xl bg-accent-blue hover:bg-accent-blue-hover disabled:bg-zinc-700 py-4 px-6 text-sm font-bold text-white shadow-lg transition-all active:scale-[0.99]"
                  >
                    {pending ? (
                      <div className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Submitting...
                      </div>
                    ) : (
                      'Request Free Consultation'
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
