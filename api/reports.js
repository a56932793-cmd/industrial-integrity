import { json, supabaseGet } from './_supabase.js';
export default async function handler(_req, res) {
  try { json(res, await supabaseGet('analysis_reports?select=*&order=created_at.desc')); }
  catch (error) { json(res, { error: error.message }, 500); }
}

