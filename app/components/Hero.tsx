import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pt-16 pb-20 lg:pt-24 lg:pb-28">
      {/* Decorative background blobs */}
      <div className="absolute top-0 right-0 -z-10 h-[600px] w-[600px] rounded-full bg-accent-blue/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 -z-10 h-[400px] w-[400px] rounded-full bg-navy/5 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-12 lg:items-center">
          {/* Left Column: Text & CTA */}
          <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left">
            <div className="inline-flex self-center lg:self-start items-center gap-2 rounded-full bg-accent-blue/10 px-4 py-1.5 text-sm font-semibold text-accent-blue mb-6">
              <span className="flex h-2 w-2 rounded-full bg-accent-blue animate-pulse" />
              Empowering Students for a Brighter Future
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-navy sm:text-5xl lg:text-6xl leading-[1.15]">
              Personalized Learning. <br className="hidden sm:inline" />
              <span className="text-accent-blue">Exceptional Outcomes.</span>
            </h1>

            <p className="mt-6 text-lg text-zinc-600 sm:text-xl max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              We connect students with world-class mentors to build academic mastery, boost test scores, and foster lifelong learning skills. Get a customized curriculum tailored entirely to your child's goals.
            </p>

            {/* Micro-benefit list */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-8">
              {[
                { title: 'Expert 1-on-1 Mentorship' },
                { title: 'Custom Learning Pathway' },
                { title: 'Flexible Online Scheduling' },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-accent-blue shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <span className="text-sm font-medium text-zinc-700">{item.title}</span>
                </div>
              ))}
            </div>

            {/* Call to Actions */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href="#get-started"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-accent-blue px-8 py-4 text-base font-bold text-white shadow-lg shadow-accent-blue/20 transition-all hover:bg-accent-blue-hover hover:translate-y-[-2px] active:translate-y-0"
              >
                Schedule Free Consultation
              </a>
              <a
                href="#services"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white px-8 py-4 text-base font-semibold text-zinc-700 shadow-sm transition-all hover:bg-zinc-50 hover:border-zinc-300"
              >
                Explore Programs
              </a>
            </div>
          </div>

          {/* Right Column: Premium Image Area */}
          <div className="mt-16 lg:mt-0 lg:col-span-5 relative">
            <div className="relative mx-auto max-w-[500px] lg:max-w-none">
              {/* Outer decorative card */}
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-dashed border-zinc-200 rounded-3xl -z-10" />

              {/* Main image container */}
              <div className="overflow-hidden rounded-3xl bg-zinc-50 shadow-2xl transition-transform hover:scale-[1.01] duration-500">
                <Image
                  src="/hero-illustration.jpg"
                  alt="Student and tutor collaborating online"
                  width={600}
                  height={400}
                  priority
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Float Card 1: Star Rating */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl border border-zinc-100 flex items-center gap-3">
                <div className="rounded-full bg-yellow-50 p-2">
                  <svg className="h-6 w-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-extrabold text-navy">4.9 / 5 Rating</div>
                  <div className="text-xs text-zinc-500">From 500+ parent reviews</div>
                </div>
              </div>

              {/* Float Card 2: Growth metric */}
              <div className="absolute -top-6 -right-6 bg-white rounded-2xl p-4 shadow-xl border border-zinc-100 flex items-center gap-3">
                <div className="rounded-full bg-emerald-50 p-2">
                  <svg className="h-6 w-6 text-emerald-500" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-extrabold text-navy">+18% Score Gain</div>
                  <div className="text-xs text-zinc-500">Average improvement</div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
