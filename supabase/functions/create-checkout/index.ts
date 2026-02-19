import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, phone } = await req.json();

    const MONEYFUSION_API_URL = Deno.env.get('MONEYFUSION_API_URL');
    if (!MONEYFUSION_API_URL) {
      throw new Error('MONEYFUSION_API_URL not configured');
    }

    const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || '';
    const projectId = SUPABASE_URL.replace('https://', '').split('.')[0];
    const return_url = `https://${projectId}.supabase.co/functions/v1/payment-callback`;

    const response = await fetch(MONEYFUSION_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        totalPrice: 2500,
        article: [{ "Abonnement": 2500 }],
        personal_Info: [{ orderId: "paypal-ebook" }],
        numeroSend: phone,
        nomclient: name,
        return_url,
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.statut) {
      return new Response(JSON.stringify({ error: data.message || 'Payment initiation failed' }), {
        status: response.status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ redirectUrl: data.url, token: data.token }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
