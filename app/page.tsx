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

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
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
      </main>

      {/* 11. Footer Links & Copyright */}
      <Footer />
    </div>
  );
}
