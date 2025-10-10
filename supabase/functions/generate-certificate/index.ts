import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userId, type, eventId, cpdId } = await req.json();

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Fetch user and membership data
    const { data: profile } = await supabaseClient
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    const { data: membership } = await supabaseClient
      .from('memberships')
      .select('*')
      .eq('user_id', userId)
      .single();

    let certificateData: any = {
      memberName: `${profile?.first_name} ${profile?.last_name}`,
      memberId: membership?.member_id,
      category: membership?.category,
      issueDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    };

    // Fetch additional data based on certificate type
    if (type === 'event' && eventId) {
      const { data: event } = await supabaseClient
        .from('events')
        .select('*')
        .eq('id', eventId)
        .single();

      certificateData = {
        ...certificateData,
        eventTitle: event?.title,
        eventDate: new Date(event?.event_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        eventVenue: event?.venue,
      };
    }

    if (type === 'cpd' && cpdId) {
      const { data: cpd } = await supabaseClient
        .from('cpd_records')
        .select('*')
        .eq('id', cpdId)
        .single();

      certificateData = {
        ...certificateData,
        cpdTitle: cpd?.title,
        cpdHours: cpd?.hours,
        cpdCategory: cpd?.category,
        cpdDate: new Date(cpd?.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      };
    }

    // Generate certificate HTML
    const certificateHTML = generateCertificateHTML(type, certificateData);

    return new Response(
      JSON.stringify({ 
        success: true,
        certificate: certificateHTML,
        data: certificateData
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error generating certificate:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});

function generateCertificateHTML(type: string, data: any): string {
  const baseStyles = `
    <style>
      @page { size: A4 landscape; margin: 0; }
      body { 
        font-family: 'Georgia', serif; 
        margin: 0; 
        padding: 40px;
        background: linear-gradient(135deg, #1a5f4a 0%, #2d8c6b 100%);
      }
      .certificate {
        background: white;
        border: 20px solid #d4af37;
        padding: 60px;
        text-align: center;
        box-shadow: 0 0 40px rgba(0,0,0,0.3);
        min-height: 500px;
      }
      .logo { font-size: 32px; color: #1a5f4a; font-weight: bold; margin-bottom: 20px; }
      .title { font-size: 48px; color: #1a5f4a; margin: 30px 0; font-weight: bold; }
      .subtitle { font-size: 24px; color: #666; margin: 20px 0; }
      .name { font-size: 36px; color: #000; font-weight: bold; margin: 30px 0; border-bottom: 2px solid #1a5f4a; display: inline-block; padding: 10px 40px; }
      .details { font-size: 18px; color: #333; margin: 15px 0; line-height: 1.8; }
      .footer { margin-top: 60px; font-size: 14px; color: #666; }
      .signature { display: inline-block; margin-top: 40px; border-top: 2px solid #000; padding-top: 10px; font-size: 16px; }
    </style>
  `;

  if (type === 'event') {
    return `
      ${baseStyles}
      <div class="certificate">
        <div class="logo">CIPM FCT ABUJA BRANCH</div>
        <div class="title">CERTIFICATE OF ATTENDANCE</div>
        <div class="subtitle">This is to certify that</div>
        <div class="name">${data.memberName}</div>
        <div class="subtitle">Member ID: ${data.memberId}</div>
        <div class="details">
          Successfully attended<br/>
          <strong>${data.eventTitle}</strong><br/>
          held on ${data.eventDate}<br/>
          at ${data.eventVenue}
        </div>
        <div class="footer">
          <div class="signature">
            ___________________________<br/>
            Branch Chairman
          </div>
          <br/><br/>
          Date of Issue: ${data.issueDate}
        </div>
      </div>
    `;
  }

  if (type === 'cpd') {
    return `
      ${baseStyles}
      <div class="certificate">
        <div class="logo">CIPM FCT ABUJA BRANCH</div>
        <div class="title">CPD CERTIFICATE</div>
        <div class="subtitle">This is to certify that</div>
        <div class="name">${data.memberName}</div>
        <div class="subtitle">Member ID: ${data.memberId}</div>
        <div class="details">
          Successfully completed<br/>
          <strong>${data.cpdTitle}</strong><br/>
          Category: ${data.cpdCategory}<br/>
          CPD Hours Earned: <strong>${data.cpdHours}</strong><br/>
          Completed on ${data.cpdDate}
        </div>
        <div class="footer">
          <div class="signature">
            ___________________________<br/>
            Branch Chairman
          </div>
          <br/><br/>
          Date of Issue: ${data.issueDate}
        </div>
      </div>
    `;
  }

  // Membership certificate
  return `
    ${baseStyles}
    <div class="certificate">
      <div class="logo">CIPM FCT ABUJA BRANCH</div>
      <div class="title">CERTIFICATE OF MEMBERSHIP</div>
      <div class="subtitle">This is to certify that</div>
      <div class="name">${data.memberName}</div>
      <div class="details">
        Is a registered member of the<br/>
        <strong>Chartered Institute of Personnel Management (CIPM)</strong><br/>
        FCT Abuja Branch<br/><br/>
        Member ID: <strong>${data.memberId}</strong><br/>
        Category: <strong>${data.category?.toUpperCase()}</strong>
      </div>
      <div class="footer">
        <div class="signature">
          ___________________________<br/>
          Branch Chairman
        </div>
        <br/><br/>
        Date of Issue: ${data.issueDate}
      </div>
    </div>
  `;
}