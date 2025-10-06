import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, email, amount, reference, metadata } = await req.json();
    const paystackSecretKey = Deno.env.get('PAYSTACK_SECRET_KEY');

    if (!paystackSecretKey) {
      throw new Error('Paystack secret key not configured');
    }

    console.log('Paystack payment action:', action);

    if (action === 'initialize') {
      // Initialize payment
      const response = await fetch('https://api.paystack.co/transaction/initialize', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${paystackSecretKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          amount: amount * 100, // Paystack expects amount in kobo (smallest currency unit)
          reference,
          metadata,
          callback_url: `${req.headers.get('origin')}/member/payments`,
        }),
      });

      const data = await response.json();
      console.log('Paystack initialize response:', data);

      if (!data.status) {
        throw new Error(data.message || 'Failed to initialize payment');
      }

      return new Response(
        JSON.stringify({ 
          authorizationUrl: data.data.authorization_url,
          reference: data.data.reference,
          accessCode: data.data.access_code
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (action === 'verify') {
      // Verify payment
      const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${paystackSecretKey}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      console.log('Paystack verify response:', data);

      if (!data.status) {
        throw new Error(data.message || 'Failed to verify payment');
      }

      return new Response(
        JSON.stringify({ 
          status: data.data.status,
          amount: data.data.amount / 100, // Convert back from kobo
          reference: data.data.reference,
          metadata: data.data.metadata,
          paid_at: data.data.paid_at
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    throw new Error('Invalid action specified');

  } catch (error) {
    console.error('Error in paystack-payment function:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
