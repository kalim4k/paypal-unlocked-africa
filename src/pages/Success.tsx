import React, { useEffect, useState } from 'react';
import { Check, Download, Copy, AlertTriangle, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

declare global { interface Window { fbq?: (...args: unknown[]) => void } }

function getCookie(name: string): string | undefined {
  const m = document.cookie.match(new RegExp('(^|; )' + name + '=([^;]+)'));
  return m ? decodeURIComponent(m[2]) : undefined;
}

const PDF_URL = 'https://ysbiedwkakdqadxtuwab.supabase.co/storage/v1/object/public/uploads/4e8f1e8e-647f-4f41-b154-b6f1046e50dd.pdf';

const Success: React.FC = () => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const value = 1000;
    const currency = 'XOF';

    // Stable event_id: from ?eid= (set by payment-callback for the real transaction).
    // Fallback: reuse/create a per-tab id so reloads don't invent a new one.
    const params = new URLSearchParams(window.location.search);
    let event_id = params.get('eid') || '';
    if (!event_id) {
      const KEY = 'fb_purchase_eid_fallback';
      event_id = sessionStorage.getItem(KEY) || `pu_${crypto.randomUUID()}`;
      sessionStorage.setItem(KEY, event_id);
    }

    // Fire at most once per event_id (across reloads).
    const firedKey = `fb_purchase_fired_${event_id}`;
    if (localStorage.getItem(firedKey)) return;
    localStorage.setItem(firedKey, '1');

    try {
      window.fbq?.('track', 'Purchase', { value, currency }, { eventID: event_id });
    } catch { /* noop */ }

    supabase.functions.invoke('fb-capi', {
      body: {
        event_name: 'Purchase',
        event_id,
        event_source_url: window.location.href,
        value,
        currency,
        fbp: getCookie('_fbp'),
        fbc: getCookie('_fbc'),
      },
    }).catch(() => { /* noop */ });
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(PDF_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* noop */ }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-[#141414] border border-[#222] rounded-[2rem] p-8 text-center shadow-2xl">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center">
            <Check className="w-10 h-10 text-[#c9a227]" strokeWidth={3} />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-[#c9a227] mb-3">
          Merci pour votre achat !
        </h1>
        <p className="text-[#9ca3af] mb-8 leading-relaxed">
          Votre paiement a été validé avec succès. Votre guide est prêt à être téléchargé.
        </p>

        <a
          href={PDF_URL}
          download
          className="inline-flex items-center justify-center gap-2 w-full bg-[#e74c3c] hover:bg-[#c0392b] text-white font-semibold py-4 px-6 rounded-2xl transition mb-6"
        >
          <Download size={20} />
          TÉLÉCHARGER LE PDF
        </a>

        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-5 text-left mb-6">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 shrink-0">
              <AlertTriangle className="w-5 h-5 text-[#f59e0b]" />
            </div>
            <div>
              <p className="font-semibold text-white mb-1">Vous utilisez TikTok ?</p>
              <p className="text-sm text-[#9ca3af] leading-relaxed">
                Le navigateur intégré de TikTok bloque parfois les téléchargements directs. Si le bouton ci-dessus ne fonctionne pas, copiez le lien ci-dessous et ouvrez-le dans un navigateur externe (Chrome, Safari, etc.).
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-4">
            <div className="flex-1 min-w-0 bg-[#0f0f0f] border border-[#2a2a2a] rounded-xl px-3 py-2.5 text-sm text-[#9ca3af] truncate">
              {PDF_URL}
            </div>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 bg-[#1f1f1f] hover:bg-[#2a2a2a] border border-[#2a2a2a] text-white text-sm font-medium px-4 py-2.5 rounded-xl transition shrink-0"
            >
              <Copy size={16} />
              {copied ? 'Copié' : 'Copier'}
            </button>
          </div>
        </div>

        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 w-full bg-transparent hover:bg-[#1a1a1a] border border-[#2a2a2a] text-white font-medium py-3.5 px-6 rounded-2xl transition"
        >
          <Home size={18} />
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
};

export default Success;
