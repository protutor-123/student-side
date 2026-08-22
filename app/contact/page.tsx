import type { Metadata } from 'next';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LeadForm from '../components/LeadForm';
import { whatsappHref } from '../lib/whatsapp';

const CONTACT_LINKS = [
  {
    label: 'WhatsApp',
    subtitle: 'Chat with us',
    href: whatsappHref,
    iconBg: 'bg-[#25D366]',
    icon: (
      <>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12.001 2C6.478 2 2 6.477 2 12c0 1.892.526 3.66 1.438 5.166L2 22l4.964-1.406A9.945 9.945 0 0 0 12.001 22C17.523 22 22 17.523 22 12S17.523 2 12.001 2zm0 18.06a8.02 8.02 0 0 1-4.09-1.12l-.293-.174-2.946.834.84-2.87-.19-.295A8.02 8.02 0 0 1 3.94 12c0-4.446 3.616-8.06 8.061-8.06 4.444 0 8.06 3.614 8.06 8.06 0 4.446-3.616 8.06-8.06 8.06z" />
      </>
    ),
  },
  {
    label: 'Facebook',
    subtitle: 'Follow our page',
    href: 'https://www.facebook.com/share/18APFT2B9b/',
    iconBg: 'bg-[#1877F2]',
    icon: (
      <path d="M22 12.06C22 6.53 17.52 2 12 2S2 6.53 2 12.06c0 4.99 3.66 9.13 8.44 9.94v-7.03H7.9v-2.91h2.54V9.84c0-2.51 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.91h-2.34V22c4.78-.81 8.44-4.95 8.44-9.94z" />
    ),
  },
  {
    label: 'Instagram',
    subtitle: 'See our updates',
    href: 'https://www.instagram.com/protutorthreesixtydegree?utm_source=qr&igsh=MXMwcmMzM3Z0bXM5cA==',
    iconBg: 'bg-gradient-to-br from-[#f09433] via-[#dc2743] to-[#bc1888]',
    icon: (
      <path d="M12 2c-2.717 0-3.056.012-4.123.06-1.064.049-1.791.218-2.427.465a4.902 4.902 0 00-1.772 1.153A4.902 4.902 0 002.525 5.45c-.247.636-.416 1.363-.465 2.427C2.012 8.944 2 9.283 2 12s.012 3.056.06 4.123c.049 1.064.218 1.791.465 2.427a4.902 4.902 0 001.153 1.772 4.902 4.902 0 001.772 1.153c.636.247 1.363.416 2.427.465C8.944 21.988 9.283 22 12 22s3.056-.012 4.123-.06c1.064-.049 1.791-.218 2.427-.465a4.902 4.902 0 001.772-1.153 4.902 4.902 0 001.153-1.772c.247-.636.416-1.363.465-2.427.048-1.067.06-1.406.06-4.123s-.012-3.056-.06-4.123c-.049-1.064-.218-1.791-.465-2.427a4.902 4.902 0 00-1.153-1.772A4.902 4.902 0 0018.55 2.525c-.636-.247-1.363-.416-2.427-.465C15.056 2.012 14.717 2 12 2zm0 1.802c2.67 0 2.987.01 4.042.059.976.045 1.505.207 1.858.344.467.182.8.399 1.15.748.35.35.566.683.748 1.15.137.353.3.882.344 1.857.048 1.055.058 1.372.058 4.042 0 2.67-.01 2.987-.058 4.042-.045.975-.207 1.504-.344 1.857a3.098 3.098 0 01-.748 1.15c-.35.35-.683.566-1.15.748-.353.137-.882.3-1.857.344-1.054.048-1.372.058-4.042.058-2.67 0-2.987-.01-4.042-.058-.976-.045-1.505-.207-1.858-.344a3.098 3.098 0 01-1.15-.748 3.098 3.098 0 01-.748-1.15c-.137-.353-.3-.882-.344-1.857-.048-1.055-.058-1.372-.058-4.042 0-2.67.01-2.987.058-4.042.045-.975.207-1.504.344-1.857.182-.467.399-.8.748-1.15.35-.35.683-.566 1.15-.748.353-.137.882-.3 1.858-.344 1.055-.048 1.372-.058 4.042-.058zM12 6.865a5.135 5.135 0 100 10.27 5.135 5.135 0 000-10.27zm0 8.468a3.333 3.333 0 110-6.666 3.333 3.333 0 010 6.666zm5.338-8.671a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z" />
    ),
  },
];

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with proTutor360 for personalized online tutoring in the UAE. Message us on WhatsApp or visit our Business Bay, Dubai office.',
  alternates: {
    canonical: 'https://www.protutor360.com/contact',
  },
  openGraph: {
    title: 'Contact Us | proTutor360',
    description:
      'Get in touch with proTutor360 for personalized online tutoring in the UAE. Message us on WhatsApp or visit our Business Bay, Dubai office.',
    url: 'https://www.protutor360.com/contact',
    siteName: 'proTutor360',
    locale: 'en_AE',
    type: 'website',
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

                {CONTACT_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 rounded-2xl border border-zinc-100 bg-off-white p-8 transition-colors hover:bg-zinc-50"
                  >
                    <span className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white ${link.iconBg}`}>
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden="true">
                        {link.icon}
                      </svg>
                    </span>
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-wider text-accent-blue">
                        {link.label}
                      </h3>
                      <p className="mt-1 text-base font-semibold text-navy">{link.subtitle}</p>
                    </div>
                  </a>
                ))}
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
