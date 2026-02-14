import React from 'react';
import { ShieldCheck } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-foreground text-muted py-12 border-t border-foreground/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <ShieldCheck className="text-brand-500" size={24} />
            <span className="font-bold text-xl text-background">
              PayPal<span className="text-brand-500">Pro</span> Afrique
            </span>
          </div>
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Tous droits réservés.
          </div>
        </div>

        <div className="border-t border-muted-foreground/20 pt-8 text-center text-xs text-muted-foreground">
          <p className="mb-2">
            Ce site n'est pas affilié à PayPal Inc. "PayPal" est une marque déposée de PayPal Inc.
          </p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="hover:text-background transition-colors">Mentions Légales</a>
            <a href="#" className="hover:text-background transition-colors">Politique de Confidentialité</a>
            <a href="#" className="hover:text-background transition-colors">CGV</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
