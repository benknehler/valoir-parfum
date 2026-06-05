import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { auditLog, logIntegration, requireAdmin, sanitizeError } from '../_shared/supabaseAdmin.ts';
import { jsonResponse, optionsResponse } from '../_shared/cors.ts';

async function brevoFetch(path: string, init: RequestInit = {}) {
  const apiKey = Deno.env.get('BREVO_API_KEY');
  if (!apiKey) throw new Error('BREVO_API_KEY is missing.');

  const response = await fetch(`https://api.brevo.com/v3${path}`, {
    ...init,
    headers: {
      'api-key': apiKey,
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(init.headers ?? {}),
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Brevo request failed with ${response.status}: ${text.slice(0, 500)}`);
  }

  return response.status === 204 ? null : response.json();
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return optionsResponse();

  try {
    const { supabase, user } = await requireAdmin(req);
    const body = await req.json().catch(() => ({}));
    if (body.action === 'test_connection') {
      await brevoFetch('/account');
      await logIntegration(supabase, { provider: 'brevo', action: 'test_connection', status: 'success' });
      return jsonResponse({ ok: true, message: 'Brevo-Verbindung erfolgreich.' });
    }

    const campaignId = body.campaign_id;
    const mode = body.mode || 'draft';

    let campaign = null;
    if (campaignId && campaignId !== 'draft') {
      const { data, error } = await supabase.from('newsletter_campaigns').select('*').eq('id', campaignId).single();
      if (error) throw error;
      campaign = data;
    } else {
      if (!body.subject || !body.html_content) {
        return jsonResponse({ ok: false, error: 'Betreff und HTML-Inhalt sind erforderlich.' }, 400);
      }
      campaign = {
        title: body.title || body.subject,
        subject: body.subject,
        preview_text: body.preview_text || '',
        html_content: body.html_content,
      };
    }

    const listId = Number(Deno.env.get('BREVO_LIST_ID'));
    const senderEmail = Deno.env.get('BREVO_SENDER_EMAIL');
    const senderName = Deno.env.get('BREVO_SENDER_NAME') || 'Valoir Parfum';
    if (!listId || !senderEmail) throw new Error('BREVO_LIST_ID or BREVO_SENDER_EMAIL is missing.');

    const created = await brevoFetch('/emailCampaigns', {
      method: 'POST',
      body: JSON.stringify({
        name: campaign.title,
        subject: campaign.subject,
        previewText: campaign.preview_text,
        htmlContent: campaign.html_content,
        sender: { name: senderName, email: senderEmail },
        recipients: { listIds: [listId] },
      }),
    });

    if (mode === 'test') {
      await brevoFetch(`/emailCampaigns/${created.id}/sendTest`, {
        method: 'POST',
        body: JSON.stringify({ emailTo: [senderEmail] }),
      });
    } else if (mode === 'send') {
      await brevoFetch(`/emailCampaigns/${created.id}/sendNow`, { method: 'POST' });
    } else if (body.scheduled_at) {
      await brevoFetch(`/emailCampaigns/${created.id}/schedule`, {
        method: 'POST',
        body: JSON.stringify({ scheduledAt: body.scheduled_at }),
      });
    }

    await logIntegration(supabase, { provider: 'brevo', action: `campaign_${mode}`, status: 'success' });
    await auditLog(supabase, {
      admin_user_id: user.id,
      action: mode === 'send' ? 'Admin sendet Newsletter' : 'Admin plant Newsletter',
      entity_type: 'newsletter_campaign',
      entity_id: campaignId && campaignId !== 'draft' ? campaignId : null,
      details: { brevo_campaign_id: created.id, mode },
    });

    return jsonResponse({ ok: true, brevo_campaign_id: created.id });
  } catch (error) {
    if (error instanceof Response) return error;
    return jsonResponse({ ok: false, error: sanitizeError(error) }, 500);
  }
});
