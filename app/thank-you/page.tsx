import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { whatsappHref } from '../lib/whatsapp';

export const metadata: Metadata = {
  title: 'Thank You',
  description: 'Thanks for contacting ProTutor360. We will be in touch with you shortly.',
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-grow">
        <section className="bg-white py-24 lg:py-32">
          <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
            <div className="inline-flex rounded-full bg-emerald-500/10 p-4 text-emerald-500 mb-6">
              <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">
              Thank You!
            </h1>
            <p className="mt-4 text-lg text-zinc-600 leading-relaxed">
              We&apos;ve received your request and will be in touch with you shortly. An academic
              advisor will reach out via email or WhatsApp within 24 hours.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
              >
                Chat with us on WhatsApp
              </a>
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-xl border border-zinc-200 px-6 py-3.5 text-sm font-bold text-navy transition-colors hover:bg-zinc-50"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
