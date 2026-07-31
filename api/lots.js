import { json, supabaseGet } from './_supabase.js';
export default async function handler(req, res) {
  try {
    const q = String(req.query?.q || '').replace(/[(),]/g, '');
    const filter = q ? `&lot_number=ilike.*${encodeURIComponent(q)}*` : '';
    const rows = await supabaseGet(`process_defect_data?select=*&order=production_date.desc${filter}`);
    json(res, rows);
  } catch (error) { json(res, { error: error.message }, 500); }
}

