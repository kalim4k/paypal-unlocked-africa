import React from 'react';
import { CheckCircle, Bookmark } from 'lucide-react';

const Success: React.FC = () => {
  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center px-4">
      <div className="max-w-lg w-full bg-background rounded-2xl shadow-xl border border-border p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-green-500 text-white p-3 rounded-full">
            <CheckCircle size={40} />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-3">Merci pour votre inscription !</h1>
        <p className="text-muted-foreground mb-6">
          Votre accès à l'espace membre est désormais activé.
        </p>

        <div className="text-left bg-muted/50 rounded-xl p-5 mb-6 space-y-2">
          <p className="font-semibold text-foreground mb-3">En rejoignant cette communauté, vous bénéficiez de :</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>💎 Accès à un groupe réservé</li>
            <li>💎 Espace d'échange entre membres</li>
            <li>💎 Environnement respectueux et modéré</li>
            <li>💎 Confidentialité des échanges</li>
            <li>💎 Accès aux contenus exclusifs de la communauté</li>
          </ul>
        </div>

        <div className="text-left bg-muted/50 rounded-xl p-5 mb-6">
          <p className="font-semibold text-foreground mb-3">Accédez à votre espace :</p>
          <div className="space-y-2">
            {[
              { label: 'Groupe 1', url: 'https://t.me/+Rv1cijBoS0JlZWVk' },
              { label: 'Groupe 2', url: 'https://t.me/+FD49U1RawrdlODE0' },
              { label: 'Groupe 3', url: 'https://t.me/bizzichoco' },
              { label: 'Groupe 4', url: 'https://t.me/+i3l4HqqVEH9mOTJk' },
              { label: 'Groupe 5', url: 'https://t.me/dr_man_family_officiel' },
              { label: 'Groupe 6', url: 'https://t.me/blacknutlovers' },
            ].map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-brand-600 hover:text-brand-700 underline truncate"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="text-left bg-muted/50 rounded-xl p-5 mb-6">
          <p className="font-semibold text-foreground mb-3">Sites par pays :</p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: '🇹🇬 Togo', url: 'https://www.exotictogo.com/' },
              { label: '🇬🇭 Ghana', url: 'https://www.exoticghana.com/' },
              { label: '🇧🇯 Bénin', url: 'https://www.exoticbenin.com/' },
              { label: '🇸🇳 Sénégal', url: 'https://www.exoticsenegal.com/' },
              { label: '🇨🇮 Côte d\'Ivoire', url: 'https://www.exoticivoire.com/' },
              { label: '🇲🇱 Mali', url: 'https://www.exoticmali.com/' },
              { label: '🇨🇩 RDC', url: 'https://www.exoticdrc.com/' },
              { label: '🇨🇲 Cameroun', url: 'https://www.exoticcameroon.com/' },
              { label: '🇬🇶 Guinée Éq.', url: 'https://www.exoticeq.com/' },
              { label: '🇧🇫 Burkina Faso', url: 'https://www.exoticfaso.com/' },
              { label: '🇳🇪 Niger', url: 'https://www.exoticniger.com/' },
            ].map((site) => (
              <a
                key={site.url}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-brand-600 hover:text-brand-700 underline"
              >
                {site.label}
              </a>
            ))}
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-left text-sm text-amber-800">
          <div className="flex items-center gap-2 font-semibold mb-2">
            <Bookmark size={16} />
            Important
          </div>
          <p className="mb-2">
            Nous vous recommandons d'enregistrer cette page afin de conserver l'accès aux liens.
          </p>
          <p className="mb-1 font-medium">Si vous consultez depuis le navigateur TikTok :</p>
          <ol className="list-decimal list-inside space-y-1 ml-1">
            <li>Cliquez sur les trois points en haut à droite</li>
            <li>Sélectionnez « Ouvrir dans le navigateur »</li>
            <li>Ajoutez la page à vos favoris</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Success;
