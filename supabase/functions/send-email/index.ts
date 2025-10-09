import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  to: string;
  subject: string;
  type: string;
  data?: any;
}

const generateEmailHTML = (type: string, data: any) => {
  switch (type) {
    case "payment_confirmation":
      return `
        <h1>Payment Confirmation</h1>
        <p>Your payment has been successfully processed.</p>
        <p><strong>Amount:</strong> ₦${data.amount?.toLocaleString()}</p>
        <p><strong>Reference:</strong> ${data.reference}</p>
        <p><strong>Description:</strong> ${data.description}</p>
        <p>Thank you for your payment!</p>
      `;
    case "application_submitted":
      return `
        <h1>Application Submitted</h1>
        <p>Dear ${data.name},</p>
        <p>Your membership application has been successfully submitted.</p>
        <p>We will review your application and get back to you shortly.</p>
        <p>Best regards,<br>CIPM Kogi State Branch</p>
      `;
    case "application_approved":
      return `
        <h1>Application Approved</h1>
        <p>Dear ${data.name},</p>
        <p>Congratulations! Your membership application has been approved.</p>
        <p><strong>Member ID:</strong> ${data.member_id}</p>
        <p>Welcome to CIPM Kogi State Branch!</p>
      `;
    case "event_registration":
      return `
        <h1>Event Registration Confirmation</h1>
        <p>You have successfully registered for:</p>
        <p><strong>${data.event_title}</strong></p>
        <p><strong>Date:</strong> ${data.event_date}</p>
        <p><strong>Venue:</strong> ${data.venue}</p>
        <p>We look forward to seeing you there!</p>
      `;
    default:
      return `<p>${data.message || "Thank you for contacting us."}</p>`;
  }
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, subject, type, data }: EmailRequest = await req.json();

    console.log("Email would be sent to:", { to, subject, type });
    
    // Note: Email sending requires RESEND_API_KEY to be configured
    // You can set this up at https://resend.com
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    
    if (!resendApiKey) {
      console.log("Email sending skipped - RESEND_API_KEY not configured");
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "Email notification skipped (RESEND_API_KEY not configured)",
          preview: generateEmailHTML(type, data)
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const html = generateEmailHTML(type, data);

    // Send email using Resend API
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "CIPM Kogi <onboarding@resend.dev>",
        to: [to],
        subject,
        html,
      }),
    });

    const responseData = await emailResponse.json();
    console.log("Email sent successfully:", responseData);

    return new Response(
      JSON.stringify({ success: true, data: responseData }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
