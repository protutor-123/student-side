export default function ResultsComparison() {
  const comparisons = [
    {
      metric: 'Average Grade Improvement (GPA Boost)',
      proTutor: { label: '+0.8 GPA Increase', percentage: 95 },
      average: { label: '+0.2 GPA Increase', percentage: 40 },
    },
    {
      metric: 'Average SAT Score Gains',
      proTutor: { label: '+180 Points', percentage: 90 },
      average: { label: '+50 Points', percentage: 35 },
    },
    {
      metric: 'Consistent Homework Completion Rate',
      proTutor: { label: '96% Completion', percentage: 96 },
      average: { label: '68% Completion', percentage: 68 },
    },
    {
      metric: 'College Admission Rate (Top-Choice College)',
      proTutor: { label: '92% Accepted', percentage: 92 },
      average: { label: '62% Accepted', percentage: 62 },
    },
  ];

  return (
    <section id="results" className="bg-white py-20 lg:py-28 scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Layout: Grid splits on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading/Marketing */}
          <div className="lg:col-span-5 text-center lg:text-left">
            <h2 className="text-base font-semibold uppercase tracking-wider text-accent-blue">The Results</h2>
            <h3 className="mt-2 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl leading-tight">
              Designed for Measurable, Proven Growth
            </h3>
            <p className="mt-4 text-base text-zinc-600 leading-relaxed">
              We track progress continuously to ensure students are actually understanding the material and achieving their targets. Our methods produce results that far outshine standard national averages.
            </p>
            
            {/* Short Callout card */}
            <div className="mt-8 rounded-2xl bg-zinc-50 border border-zinc-100 p-6 flex items-start gap-4 text-left">
              <div className="rounded-full bg-accent-blue/10 p-2 shrink-0 text-accent-blue mt-1">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-extrabold text-navy text-sm">Verified Success Path</h4>
                <p className="text-xs text-zinc-500 mt-1">
                  Metrics are gathered from our annual student surveys and verified grade reports.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Bar Graphs */}
          <div className="lg:col-span-7 space-y-8">
            {comparisons.map((item, index) => (
              <div key={index} className="space-y-3">
                <span className="text-sm font-bold text-navy">{item.metric}</span>
                
                {/* Comparison Bar Group */}
                <div className="space-y-2.5">
                  {/* proTutor Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-zinc-700">
                      <span className="text-accent-blue font-extrabold">proTutor Students</span>
                      <span>{item.proTutor.label}</span>
                    </div>
                    <div className="w-full h-7 bg-zinc-100 rounded-lg overflow-hidden">
                      <div
                        className="h-full bg-accent-blue rounded-lg flex items-center px-3 text-white text-[10px] font-extrabold transition-all duration-1000 ease-out"
                        style={{ width: `${item.proTutor.percentage}%` }}
                      >
                        {item.proTutor.percentage}%
                      </div>
                    </div>
                  </div>

                  {/* National Average Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-zinc-500 font-medium">
                      <span>National Average</span>
                      <span>{item.average.label}</span>
                    </div>
                    <div className="w-full h-7 bg-zinc-100/70 rounded-lg overflow-hidden">
                      <div
                        className="h-full bg-zinc-400 rounded-lg flex items-center px-3 text-white text-[10px] font-bold"
                        style={{ width: `${item.average.percentage}%` }}
                      >
                        {item.average.percentage}%
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
