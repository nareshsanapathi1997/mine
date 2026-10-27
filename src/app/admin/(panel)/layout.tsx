import { AdminShell } from "@/components/admin/shell";
import { requireAdmin } from "@/lib/admin/session";

export default async function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  const session = await requireAdmin();
  return <AdminShell username={session.username}>{children}</AdminShell>;
}
