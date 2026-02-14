import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border last:border-0">
      <button className="w-full py-6 flex justify-between items-center text-left focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
        <span className="text-lg font-semibold text-foreground pr-8">{question}</span>
        <span className="flex-shrink-0 text-brand-600">
          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'}`}>
        <p className="text-muted-foreground leading-relaxed">{answer}</p>
      </div>
    </div>
  );
};

const FAQ: React.FC = () => {
  const faqs = [
    { question: "Est-ce que cette méthode est légale ?", answer: "Absolument. Nous utilisons les options légales offertes par PayPal pour les résidents internationaux. Nous ne faisons pas de falsification de documents, mais nous vous montrons comment structurer votre identité numérique pour être accepté." },
    { question: "Ai-je besoin d'un passeport ?", answer: "C'est recommandé, mais pas obligatoire. Nous avons un module dédié qui explique comment vérifier son identité avec une Carte Nationale d'Identité (CNI) selon les pays." },
    { question: "Cela fonctionne-t-il dans mon pays (Cameroun, Côte d'Ivoire, Sénégal...) ?", answer: "Oui, la méthode est conçue spécifiquement pour les pays d'Afrique francophone qui sont habituellement restreints par PayPal (zone UEMOA, CEMAC, etc.)." },
    { question: "Combien de temps ça prend ?", answer: "La création du compte prend environ 30 minutes en suivant la vidéo. La vérification peut prendre de 24h à 48h selon la réactivité de PayPal." },
    { question: "Et si je n'y arrive pas ?", answer: "Vous avez accès à notre support WhatsApp. Si vous bloquez à une étape, envoyez-nous une capture d'écran et nous vous guiderons." }
  ];

  return (
    <section id="faq" className="py-20 bg-secondary">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Questions Fréquentes</h2>
          <p className="text-muted-foreground">Nous avons répondu aux questions les plus courantes.</p>
        </div>

        <div className="bg-background rounded-2xl shadow-sm border border-border px-6 sm:px-8">
          {faqs.map((faq, idx) => (
            <FAQItem key={idx} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
