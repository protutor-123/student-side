export default function Testimonials() {
  const testimonials = [
    {
      quote: "proTutor365 transformed my son's attitude towards math. His grades went from a C- to an A in just three months, and he actually looks forward to his sessions.",
      name: "Sarah Jenkins",
      role: "Parent of 10th Grader",
      initials: "SJ",
    },
    {
      quote: "The AP Calculus prep sessions were incredibly structured. My tutor knew exactly what areas of the curriculum were heavily tested and helped me score a 5 on the exam.",
      name: "David K.",
      role: "High School Senior",
      initials: "DK",
    },
    {
      quote: "As a busy parent, the flexible scheduling of online classes has been a lifesaver. The feedback after each session keeps us informed and involved.",
      name: "Elena Rostova",
      role: "Parent of 8th Grader",
      initials: "ER",
    },
  ];

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-base font-semibold uppercase tracking-wider text-accent-blue">Success Stories</h2>
          <p className="mt-2 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
            Trusted by Parents, Loved by Students
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-2xl bg-zinc-50 border border-zinc-100 p-8 shadow-sm relative hover:shadow-md transition-shadow"
            >
              {/* Quote Mark SVG */}
              <div className="absolute top-6 right-8 text-zinc-200">
                <svg className="h-10 w-10 opacity-40" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M10 8v8h6v8H6v-8h4V8h2zm14 0v8h6v8H20v-8h4V8h2z" />
                </svg>
              </div>

              <div>
                <p className="text-base text-zinc-700 italic leading-relaxed relative z-10">
                  "{t.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="mt-8 flex items-center gap-4 pt-6 border-t border-zinc-200/50">
                {/* Initials Avatar */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-blue text-sm font-extrabold text-white">
                  {t.initials}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-navy">{t.name}</h4>
                  <p className="text-xs text-zinc-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
