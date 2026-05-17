import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (_req) => {
  const frontendBase = 'https://paypal-unlocked-africa.lovable.app';
  return new Response(null, {
    status: 302,
    headers: { 'Location': `${frontendBase}/congrats` },
  });
});
