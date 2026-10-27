import { AccountForm } from "@/app/admin/(panel)/account/account-form";
import { requireAdmin } from "@/lib/admin/session";

export default async function AdminAccountPage() {
  const session = await requireAdmin();
  return (
    <div className="mx-auto max-w-3xl">
      <p className="eyebrow">Account</p>
      <h1 className="text-h2 mt-2 text-ink">Admin login</h1>
      <p className="mt-2 text-sm text-muted">Signed in as {session?.username}.</p>
      <div className="mt-8">
        <AccountForm />
      </div>
    </div>
  );
}
