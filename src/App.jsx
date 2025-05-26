import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import FounderPage from "./components/FounderPage";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FeatureSection from "./components/FeatureSection";
import AppDemoSection from "./components/AppDemoSection";
import ExperienceSection from "./components/ExperienceSection";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";
import TermsPage from "./components/TermsPage";
import PrivacyPage from "./components/PrivacyPage";
import TestimonialSection from "./components/TestimonialSection";
import UpdatesPage from "./components/UpdatesPage";
import ContactPage from "./components/ContactPage";


function MainContent() {
  return (
    <>
      <div className="pt-20">
        <HeroSection />
        <FeatureSection />
        <AppDemoSection />
        <ExperienceSection />
        <TestimonialSection />
        <CTASection />
      </div>
      <Footer />
    </>
  );
}


function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes key={location.pathname} location={location}>
        <Route path="/" element={<MainContent />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/about" element={<FounderPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/updates" element={<UpdatesPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </AnimatePresence>
  );
}


export default function App() {
  return (
    <Router>
      <Navbar />
      <AnimatedRoutes />
    </Router>
  );
}
