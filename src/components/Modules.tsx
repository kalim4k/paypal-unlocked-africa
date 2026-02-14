import React from 'react';
import { PlayCircle, FileText, Settings, Award } from 'lucide-react';

const Modules: React.FC = () => {
  const modules = [
    { title: "Module 1 : Les Fondations", icon: <Settings className="w-5 h-5" />, lessons: ["Comprendre l'algorithme de sécurité PayPal", "Choisir le bon pays de domiciliation", "Préparer son environnement numérique (IP, Navigateur)"] },
    { title: "Module 2 : Création & Configuration", icon: <PlayCircle className="w-5 h-5" />, lessons: ["Inscription pas à pas (Démonstration Live)", "Configuration du compte Business", "Lier un numéro de téléphone africain"] },
    { title: "Module 3 : Vérification Totale", icon: <FileText className="w-5 h-5" />, lessons: ["Vérifier l'identité sans passeport européen", "Justificatifs de domicile acceptés", "Lier une carte bancaire (laquelle choisir ?)"] },
    { title: "Module 4 : Retrait des Fonds", icon: <Award className="w-5 h-5" />, lessons: ["La méthode secrète de retrait", "Transfert vers Mobile Money (Orange, MTN, Wave)", "Éviter les frais de change exorbitants"] }
  ];

  return (
    <section id="programme" className="py-20 bg-secondary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">Le Programme Détaillé</h2>
          <p className="text-muted-foreground">Une formation concrète, sans blabla. On passe directement à la pratique.</p>
        </div>

        <div className="space-y-6">
          {modules.map((mod, idx) => (
            <div key={idx} className="bg-background border border-border rounded-xl overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-brand-100 text-brand-600 p-2 rounded-lg">{mod.icon}</div>
                  <h3 className="text-xl font-bold text-foreground">{mod.title}</h3>
                </div>
                <ul className="space-y-3 pl-14">
                  {mod.lessons.map((lesson, lIdx) => (
                    <li key={lIdx} className="flex items-start text-muted-foreground">
                      <span className="mr-2 mt-1.5 w-1.5 h-1.5 bg-brand-400 rounded-full flex-shrink-0"></span>
                      {lesson}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Modules;
