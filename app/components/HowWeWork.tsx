export default function HowWeWork() {
  const steps = [
    {
      number: '01',
      title: 'Free Consultation',
      description: 'We meet with you to discuss academic challenges, aspirations, schedule availability, and targets.',
    },
    {
      number: '02',
      title: 'Skills Assessment',
      description: 'The student takes a diagnostic assessment to pin down conceptual gaps and strengths.',
    },
    {
      number: '03',
      title: 'Personalized Roadmap',
      description: 'We match your student with the perfect tutor and map out a structured learning plan.',
    },
    {
      number: '04',
      title: 'Focused Tutoring',
      description: 'Engaging, interactive 1-on-1 sessions begin, focused entirely on the student\'s plan.',
    },
    {
      number: '05',
      title: 'Progress Tracking',
      description: 'Receive detailed session notes and regular milestone updates to see conceptual growth.',
    },
    {
      number: '06',
      title: 'Ongoing Enrichment',
      description: 'We fine-tune the roadmap dynamically as your child grows and masters new challenges.',
    },
  ];

  return (
    <section id="how-we-work" className="bg-off-white py-20 lg:py-28 scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-base font-semibold uppercase tracking-wider text-accent-blue">Our Process</h2>
          <p className="mt-2 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
            A Step-by-Step Pathway to Mastery
          </p>
          <p className="mt-4 text-lg text-zinc-600">
            From first consult to top-tier scores, we ensure your child feels supported and guided.
          </p>
        </div>

        {/* Desktop timeline / Mobile stack grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="relative rounded-2xl bg-white border border-zinc-100 p-8 shadow-sm hover:shadow-md transition-shadow group overflow-hidden"
            >
              {/* Number Backdrop */}
              <div className="absolute -top-4 -right-2 text-7xl font-extrabold text-zinc-50 select-none pointer-events-none group-hover:text-accent-blue/5 transition-colors">
                {step.number}
              </div>

              {/* Number Circle Badge */}
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent-blue/10 text-accent-blue font-bold text-sm mb-6">
                {step.number}
              </div>

              <h3 className="text-lg font-bold text-navy mb-3 group-hover:text-accent-blue transition-colors">
                {step.title}
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
