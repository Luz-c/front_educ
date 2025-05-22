import Header from "../../Header";
import HeroSection from "../../HeroSection";
import BenefitsSection from "../../BenefitsSection";
import FeaturesSection from "../../FeaturesSection";
import WorkflowSection from "../../WorkflowSection";
import TestimonialsSection from "../../TestimonialsSection";
import FAQSection from "../../FAQSection";
import CTASection from "../../CTASection";
import Footer from "../../Footer";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    // Scroll reveal animation
    const checkReveal = () => {
      const windowHeight = window.innerHeight;
      const revealPoint = 150;
      
      const revealElements = document.querySelectorAll('.reveal');
      
      revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < windowHeight - revealPoint) {
          element.classList.add('active');
        }
      });
    };
    
    // Check on load
    checkReveal();
    
    // Check on scroll
    window.addEventListener('scroll', checkReveal);
    
    // Check on resize
    window.addEventListener('resize', checkReveal);
    
    return () => {
      window.removeEventListener('scroll', checkReveal);
      window.removeEventListener('resize', checkReveal);
    };
  }, []);

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <BenefitsSection />
        <FeaturesSection />
        <WorkflowSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
};

export default Home;
