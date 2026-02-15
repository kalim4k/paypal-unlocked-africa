import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  const url = new URL(req.url);
  const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || '';
  const projectId = SUPABASE_URL.replace('https://', '').split('.')[0];
  
  // Redirect to the success page on the frontend
  const frontendUrl = `https://paypal-unlocked-africa.lovable.app/success`;

  return new Response(null, {
    status: 302,
    headers: {
      'Location': frontendUrl,
    },
  });
});
