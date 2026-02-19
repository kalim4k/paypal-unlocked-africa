import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  const url = new URL(req.url);
  const token = url.searchParams.get('token');

  const frontendBase = 'https://paypal-unlocked-africa.lovable.app';

  if (!token) {
    return new Response(null, {
      status: 302,
      headers: { 'Location': `${frontendBase}/congrats` },
    });
  }

  try {
    const statusRes = await fetch(`https://www.pay.moneyfusion.net/paiementNotif/${token}`);
    const statusData = await statusRes.json();

    if (statusData.statut && statusData.data?.statut === 'paid') {
      return new Response(null, {
        status: 302,
      headers: { 'Location': `${frontendBase}/congrats` },
      });
    }

    return new Response(null, {
      status: 302,
      headers: { 'Location': `${frontendBase}/confirm?error=payment_failed` },
    });
  } catch {
    return new Response(null, {
      status: 302,
      headers: { 'Location': `${frontendBase}/congrats` },
    });
  }
});
