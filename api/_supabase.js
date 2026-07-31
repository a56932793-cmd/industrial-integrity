const SUPABASE_URL = process.env.SUPABASE_URL || 'https://btirshaatxucfivvxgnp.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_qayka7N4gsJnawGfDu8n2g_2r6eDuWi';

export async function supabaseGet(path) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` }
  });
  if (!response.ok) throw new Error(`Supabase request failed: ${response.status}`);
  return response.json();
}

export function json(res, body, status = 200) {
  res.status(status).setHeader('Content-Type', 'application/json; charset=utf-8').send(body);
}

