import Hero from '../components/landing/Hero';
import HowItWorks from '../components/landing/HowItWorks';
import Navbar from '../components/landing/NavBar';
import About from '../components/landing/About';
import Footer from '../components/landing/Footer';
import Features from '../components/landing/Features';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-bg text-[#4f4f4f] font-manrope">
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <About />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
