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
    const { email, firstName, lastName, phone, customerPrice } = await req.json();

    const MAKETOU_API_KEY = Deno.env.get('MAKETOU_API_KEY');
    if (!MAKETOU_API_KEY) {
      throw new Error('MAKETOU_API_KEY not configured');
    }

    const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || '';
    const projectId = SUPABASE_URL.replace('https://', '').split('.')[0];
    const redirectURL = `https://${projectId}.supabase.co/functions/v1/payment-callback`;

    const response = await fetch('https://api.maketou.net/api/v1/stores/cart/checkout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${MAKETOU_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productDocumentId: "b8d0b5e9-625f-43e8-a182-4f5de9ed258d",
        email,
        firstName,
        lastName,
        phone: phone || undefined,
        customerPrice: customerPrice || 2500,
        redirectURL,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return new Response(JSON.stringify({ error: data.message || 'Payment initiation failed' }), {
        status: response.status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ redirectUrl: data.redirectUrl, cartId: data.cart?.id }), {
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
