import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { getAdminClient, logIntegration, sanitizeError } from '../_shared/supabaseAdmin.ts';
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
    const supabase = getAdminClient();
    const body = await req.json().catch(() => ({}));
    const email = String(body.email || '').trim().toLowerCase();

    if (!email || !email.includes('@')) return jsonResponse({ ok: false, error: 'Valid email is required.' }, 400);

    const listId = Number(Deno.env.get('BREVO_LIST_ID'));
    const templateId = Number(Deno.env.get('BREVO_DOUBLE_OPT_IN_TEMPLATE_ID'));
    if (!Deno.env.get('BREVO_API_KEY') || !listId || !templateId) {
      return jsonResponse({ ok: false, error: 'Brevo ist serverseitig nicht vollständig konfiguriert.' }, 500);
    }

    const token = crypto.randomUUID();
    const { data: subscriber, error } = await supabase
      .from('newsletter_subscribers')
      .upsert(
        {
          email,
          status: 'pending',
          double_opt_in_token: token,
          unsubscribed_at: null,
        },
        { onConflict: 'email' }
      )
      .select()
      .single();

    if (error) throw error;

    await brevoFetch('/contacts/doubleOptinConfirmation', {
      method: 'POST',
      body: JSON.stringify({
        email,
        includeListIds: [listId],
        templateId,
        redirectionUrl: body.redirection_url || 'https://benknehler.github.io/valoir-parfum/neu/',
        attributes: {
          VALOIR_SOURCE: body.source || 'website',
        },
      }),
    });

    await logIntegration(supabase, { provider: 'brevo', action: 'subscribe_newsletter', status: 'success' });
    return jsonResponse({ ok: true, subscriber_id: subscriber.id });
  } catch (error) {
    return jsonResponse({ ok: false, error: sanitizeError(error) }, 500);
  }
});
