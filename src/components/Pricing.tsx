import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Star } from 'lucide-react';

const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-50 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-background rounded-3xl shadow-2xl border border-border overflow-hidden">
          <div className="grid lg:grid-cols-2">
            <div className="bg-secondary p-8 lg:p-12 flex items-center justify-center relative">
              <div className="absolute top-6 left-6 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                <Star size={12} fill="currentColor" /> Best Seller
              </div>
              <img
                src="https://celinaroom.com/wp-content/uploads/2026/02/1771107425417-fatm26qe0sd.png"
                alt="Pack Formation PayPal"
                className="w-full max-w-md drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-foreground mb-2">Offre Spéciale Lancement</h2>
              <p className="text-muted-foreground mb-8">Accès immédiat et à vie à la formation complète.</p>

              <div className="flex items-end gap-4 mb-8">
                <span className="text-5xl font-extrabold text-foreground">2.500 <span className="text-2xl font-bold text-muted-foreground">FCFA</span></span>
                <span className="text-xl text-muted-foreground line-through mb-2">15.000 FCFA</span>
              </div>

              <div className="space-y-4 mb-10">
                {["Accès à vie aux modules vidéos", "Guide PDF des documents valides", "Liste des banques compatibles", "Support prioritaire WhatsApp", "Mises à jour gratuites (Changements 2026)"].map((item, idx) => (
                  <div key={idx} className="flex items-center text-foreground">
                    <div className="bg-green-100 p-1 rounded-full mr-3">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <Link to="/confirm" className="w-full bg-brand-600 text-primary-foreground text-lg font-bold py-4 rounded-xl hover:bg-brand-700 hover:shadow-lg hover:shadow-brand-500/25 transition-all transform hover:-translate-y-1 flex justify-center items-center">
                Je veux mon compte vérifié maintenant
              </Link>

              <p className="text-center text-xs text-muted-foreground mt-4">
                Paiement sécurisé par Mobile Money & Carte Bancaire. <br />
                Garantie satisfait ou remboursé 30 jours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
