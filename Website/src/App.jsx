import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
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

// AnimatedRoutes handles animated transitions between pages
function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes key={location.pathname} location={location}>
        <Route path="/" element={<MainContent />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
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
