import type { Metadata } from 'next';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LeadForm from '../components/LeadForm';
import { whatsappHref } from '../lib/whatsapp';

export const metadata: Metadata = {
  title: 'Contact Us | proTutor360',
  description:
    'Get in touch with proTutor360 for personalized online tutoring in the UAE. Message us on WhatsApp or visit our Business Bay, Dubai office.',
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-grow">
        <section className="bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <h1 className="text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">
                Contact Us
              </h1>
              <p className="mt-4 text-lg text-zinc-600">
                Have questions or ready to get started? Reach out and our team will respond within 24 hours.
              </p>
            </div>

            <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
              {/* Left: Contact info */}
              <div className="lg:col-span-5 space-y-6">
                <div className="rounded-2xl border border-zinc-100 bg-off-white p-8">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-accent-blue mb-4">
                    Our Office
                  </h2>
                  <p className="text-base text-zinc-700 leading-relaxed">
                    Executive Tower
                    <br />
                    Business Bay
                    <br />
                    Dubai, United Arab Emirates
                  </p>
                </div>

                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-2xl border border-zinc-100 bg-off-white p-8 transition-colors hover:bg-zinc-50"
                >
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                      <path d="M12.001 2C6.478 2 2 6.477 2 12c0 1.892.526 3.66 1.438 5.166L2 22l4.964-1.406A9.945 9.945 0 0 0 12.001 22C17.523 22 22 17.523 22 12S17.523 2 12.001 2zm0 18.06a8.02 8.02 0 0 1-4.09-1.12l-.293-.174-2.946.834.84-2.87-.19-.295A8.02 8.02 0 0 1 3.94 12c0-4.446 3.616-8.06 8.061-8.06 4.444 0 8.06 3.614 8.06 8.06 0 4.446-3.616 8.06-8.06 8.06z" />
                    </svg>
                  </span>
                  <div>
                    <h2 className="text-sm font-bold uppercase tracking-wider text-accent-blue">
                      WhatsApp
                    </h2>
                    <p className="mt-1 text-base font-semibold text-navy">Chat with us</p>
                  </div>
                </a>
              </div>

              {/* Right: Lead form */}
              <div className="lg:col-span-7">
                <LeadForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
