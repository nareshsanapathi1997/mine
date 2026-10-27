import { notFound } from "next/navigation";
import { ContentEditor } from "@/components/admin/content-editor";
import { getCms } from "@/lib/cms";
import { isContentKey } from "@/lib/admin/content-meta";
import { requireAdmin } from "@/lib/admin/session";

export default async function AdminContentSectionPage({ params }: { params: Promise<{ key: string }> }) {
  await requireAdmin();
  const { key } = await params;
  if (!isContentKey(key)) notFound();
  const cms = await getCms();
  return <ContentEditor cmsKey={key} initial={cms[key]} />;
}
