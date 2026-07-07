import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  const frontendBase = 'https://paypal-unlocked-africa.lovable.app';

  // Try to extract a stable transaction id from Maketou's callback query.
  // Fallback: generate a UUID so we still have ONE stable event_id per redirect.
  const url = new URL(req.url);
  const q = url.searchParams;
  const txId =
    q.get('transactionId') ||
    q.get('transaction_id') ||
    q.get('reference') ||
    q.get('ref') ||
    q.get('orderId') ||
    q.get('order_id') ||
    q.get('id') ||
    crypto.randomUUID();

  // Namespace to a UUID-like event_id (stable per transaction).
  const eid = `pu_${txId}`;

  return new Response(null, {
    status: 302,
    headers: { 'Location': `${frontendBase}/congrats?eid=${encodeURIComponent(eid)}` },
  });
});
