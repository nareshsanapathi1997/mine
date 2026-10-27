import { BrandForm } from "@/app/admin/(panel)/brand/brand-form";
import { getCms } from "@/lib/cms";
import { requireAdmin } from "@/lib/admin/session";

export default async function AdminBrandPage() {
  await requireAdmin();
  const { site } = await getCms();
  return (
    <div className="mx-auto max-w-3xl">
      <p className="eyebrow">Brand</p>
      <h1 className="text-h2 mt-2 text-ink">Logos, company details and social links</h1>
      <p className="mt-2 text-sm text-muted">These appear in the header, footer, contact page and search listings.</p>
      <div className="mt-8">
        <BrandForm initial={site} />
      </div>
    </div>
  );
}
