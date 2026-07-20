export default function CaseStudies() {
  const cases = [
    {
      student: 'Liam M. — 11th Grade',
      outcome: 'Score Boost: +210 SAT Points',
      summary: 'Focused on advanced chemistry concepts and critical SAT reading strategies over a 12-week course to secure a 1540 total score.',
      tag: 'Test Prep Success',
    },
    {
      student: 'Aria S. — 9th Grade',
      outcome: 'From C- to A in Honors Algebra',
      summary: 'Overcame math anxiety by targeting foundational pre-algebra gaps and building executive functioning habits to ace the final exam.',
      tag: 'Academic Boost',
    },
    {
      student: 'Marcus T. — 12th Grade',
      outcome: 'Accepted into Stanford University',
      summary: 'Polished college admissions essays and refined coding portfolios during regular computer science enrichment tutoring.',
      tag: 'College Admissions',
    },
  ];

  return (
    <section className="bg-off-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-base font-semibold uppercase tracking-wider text-accent-blue">Case Studies</h2>
          <p className="mt-2 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
            Real Student Outcomes
          </p>
          <p className="mt-4 text-lg text-zinc-600">
            A look at the specific paths and scores achieved by our proTutor cohorts.
          </p>
        </div>

        {/* Case Study Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cases.map((c, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-2xl bg-white border border-zinc-100 p-8 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div>
                {/* Category Tag */}
                <span className="inline-flex items-center rounded-full bg-accent-blue/10 px-3 py-1 text-xs font-semibold text-accent-blue mb-6">
                  {c.tag}
                </span>

                <h3 className="text-xl font-extrabold text-navy mb-3">{c.outcome}</h3>
                <p className="text-sm text-zinc-600 leading-relaxed mb-6">{c.summary}</p>
              </div>

              {/* Student Identifier */}
              <div className="mt-6 pt-4 border-t border-zinc-50 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Student Profile</span>
                <span className="text-sm font-bold text-navy">{c.student}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
