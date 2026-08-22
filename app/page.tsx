import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServiceCards from './components/ServiceCards';
import BoardsSubjects from './components/BoardsSubjects';
import WhyChooseUs from './components/WhyChooseUs';
import ResultsComparison from './components/ResultsComparison';
import HowWeWork from './components/HowWeWork';
// import Testimonials from './components/Testimonials';
//import CaseStudies from './components/CaseStudies';
import About from './components/About';
import Footer from './components/Footer';
import ParentPopup from './components/ParentPopup';

const FAQ_DATA = [
  {
    question: 'What curricula does proTutor360 support?',
    answer:
      'We offer expert tutoring for IB (IBDP), IGCSE, CBSE, ICSE, AP, and more. Our tutors are board-certified and specialize in the exact syllabus your child follows.',
  },
  {
    question: 'How does online tutoring work at proTutor360?',
    answer:
      'After a free consultation and diagnostic assessment, we match your child with a specialist tutor. Sessions are 1-on-1, live, and interactive via video call. You receive progress reports after every session.',
  },
  {
    question: 'Do you offer a free trial or consultation?',
    answer:
      'Yes! We offer a completely free initial consultation to understand your child\'s needs, followed by a diagnostic assessment to identify strengths and gaps.',
  },
  {
    question: 'Which subjects do you tutor?',
    answer:
      'We cover Mathematics, Sciences (Physics, Chemistry, Biology), English Language & Literature, History, Economics, Computer Science, and many more across all supported boards.',
  },
  {
    question: 'Are your tutors qualified?',
    answer:
      'All our tutors are subject-matter experts with verified qualifications and teaching experience. They are selected for both academic excellence and the ability to mentor and inspire students.',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* FAQ structured data for rich snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQ_DATA.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />

      {/* Parent discount popup (shows once per visitor) */}
      <ParentPopup />

      {/* 1. Sticky Navigation Bar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow">
        {/* 2. Hero + Lead Capture Form */}
        <Hero />

        {/* 3. Service Programs Grid */}
        <ServiceCards />

        {/* 4. Boards & Subjects */}
        <BoardsSubjects />

        {/* 5. Why Choose Us */}
        <WhyChooseUs />

        {/* 6. Results / Metrics Comparison */}
        <ResultsComparison />

        {/* 7. Process Timeline (How We Work) */}
        <HowWeWork />

        {/* 8. Student/Parent Testimonials */}
        {/*<Testimonials />*/}

        {/* 9. Cohort Outcomes (Case Studies) */}
        {/*<CaseStudies />*/}

        {/* 10. Brand Story & Values (About) */}
        <About />

        {/* 11. FAQ Section — visible content backing the FAQPage schema */}
        <section className="bg-off-white py-20 lg:py-28">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-base font-semibold uppercase tracking-wider text-accent-blue">FAQ</span>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
                Frequently Asked Questions
              </h2>
            </div>
            <dl className="space-y-6">
              {FAQ_DATA.map((faq, idx) => (
                <div key={idx} className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm">
                  <dt className="text-lg font-bold text-navy">{faq.question}</dt>
                  <dd className="mt-2 text-base text-zinc-600 leading-relaxed">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </main>

      {/* 11. Footer Links & Copyright */}
      <Footer />
    </div>
  );
}
