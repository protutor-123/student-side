const POINTS = [
  'IBDP-certified & subject-specialist tutors',
  '1-on-1 personalized online IB tutoring in Dubai',
  'Support across all HL & SL subjects, including TOK, EE & IA',
  'Flexible scheduling that fits your IB calendar',
  'Assessment-aligned strategies with past papers & mark schemes',
  'Targeted help for CAIE, IBO, and international IB standards',
];

export default function WhyChooseUs() {
  return (
    <section className="bg-off-white py-20 lg:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Soft glow behind the card */}
          <div className="absolute -inset-2 rounded-[2rem] bg-amber-300/40 blur-2xl -z-10" />

          <div className="rounded-[2rem] border-2 border-amber-300 bg-off-white p-8 sm:p-12 shadow-[0_0_45px_rgba(252,211,77,0.35)]">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-navy leading-tight">
              Why Choose proTutor365?
            </h2>

            <ul className="mt-8 space-y-5">
              {POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-500" />
                  <span className="text-base sm:text-lg font-bold text-zinc-600 leading-snug">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
