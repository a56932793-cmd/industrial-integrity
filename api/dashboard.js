import { json, supabaseGet } from './_supabase.js';
export default async function handler(_req, res) {
  try {
    const rows = await supabaseGet('process_defect_data?select=production_date,defect_quantity,total_quantity,defect_rate_percent&order=production_date.asc');
    const summary = rows.reduce((acc, row) => ({
      lots: acc.lots + 1,
      inspected: acc.inspected + Number(row.total_quantity || 0),
      defects: acc.defects + Number(row.defect_quantity || 0)
    }), { lots: 0, inspected: 0, defects: 0 });
    summary.defect_rate = summary.inspected ? Number((summary.defects * 100 / summary.inspected).toFixed(2)) : 0;
    json(res, { summary, daily: rows.map(row => ({ date: row.production_date, defects: row.defect_quantity, defect_rate: row.defect_rate_percent })) });
  } catch (error) { json(res, { error: error.message }, 500); }
}

