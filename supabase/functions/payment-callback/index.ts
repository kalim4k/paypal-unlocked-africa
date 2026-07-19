import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  const frontendBase = 'https://paypal-unlocked-africa.lovable.app';
  const url = new URL(req.url);
  const token = url.searchParams.get('token') || '';

  let paid = false;
  if (token) {
    try {
      const res = await fetch(`https://www.pay.moneyfusion.net/paiementNotif/${token}`);
      const json = await res.json();
      const statut = json?.data?.statut || json?.statut;
      paid = statut === 'paid';
    } catch { /* noop */ }
  }

  const eid = `pu_${token || crypto.randomUUID()}`;
  const target = paid
    ? `${frontendBase}/congrats?eid=${encodeURIComponent(eid)}`
    : `${frontendBase}/confirm?error=payment_failed`;

  return new Response(null, { status: 302, headers: { 'Location': target } });
});
