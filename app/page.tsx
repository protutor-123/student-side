import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsStrip from './components/StatsStrip';
import ServiceCards from './components/ServiceCards';
import ResultsComparison from './components/ResultsComparison';
import HowWeWork from './components/HowWeWork';
import Testimonials from './components/Testimonials';
import CaseStudies from './components/CaseStudies';
import About from './components/About';
import LeadFormSection from './components/LeadFormSection';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* 1. Sticky Navigation Bar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow">
        {/* 2. Hero Section */}
        <Hero />

        {/* 3. Stats Strip */}
        <StatsStrip />

        {/* 4. Service Programs Grid */}
        <ServiceCards />

        {/* 5. Results / Metrics Comparison */}
        <ResultsComparison />

        {/* 6. Process Timeline (How We Work) */}
        <HowWeWork />

        {/* 7. Student/Parent Testimonials */}
        <Testimonials />

        {/* 8. Cohort Outcomes (Case Studies) */}
        <CaseStudies />

        {/* 9. Brand Story & Values (About) */}
        <About />

        {/* 10. Interactive Lead Capture Form */}
        <LeadFormSection />
      </main>

      {/* 11. Footer Links & Copyright */}
      <Footer />
    </div>
  );
}
