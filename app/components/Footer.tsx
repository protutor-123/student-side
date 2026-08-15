import { whatsappHref } from './WhatsAppButton';

const SOCIALS = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/share/18APFT2B9b/',
    icon: (
      <path d="M22 12.06C22 6.53 17.52 2 12 2S2 6.53 2 12.06c0 4.99 3.66 9.13 8.44 9.94v-7.03H7.9v-2.91h2.54V9.84c0-2.51 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.91h-2.34V22c4.78-.81 8.44-4.95 8.44-9.94z" />
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/protutorthreesixtydegree?utm_source=qr&igsh=MXMwcmMzM3Z0bXM5cA==',
    icon: (
      <path d="M12 2c-2.717 0-3.056.012-4.123.06-1.064.049-1.791.218-2.427.465a4.902 4.902 0 00-1.772 1.153A4.902 4.902 0 002.525 5.45c-.247.636-.416 1.363-.465 2.427C2.012 8.944 2 9.283 2 12s.012 3.056.06 4.123c.049 1.064.218 1.791.465 2.427a4.902 4.902 0 001.153 1.772 4.902 4.902 0 001.772 1.153c.636.247 1.363.416 2.427.465C8.944 21.988 9.283 22 12 22s3.056-.012 4.123-.06c1.064-.049 1.791-.218 2.427-.465a4.902 4.902 0 001.772-1.153 4.902 4.902 0 001.153-1.772c.247-.636.416-1.363.465-2.427.048-1.067.06-1.406.06-4.123s-.012-3.056-.06-4.123c-.049-1.064-.218-1.791-.465-2.427a4.902 4.902 0 00-1.153-1.772A4.902 4.902 0 0018.55 2.525c-.636-.247-1.363-.416-2.427-.465C15.056 2.012 14.717 2 12 2zm0 1.802c2.67 0 2.987.01 4.042.059.976.045 1.505.207 1.858.344.467.182.8.399 1.15.748.35.35.566.683.748 1.15.137.353.3.882.344 1.857.048 1.055.058 1.372.058 4.042 0 2.67-.01 2.987-.058 4.042-.045.975-.207 1.504-.344 1.857a3.098 3.098 0 01-.748 1.15c-.35.35-.683.566-1.15.748-.353.137-.882.3-1.857.344-1.054.048-1.372.058-4.042.058-2.67 0-2.987-.01-4.042-.058-.976-.045-1.505-.207-1.858-.344a3.098 3.098 0 01-1.15-.748 3.098 3.098 0 01-.748-1.15c-.137-.353-.3-.882-.344-1.857-.048-1.055-.058-1.372-.058-4.042 0-2.67.01-2.987.058-4.042.045-.975.207-1.504.344-1.857.182-.467.399-.8.748-1.15.35-.35.683-.566 1.15-.748.353-.137.882-.3 1.858-.344 1.055-.048 1.372-.058 4.042-.058zM12 6.865a5.135 5.135 0 100 10.27 5.135 5.135 0 000-10.27zm0 8.468a3.333 3.333 0 110-6.666 3.333 3.333 0 010 6.666zm5.338-8.671a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z" />
    ),
  },
  {
    label: 'WhatsApp',
    href: whatsappHref,
    icon: (
      <>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12.001 2C6.478 2 2 6.477 2 12c0 1.892.526 3.66 1.438 5.166L2 22l4.964-1.406A9.945 9.945 0 0 0 12.001 22C17.523 22 22 17.523 22 12S17.523 2 12.001 2zm0 18.06a8.02 8.02 0 0 1-4.09-1.12l-.293-.174-2.946.834.84-2.87-.19-.295A8.02 8.02 0 0 1 3.94 12c0-4.446 3.616-8.06 8.061-8.06 4.444 0 8.06 3.614 8.06 8.06 0 4.446-3.616 8.06-8.06 8.06z" />
      </>
    ),
  },
  {
    label: 'LinkedIn',
    href: '#',
    icon: (
      <circle cx="12" cy="12" r="10" />
    ),
  },
];

export default function Footer() {
  const links = [
    {
      title: 'Services',
      items: [
        { label: 'Academic Tutoring', href: '#services' },
        { label: 'Test Prep & Analysis', href: '#services' },
        { label: 'Enrichment Programs', href: '#services' },
        { label: '1-on-1 Consultations', href: '#get-started' },
      ],
    },
    {
      title: 'Resources',
      items: [
        { label: 'Tutoring FAQ', href: '#' },
        { label: 'Success Outcomes', href: '#results' },
        { label: 'Diagnostic Tools', href: '#' },
        { label: 'Parent Guides', href: '#' },
      ],
    },
    {
      title: 'About',
      items: [
        { label: 'Our Philosophy', href: '#about' },
        { label: 'How We Work', href: '#how-we-work' },
        { label: 'Expert Tutors', href: '#' },
        { label: 'Careers', href: '#' },
      ],
    },
  ];

  return (
    <footer className="bg-navy-dark text-zinc-400 border-t border-zinc-900 py-16 lg:py-20 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-zinc-900">

          {/* Logo / Tagline Column */}
          <div className="md:col-span-4 flex flex-col justify-start space-y-4">
            <a href="#" className="text-2xl font-bold tracking-tight text-white">
              pro<span className="text-accent-blue font-extrabold">Tutor360</span>
            </a>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-xs">
              Empowering students to achieve their full academic potential through highly-individualized 1-on-1 tutoring.
            </p>

            {/* Social Icons */}
            <div className="flex space-x-4 pt-2">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('#') ? undefined : '_blank'}
                  rel={social.href.startsWith('#') ? undefined : 'noopener noreferrer'}
                  className="rounded-full bg-navy border border-zinc-800 p-2 text-zinc-500 hover:text-white hover:border-zinc-700 transition-colors"
                  aria-label={social.label}
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    {social.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {links.map((col, idx) => (
              <div key={idx} className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                  {col.title}
                </h3>
                <ul className="space-y-2.5">
                  {col.items.map((item, itemIdx) => (
                    <li key={itemIdx}>
                      <a
                        href={item.href}
                        className="text-sm text-zinc-500 hover:text-white transition-colors"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom copyright / legal row */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 gap-4">
          <p className="text-xs text-zinc-600">
            &copy; {new Date().getFullYear()} proTutor360 Education Inc. All rights reserved.
          </p>
          <div className="flex space-x-6 text-xs text-zinc-600">
            <a href="#" className="hover:text-zinc-400">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-400">Terms of Service</a>
            <a href="#" className="hover:text-zinc-400">Cookie Settings</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
