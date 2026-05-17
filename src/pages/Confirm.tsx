import React, { useState } from 'react';
import { ShieldCheck, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const Confirm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleContinue = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke('create-checkout', {
        body: {
          email: 'client@example.com',
          firstName: 'Client',
          lastName: 'PayPal',
        },
      });

      if (fnError) throw fnError;

      if (data?.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else {
        setError("Impossible d'initier le paiement. Veuillez réessayer.");
      }
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-background rounded-2xl shadow-xl border border-border p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-brand-600 text-primary-foreground p-3 rounded-xl">
            <ShieldCheck size={32} />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-3">Confirmation de paiement</h1>
        <p className="text-muted-foreground mb-8">
          Vous êtes sur le point de passer au paiement. Souhaitez-vous continuer ?
        </p>

        <div className="flex items-end gap-4 justify-center mb-8">
          <span className="text-4xl font-extrabold text-foreground">2.500 <span className="text-lg font-bold text-muted-foreground">FCFA</span></span>
        </div>

        {error && (
          <div className="bg-destructive/10 text-destructive text-sm rounded-lg p-3 mb-4">
            {error}
          </div>
        )}

        <button
          onClick={handleContinue}
          disabled={loading}
          className="w-full bg-brand-600 text-primary-foreground text-lg font-bold py-4 rounded-xl hover:bg-brand-700 hover:shadow-lg hover:shadow-brand-500/25 transition-all transform hover:-translate-y-1 flex justify-center items-center disabled:opacity-50 disabled:hover:transform-none"
        >
          {loading ? <Loader2 className="animate-spin mr-2" size={20} /> : null}
          {loading ? 'Redirection...' : 'CONTINUER'}
        </button>
      </div>
    </div>
  );
};

export default Confirm;
