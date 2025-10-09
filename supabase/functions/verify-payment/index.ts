import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { reference } = await req.json();
    
    console.log("Verifying payment with reference:", reference);

    // Verify payment with Paystack
    const paystackResponse = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${Deno.env.get("PAYSTACK_SECRET_KEY")}`,
        },
      }
    );

    const paystackData = await paystackResponse.json();
    console.log("Paystack verification response:", paystackData);

    if (paystackData.status && paystackData.data.status === "success") {
      const { customer, amount, metadata } = paystackData.data;

      // Update payment record
      const { error: paymentError } = await supabase
        .from("payments")
        .update({
          status: "completed",
          payment_method: "paystack",
        })
        .eq("reference", reference);

      if (paymentError) {
        console.error("Error updating payment:", paymentError);
        throw paymentError;
      }

      // If it's a membership payment, update membership status
      if (metadata.payment_type === "membership") {
        const { data: profile } = await supabase
          .from("profiles")
          .select("id")
          .eq("email", customer.email)
          .single();

        if (profile) {
          const { error: membershipError } = await supabase
            .from("memberships")
            .update({
              status: "active",
              expiry_date: new Date(
                new Date().setFullYear(new Date().getFullYear() + 1)
              ).toISOString(),
            })
            .eq("user_id", profile.id);

          if (membershipError) {
            console.error("Error updating membership:", membershipError);
          }
        }
      }

      // Send confirmation email
      await fetch(`${Deno.env.get("SUPABASE_URL")}/functions/v1/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Deno.env.get("SUPABASE_ANON_KEY")}`,
        },
        body: JSON.stringify({
          to: customer.email,
          subject: "Payment Confirmation",
          type: "payment_confirmation",
          data: {
            amount: amount / 100,
            reference,
            description: metadata.description,
          },
        }),
      });

      return new Response(
        JSON.stringify({ success: true, message: "Payment verified" }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    } else {
      return new Response(
        JSON.stringify({ success: false, message: "Payment verification failed" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
