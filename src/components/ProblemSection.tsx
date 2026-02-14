import React from 'react';
import { Ban, Lock, Wallet } from 'lucide-react';

const ProblemSection: React.FC = () => {
  return (
    <section className="py-20 bg-secondary border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Marre de perdre de l'argent à cause de votre localisation ?
          </h2>
          <p className="text-lg text-muted-foreground">
            Entreprendre en Afrique ne devrait pas signifier être exclu du système financier mondial. Si vous reconnaissez ces situations, cette formation est faite pour vous.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: <Ban className="w-10 h-10 text-red-500" />, title: "Compte Restreint", desc: "Votre compte est soudainement limité après avoir reçu votre premier paiement important." },
            { icon: <Lock className="w-10 h-10 text-orange-500" />, title: "Fonds Bloqués 180j", desc: "Le cauchemar de tout freelance : votre argent est gelé pendant 6 mois sans recours possible." },
            { icon: <Wallet className="w-10 h-10 text-muted-foreground" />, title: "Retraits Impossibles", desc: "Vous avez de l'argent sur votre solde, mais aucun moyen de le transférer vers votre banque locale." }
          ].map((item, idx) => (
            <div key={idx} className="bg-background p-8 rounded-2xl shadow-sm border border-border hover:shadow-md transition-shadow">
              <div className="mb-6 bg-secondary w-16 h-16 rounded-full flex items-center justify-center">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
