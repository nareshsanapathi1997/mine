import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/shell";
import { getAdminSession } from "@/lib/admin/session";

export default async function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  return <AdminShell username={session.username}>{children}</AdminShell>;
}
