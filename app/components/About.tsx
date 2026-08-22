export default function About() {
  const values = [
    {
      title: 'Individual First',
      description: 'Every student learns differently. We customize every roadmap, lesson plan, and homework sheet to match their speed and understanding.',
      icon: (
        <svg className="h-6 w-6 text-accent-blue" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      ),
    },
    {
      title: 'Mastery Over Memorization',
      description: 'We prioritize deep conceptual understanding over short-term rote cramming. We teach students how to think critically and solve problems independently.',
      icon: (
        <svg className="h-6 w-6 text-accent-blue" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a3 3 0 00-3-3H9.75a3 3 0 00-3 3h1.5m5.25-.008v5.251m0 0a3 3 0 003 3h.75a3 3 0 003-3h-1.5m-6.75-2.25h10.5" />
        </svg>
      ),
    },
    {
      title: 'Mentors, Not Just Tutors',
      description: 'Our educators are selected not only for their academic brilliance, but also for their ability to connect, empathize, and inspire confidence in students.',
      icon: (
        <svg className="h-6 w-6 text-accent-blue" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="about" className="bg-white py-20 lg:py-28 scroll-mt-16 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:items-center">

          {/* Left Column: Philosophy Description */}
          <div className="lg:col-span-5 text-center lg:text-left">
            <span className="text-base font-semibold uppercase tracking-wider text-accent-blue block">About proTutor360</span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
              Our Story &amp; Philosophy
            </h2>
            <p className="mt-6 text-zinc-600 leading-relaxed text-base">
              Standard classrooms often struggle to address the unique pace and style of individual learners. We founded proTutor360 to close that gap. By combining premium materials with handpicked, compassionate mentors, we build custom pathways that unlock every student’s natural potential.
            </p>
            <p className="mt-4 text-zinc-600 leading-relaxed text-base">
              Whether your child needs support catching up on complex concepts or enrichment to push ahead, our structured methodologies ensure they develop the confidence to succeed independently.
            </p>
          </div>

          {/* Right Column: Values Cards */}
          <div className="lg:col-span-7 space-y-6">
            {values.map((v, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row gap-5 rounded-2xl bg-zinc-50 border border-zinc-100 p-6 sm:p-8 transition-all hover:scale-[1.01]"
              >
                {/* Value Icon */}
                <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-blue/10 text-accent-blue">
                  {v.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-navy mb-2">{v.title}</h3>
                  <p className="text-sm text-zinc-600 leading-relaxed">{v.description}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
