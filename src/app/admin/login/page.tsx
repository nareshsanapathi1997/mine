import Link from "next/link";
import { redirect } from "next/navigation";
import { LoginForm } from "@/app/admin/login/login-form";
import { Logo } from "@/components/brand/logo";
import { getAdminSession } from "@/lib/admin/session";
import { getSite } from "@/lib/cms";

export default async function AdminLoginPage() {
  if (await getAdminSession()) redirect("/admin");
  const site = await getSite();

  return (
    <div className="relative isolate grid min-h-full place-items-center px-5 py-12">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="admin-login-glow absolute left-1/2 top-[-8rem] h-[28rem] w-[42rem] max-w-[140vw] -translate-x-1/2 opacity-60" />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(249,245,242,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(249,245,242,0.12) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>
      <div className="relative w-full max-w-[26rem] rounded-2xl border border-line bg-surface p-7 sm:p-8">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-12 w-[11.5rem] items-center justify-center">
            <Logo name={site.name} brand={site.brand} />
          </div>
          <p className="eyebrow mt-5 w-full justify-center">Admin</p>
          <h1 className="text-h3 mt-2 text-ink">Sign in</h1>
          <p className="mt-2 text-sm text-muted">Use your staff username and password.</p>
        </div>
        <div className="mt-7">
          <LoginForm />
        </div>
        <p className="mt-6 border-t border-line pt-5 text-center text-sm">
          <Link href="/" className="text-accent-ink hover:underline">
            Back to website
          </Link>
        </p>
      </div>
    </div>
  );
}
