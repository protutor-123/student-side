import LeadForm from './LeadForm';

const BENEFITS = [
  'Expert 1-on-1 Mentorship',
  'Custom Learning Pathway',
  'Flexible Online Scheduling',
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pt-12 pb-20 lg:pt-16 lg:pb-24">
      {/* Decorative background blobs */}
      <div className="absolute top-0 right-0 -z-10 h-[600px] w-[600px] rounded-full bg-accent-blue/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 -z-10 h-[400px] w-[400px] rounded-full bg-navy/5 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Value proposition */}
          <div className="flex flex-col text-center lg:col-span-6 lg:text-left">
            <div className="mb-6 inline-flex items-center gap-2 self-center rounded-full bg-accent-blue/10 px-4 py-1.5 text-sm font-semibold text-accent-blue lg:self-start">
              <span className="flex h-2 w-2 rounded-full bg-accent-blue animate-pulse" />
              Empowering Students for a Brighter Future
            </div>

            <h1 className="text-4xl font-extrabold leading-[1.15] tracking-tight text-navy sm:text-5xl lg:text-6xl">
              Personalized Learning. <br className="hidden sm:inline" />
              <span className="text-accent-blue">Exceptional Outcomes.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-600 lg:mx-0">
              We connect students with world-class mentors to build academic mastery, boost test
              scores, and foster lifelong learning skills.
            </p>

            {/* Micro-benefit list */}
            <div className="mt-8 flex flex-col items-center gap-3 lg:items-start">
              {BENEFITS.map((benefit) => (
                <div key={benefit} className="flex items-center gap-2.5">
                  <svg
                    className="h-5 w-5 shrink-0 text-accent-blue"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <span className="text-base font-medium text-zinc-700">{benefit}</span>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Lead capture form — also the #get-started scroll target
              so mobile lands on the form itself, not the top of the hero copy. */}
          <div
            id="get-started"
            className="mx-auto w-full max-w-[520px] scroll-mt-24 lg:col-span-6 lg:max-w-none lg:scroll-mt-20"
          >
            <LeadForm />
          </div>
        </div>
      </div>
    </section>
  );
}
