import Link from "next/link";
import { CONTENT_SECTIONS } from "@/lib/admin/content-meta";
import { requireAdmin } from "@/lib/admin/session";

export default async function AdminContentPage() {
  await requireAdmin();
  return (
    <div className="mx-auto max-w-5xl">
      <p className="eyebrow">Content</p>
      <h1 className="text-h2 mt-2 text-ink">Every page and section</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        Open a page, upload photos, edit the copy, and add new cards or inner pages. Logos and social links are under Brand.
      </p>
      <ul className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {CONTENT_SECTIONS.map((item) => (
          <li key={item.key}>
            <Link href={`/admin/content/${item.key}`} className="card d-link block h-full p-5">
              <span className="block font-semibold text-ink">{item.title}</span>
              <span className="mt-2 block text-sm text-muted">{item.body}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
