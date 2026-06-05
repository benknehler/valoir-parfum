import { createClient } from 'jsr:@supabase/supabase-js@2';

export function getAdminClient() {
  const url = Deno.env.get('SUPABASE_URL') ?? Deno.env.get('NEXT_PUBLIC_SUPABASE_URL');
  const key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

  if (!url || !key) {
    throw new Error('Supabase service environment is missing.');
  }

  return createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export async function requireAdmin(req: Request) {
  const authorization = req.headers.get('Authorization') ?? '';
  const token = authorization.replace('Bearer ', '').trim();

  if (!token) throw new Response('Unauthorized', { status: 401 });

  const supabase = getAdminClient();
  const { data: userData, error: userError } = await supabase.auth.getUser(token);
  if (userError || !userData.user) throw new Response('Unauthorized', { status: 401 });

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('user_id', userData.user.id)
    .maybeSingle();

  if (profileError || profile?.role !== 'admin') throw new Response('Forbidden', { status: 403 });

  return { supabase, user: userData.user };
}

export async function logIntegration(
  supabase: ReturnType<typeof getAdminClient>,
  input: {
    provider: string;
    action: string;
    status: 'success' | 'error' | 'warning' | 'info';
    related_order_id?: string | null;
    request_id?: string | null;
    error_message?: string | null;
  }
) {
  await supabase.from('integration_logs').insert({
    provider: input.provider,
    action: input.action,
    status: input.status,
    related_order_id: input.related_order_id ?? null,
    request_id: input.request_id ?? crypto.randomUUID(),
    error_message: input.error_message ?? null,
  });
}

export async function auditLog(
  supabase: ReturnType<typeof getAdminClient>,
  input: {
    admin_user_id: string;
    action: string;
    entity_type: string;
    entity_id?: string | null;
    details?: Record<string, unknown>;
  }
) {
  await supabase.from('audit_logs').insert({
    admin_user_id: input.admin_user_id,
    action: input.action,
    entity_type: input.entity_type,
    entity_id: input.entity_id ?? null,
    details: input.details ?? {},
  });
}

export function sanitizeError(error: unknown) {
  if (error instanceof Response) return error;
  if (error instanceof Error) return error.message;
  return 'Unknown integration error';
}
