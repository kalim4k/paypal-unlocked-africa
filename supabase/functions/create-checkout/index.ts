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
    const { name, phone } = await req.json().catch(() => ({}));

    const rawUrl = Deno.env.get('MONEYFUSION_API_URL');
    if (!rawUrl) {
      throw new Error('MONEYFUSION_API_URL not configured');
    }
    // Fix SSL: cert only covers pay.moneyfusion.net, not www.pay.moneyfusion.net
    const MONEYFUSION_API_URL = rawUrl.replace('://www.pay.moneyfusion.net', '://pay.moneyfusion.net');

    const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || '';
    const projectId = SUPABASE_URL.replace('https://', '').split('.')[0];
    const return_url = `https://${projectId}.supabase.co/functions/v1/payment-callback`;
    const customerPhone = String(phone || '').trim() || '01010101';
    const customerName = String(name || '').trim() || 'Client PayPal';

    const response = await fetch(MONEYFUSION_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        totalPrice: 1000,
        article: [{ Abonnement: 1000 }],
        personal_Info: [{ orderId: 'paypal-ebook' }],
        numeroSend: customerPhone,
        nomclient: customerName,
        return_url,
      }),
    });

    const raw = await response.text();
    let data: any = {};
    try { data = JSON.parse(raw); } catch { /* not JSON */ }

    if (!response.ok || !data?.statut || !data?.url) {
      return new Response(JSON.stringify({ error: data?.message || raw.slice(0, 200) || 'Payment initiation failed' }), {
        status: response.ok ? 502 : response.status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ redirectUrl: data.url, token: data.token }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
