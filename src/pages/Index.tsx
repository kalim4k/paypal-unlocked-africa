import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ProblemSection from '../components/ProblemSection';
import Features from '../components/Features';
import Modules from '../components/Modules';
import Pricing from '../components/Pricing';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen font-sans antialiased text-foreground bg-background selection-brand">
      <Navbar />
      <main>
        <Hero />
        <ProblemSection />
        <Features />
        <Modules />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
