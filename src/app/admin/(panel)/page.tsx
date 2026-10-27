import Link from "next/link";
import { getCms } from "@/lib/cms";
import { getPool } from "@/lib/db/pool";
import { requireAdmin } from "@/lib/admin/session";

export default async function AdminHomePage() {
  await requireAdmin();
  const { site } = await getCms();
  const pool = getPool();
  let enquiryCount = 0;
  if (pool) {
    try {
      const [rows] = await pool.query("select count(*) as n from enquiries");
      enquiryCount = Array.isArray(rows) ? Number((rows[0] as { n: number }).n) : 0;
    } catch (error) {
      console.error(
        "[admin] Could not count enquiries.",
        error instanceof Error ? error.message : "Unknown database error",
      );
    }
  }

  const cards = [
    { href: "/admin/brand", title: "Brand & social", body: "Logos, favicon, company name, phone, WhatsApp and social links." },
    { href: "/admin/content", title: "Page content", body: "Header, footer, home sections and every other page." },
    { href: "/admin/enquiries", title: "Enquiries", body: `${enquiryCount} stored ${enquiryCount === 1 ? "enquiry" : "enquiries"}.` },
    { href: "/admin/account", title: "Account", body: "Change the admin password." },
  ];

  return (
    <div className="mx-auto max-w-3xl">
      <p className="eyebrow">Overview</p>
      <h1 className="text-h2 mt-2 text-ink">{site.name}</h1>
      <p className="mt-2 text-sm text-muted">Changes here update the live website after you save.</p>
      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {cards.map((card) => (
          <li key={card.href}>
            <Link href={card.href} className="card d-link block h-full p-5">
              <span className="block font-semibold text-ink">{card.title}</span>
              <span className="mt-2 block text-sm text-muted">{card.body}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
