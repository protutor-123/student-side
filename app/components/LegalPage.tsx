import type { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export const LEGAL_EMAIL = 'tutorjobs365@gmail.com';
export const LEGAL_UPDATED = '19 October 2026';

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-bold tracking-tight text-navy">{title}</h2>
      <div className="space-y-3 text-base leading-relaxed text-zinc-700 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-6">
        {children}
      </div>
    </section>
  );
}

export default function LegalPage({ title, intro, children }: { title: string; intro: string; children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow">
        <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-24">
          <header className="mb-10 border-b border-zinc-100 pb-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">{title}</h1>
            <p className="mt-3 text-sm text-zinc-500">Last updated: {LEGAL_UPDATED}</p>
            <p className="mt-4 text-lg text-zinc-600">{intro}</p>
          </header>
          <div className="space-y-10">{children}</div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
