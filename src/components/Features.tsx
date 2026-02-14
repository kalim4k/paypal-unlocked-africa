import React from 'react';
import { ShieldCheck, Globe2, Banknote, Smartphone } from 'lucide-react';

const Features: React.FC = () => {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Une solution complète pour votre liberté financière
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Nous ne vous montrons pas seulement comment "créer" un compte. Nous vous donnons la stratégie complète pour le maintenir en vie, le vérifier et l'utiliser au quotidien sans crainte.
            </p>

            <div className="space-y-6">
              {[
                { icon: <ShieldCheck className="w-6 h-6 text-brand-600" />, title: "Vérification d'Identité Garantie", desc: "Les documents exacts à fournir et comment les soumettre pour être validé du premier coup." },
                { icon: <Globe2 className="w-6 h-6 text-brand-600" />, title: "Utilisable Partout dans le Monde", desc: "Recevez des paiements de clients aux USA, en Europe ou en Asie sans restriction." },
                { icon: <Banknote className="w-6 h-6 text-brand-600" />, title: "Retrait vers Mobile Money & Banque", desc: "Les techniques pour transférer vos dollars/euros vers votre Orange Money, Wave ou compte bancaire local." },
                { icon: <Smartphone className="w-6 h-6 text-brand-600" />, title: "Gestion depuis l'Afrique", desc: "Pas besoin de VPN coûteux ou de VPS complexe. Gérez votre compte simplement." }
              ].map((feature, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="bg-brand-50 p-2 rounded-lg">{feature.icon}</div>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-foreground">{feature.title}</h4>
                    <p className="text-muted-foreground mt-1">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-2 bg-gradient-to-br from-brand-600 to-brand-800 rounded-3xl p-8 md:p-12 text-primary-foreground shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-background opacity-10 rounded-full"></div>
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-background opacity-10 rounded-full"></div>

            <div className="relative z-10 text-center">
              <h3 className="text-2xl font-bold mb-6">Ce que ça change pour vous</h3>
              <div className="grid grid-cols-1 gap-6 text-left">
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
                  <p className="font-semibold text-brand-100 text-sm mb-1">AVANT</p>
                  <p>❌ Refuser des clients internationaux</p>
                  <p>❌ Payer des intermédiaires coûteux</p>
                  <p>❌ Peur constante du blocage</p>
                </div>
                <div className="flex justify-center">
                  <div className="bg-background text-brand-700 rounded-full p-2 shadow-lg">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                  </div>
                </div>
                <div className="bg-background text-foreground p-4 rounded-xl shadow-lg transform scale-105">
                  <p className="font-semibold text-brand-600 text-sm mb-1">APRÈS LA FORMATION</p>
                  <p className="font-medium">✅ Acceptez tous les paiements</p>
                  <p className="font-medium">✅ Recevez 100% de vos gains</p>
                  <p className="font-medium">✅ Business stable et scalable</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
