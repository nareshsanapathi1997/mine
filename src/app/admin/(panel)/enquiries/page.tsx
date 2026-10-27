import { getPool } from "@/lib/db/pool";
import { requireAdmin } from "@/lib/admin/session";

type Row = {
  id: string;
  name: string;
  company: string | null;
  email: string;
  phone: string | null;
  industry: string | null;
  need: string;
  budget_range: string | null;
  message: string;
  status: string;
  created_at: string | Date;
};

export default async function AdminEnquiriesPage() {
  await requireAdmin();
  const pool = getPool();
  let rows: Row[] = [];
  if (pool) {
    try {
      const [result] = await pool.query(
        `select id, name, company, email, phone, industry, need, budget_range, message, status, created_at
         from enquiries
         order by created_at desc
         limit 200`,
      );
      rows = Array.isArray(result) ? (result as Row[]) : [];
    } catch (error) {
      console.error(
        "[admin] Could not load enquiries.",
        error instanceof Error ? error.message : "Unknown database error",
      );
    }
  }

  return (
    <div className="mx-auto max-w-5xl">
      <p className="eyebrow">Inbox</p>
      <h1 className="text-h2 mt-2 text-ink">Enquiries</h1>
      <p className="mt-2 text-sm text-muted">{rows.length} shown, newest first.</p>
      {rows.length === 0 ? (
        <p className="mt-8 text-sm text-muted">No enquiries stored yet.</p>
      ) : (
        <ul className="mt-6 space-y-3">
          {rows.map((row) => (
            <li key={row.id} className="card p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="font-semibold text-ink">{row.name}</h2>
                <p className="text-xs text-muted">{String(row.created_at)}</p>
              </div>
              <p className="mt-1 text-sm text-muted">
                {row.company || "No company"} · {row.email}
                {row.phone ? ` · ${row.phone}` : ""}
              </p>
              <p className="mt-2 text-sm text-ink">
                {row.need}
                {row.industry ? ` · ${row.industry}` : ""}
                {row.budget_range ? ` · ${row.budget_range}` : ""}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{row.message}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
