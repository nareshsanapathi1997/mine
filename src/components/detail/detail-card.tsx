import Image from "next/image";
import Link from "next/link";
import { IndustryArt, hasIndustryArt } from "@/components/art/industry-art";
import { UiIcon } from "@/components/icons";
import type { DetailPage } from "@/content/details";

export function DetailCard({ page, photo = false, children }: { page: DetailPage; photo?: boolean; children?: React.ReactNode }) {
  const href = `/${page.kind === "solution" ? "solutions" : "industries"}/${page.slug}`;
  return (
    <li className="card d-card flex h-full flex-col overflow-hidden p-0" data-reveal-child>
      {photo ? (
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image src={page.photo.src} alt={page.photo.alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="d-card-img object-cover" />
          {page.kind === "industry" && hasIndustryArt(page.slug) ? <span className="ia-badge ia-badge-sm"><IndustryArt slug={page.slug} /></span> : null}
        </div>
      ) : null}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <span className="flex items-center gap-2.5">
          <span className="icon-chip icon-chip-sm"><UiIcon name={page.icon} /></span>
          <h3 className="text-lg font-semibold tracking-tight text-ink">{page.name}</h3>
        </span>
        <p className="mt-3 text-sm leading-relaxed text-muted">{page.intro}</p>
        {children}
        <Link href={href as "/"} className="text-link mt-auto pt-5">
          See how it works <span className="text-link-arrow" aria-hidden="true"><UiIcon name="arrow" /></span>
          <span className="sr-only"> for {page.name}</span>
        </Link>
      </div>
    </li>
  );
}
