import React, { useState, useEffect } from 'react';
import { Menu, X, ShieldCheck } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-background/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <a href="#" className="flex items-center space-x-2">
            <div className="bg-brand-600 text-primary-foreground p-1.5 rounded-lg">
              <ShieldCheck size={24} />
            </div>
            <span className="font-bold text-xl tracking-tight text-foreground">
              PayPal<span className="text-brand-600">Pro</span> Afrique
            </span>
          </a>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#programme" className="text-sm font-medium text-muted-foreground hover:text-brand-600 transition-colors">Programme</a>
            <a href="#faq" className="text-sm font-medium text-muted-foreground hover:text-brand-600 transition-colors">FAQ</a>
            <button
              onClick={scrollToPricing}
              className="bg-foreground hover:bg-foreground/90 text-background px-5 py-2.5 rounded-full text-sm font-semibold transition-all transform hover:scale-105 shadow-lg"
            >
              Obtenir la formation
            </button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-muted-foreground hover:text-foreground p-2">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-t border-border shadow-xl p-4 flex flex-col space-y-4">
          <a href="#programme" onClick={() => setMobileMenuOpen(false)} className="text-base font-medium text-muted-foreground px-2 py-1">Programme</a>
          <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="text-base font-medium text-muted-foreground px-2 py-1">FAQ</a>
          <button onClick={scrollToPricing} className="w-full bg-brand-600 text-primary-foreground px-5 py-3 rounded-lg text-center font-semibold">
            Obtenir la formation
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
