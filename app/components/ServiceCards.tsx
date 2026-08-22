export default function ServiceCards() {
  const services = [
    {
      title: 'Academic Tutoring',
      description: 'Strengthen core understanding, catch up on difficult topics, and excel in daily school subjects.',
      bullets: ['Mathematics (Algebra to Calculus)', 'Sciences (Physics, Chemistry, Biology)', 'English Language & Literature', 'History & Social Studies'],
      icon: (
        <svg className="h-6 w-6 text-accent-blue" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
      ),
    },
    {
      title: 'Test Prep',
      description: 'Strategic preparation to boost confidence, master time management, and maximize test scores.',
      bullets: ['SAT / ACT Prep', 'AP & IB Course Exams', 'ISEE / SSAT Board Prep', 'Custom Practice Test & Analysis'],
      icon: (
        <svg className="h-6 w-6 text-accent-blue" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
        </svg>
      ),
    },
    {
      title: 'Skill Building & Enrichment',
      description: 'Cultivate critical thinking, study habits, and specialized skills to prepare students for college and beyond.',
      bullets: ['Executive Functioning & Study Skills', 'Coding & Computer Science', 'Public Speaking & Debate', 'College Essay & Application Guidance'],
      icon: (
        <svg className="h-6 w-6 text-accent-blue" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="services" className="bg-off-white py-20 lg:py-28 scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-base font-semibold uppercase tracking-wider text-accent-blue">Our Programs</span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
            Tailored Tutoring for Every Academic Milestone
          </h2>
          <p className="mt-4 text-lg text-zinc-600">
            We focus on understanding each student's unique learning profile to design the perfect pathway to success.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="flex flex-col justify-between rounded-2xl bg-white border border-zinc-100 p-8 shadow-sm transition-all hover:shadow-xl hover:translate-y-[-4px] duration-300"
            >
              <div>
                {/* Icon wrapper */}
                <div className="inline-flex rounded-xl bg-accent-blue/10 p-3 mb-6">
                  {service.icon}
                </div>

                <h3 className="text-xl font-bold text-navy mb-3">{service.title}</h3>
                <p className="text-sm text-zinc-600 leading-relaxed mb-6">{service.description}</p>

                {/* Bullets */}
                <ul className="space-y-3">
                  {service.bullets.map((bullet, bulletIdx) => (
                    <li key={bulletIdx} className="flex items-start gap-2.5">
                      <svg className="h-5 w-5 text-accent-blue/80 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      <span className="text-sm text-zinc-700 font-medium">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Link inside Card */}
              <div className="mt-8 pt-6 border-t border-zinc-100">
                <a
                  href="#get-started"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-accent-blue hover:text-accent-blue-hover"
                >
                  Learn more<span className="sr-only"> about {service.title}</span>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
