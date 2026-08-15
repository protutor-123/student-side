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
              {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map((social, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="rounded-full bg-navy border border-zinc-800 p-2 text-zinc-500 hover:text-white hover:border-zinc-700 transition-colors"
                  aria-label={social}
                >
                  {/* Generic placeholder SVG for social */}
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
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
