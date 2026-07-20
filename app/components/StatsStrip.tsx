export default function StatsStrip() {
  const stats = [
    { value: '10,000+', label: 'Students Tutored' },
    { value: '95%', label: 'Improved Grades' },
    { value: '+18%', label: 'Avg Score Boost' },
    { value: '500+', label: 'Expert Tutors' },
    { value: '4.9/5', label: 'Average Rating' },
  ];

  return (
    <section className="bg-navy py-12 relative overflow-hidden">
      {/* Decorative subtle background accents */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(47,111,237,0.15),rgba(255,255,255,0))]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-y-8 gap-x-4 md:grid-cols-5 md:gap-x-8 text-center divide-y divide-zinc-800/50 md:divide-y-0 md:divide-x divide-zinc-800/50">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`flex flex-col justify-center ${
                index % 2 === 0 ? 'sm:border-none' : ''
              } pt-6 md:pt-0 first:pt-0 md:first:pl-0`}
            >
              <dd className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
                {stat.value}
              </dd>
              <dt className="mt-2 text-xs font-semibold uppercase tracking-wider text-zinc-300">
                {stat.label}
              </dt>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
