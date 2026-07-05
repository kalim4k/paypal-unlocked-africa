import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

async function sha256(input: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(input.trim().toLowerCase()));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  try {
    const PIXEL_ID = Deno.env.get('FB_PIXEL_ID');
    const ACCESS_TOKEN = Deno.env.get('FB_CAPI_ACCESS_TOKEN');
    if (!PIXEL_ID || !ACCESS_TOKEN) throw new Error('FB pixel not configured');

    const body = await req.json().catch(() => ({}));
    const {
      event_name = 'Purchase',
      event_id,
      event_source_url,
      value = 2500,
      currency = 'XOF',
      email,
      fbp,
      fbc,
    } = body ?? {};

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
    const ua = req.headers.get('user-agent') ?? undefined;

    const user_data: Record<string, unknown> = {};
    if (email) user_data.em = [await sha256(String(email))];
    if (ip) user_data.client_ip_address = ip;
    if (ua) user_data.client_user_agent = ua;
    if (fbp) user_data.fbp = fbp;
    if (fbc) user_data.fbc = fbc;

    const payload = {
      data: [{
        event_name,
        event_time: Math.floor(Date.now() / 1000),
        event_id,
        event_source_url,
        action_source: 'website',
        user_data,
        custom_data: { value, currency },
      }],
    };

    const res = await fetch(`https://graph.facebook.com/v20.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();

    return new Response(JSON.stringify(data), {
      status: res.ok ? 200 : res.status,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
