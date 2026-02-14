import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-brand-100 rounded-full blur-3xl opacity-50 -z-10"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-brand-50 rounded-full blur-3xl opacity-50 -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 bg-brand-50 border border-brand-100 rounded-full px-3 py-1 mb-6">
              <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
              <span className="text-xs font-semibold text-brand-800 uppercase tracking-wide">Méthode testée & approuvée en 2026</span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-extrabold text-foreground leading-[1.1] mb-6 tracking-tight">
              Encaissez vos paiements <span className="text-brand-600">PayPal</span> en Afrique sans blocage.
            </h1>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Fini les restrictions géographiques et l'argent bloqué. Découvrez la méthode légale, étape par étape, pour créer un compte PayPal Business 100% vérifié et retirer vos gains dans votre devise locale.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <a
                href="#pricing"
                className="inline-flex justify-center items-center px-8 py-4 text-base font-bold text-primary-foreground bg-brand-600 rounded-full hover:bg-brand-700 transition-all shadow-lg shadow-brand-500/30 hover:-translate-y-1"
              >
                Accéder à la formation
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a
                href="#programme"
                className="inline-flex justify-center items-center px-8 py-4 text-base font-semibold text-foreground bg-background border border-border rounded-full hover:bg-secondary transition-all hover:-translate-y-1"
              >
                Voir le programme
              </a>
            </div>

            <div className="space-y-3">
              <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide mb-2">Inclus dans la formation :</p>
              <ul className="space-y-2">
                {["Guide vidéo pas à pas", "Documents et justificatifs valides", "Support VIP 7j/7"].map((item, i) => (
                  <li key={i} className="flex items-center text-foreground">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-background transform rotate-2 hover:rotate-0 transition-all duration-500">
              <img
                src="https://celinaroom.com/wp-content/uploads/2026/02/1769168069562-3nbn5th6jos.png"
                alt="Formation PayPal Afrique Mockup"
                className="w-full h-auto object-cover bg-secondary"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-900/10 to-transparent pointer-events-none"></div>
            </div>

            <div className="absolute -bottom-6 -left-6 bg-background p-4 rounded-xl shadow-xl border border-border flex items-center gap-3 animate-bounce-slow">
              <div className="bg-green-100 p-2 rounded-full">
                <CheckCircle2 className="text-green-600 w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">Taux de réussite</p>
                <p className="text-lg font-bold text-foreground">100% Vérifié</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
