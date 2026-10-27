import Link from "next/link";
import { PromoReel } from "@/components/home/promo-reel";
import { Button } from "@/components/ui/button";
import { Photo } from "@/components/ui/photo";
import type { HomeHeroContent } from "@/lib/cms/types";

export function HomeHero({ content, siteName }: { content: HomeHeroContent; siteName: string }) {
  return (
    <section className="xh band-dark relative isolate overflow-hidden lg:-mt-[5rem]" aria-labelledby="hero-heading">
      <div className="xh-glow" aria-hidden="true" />
      <div className="xh-media" aria-hidden="true">
        <Photo
          src={content.photo.src}
          alt=""
          fill
          preload
          sizes="(max-width: 1023px) 100vw, 58vw"
          className="xh-img"
        />
        <span className="xh-media-edge" />
      </div>
      <div className="xh-shade" aria-hidden="true" />

      <div className="xh-inner xh-grid mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <div className="xh-copy">
          <div className="xh-mark-row xh-r" style={{ ["--d" as string]: "0ms" }}>
            <p className="xh-badge">
              <span className="xh-badge-dot" aria-hidden="true" />
              {siteName}
              <span className="xh-badge-sep" aria-hidden="true" />
              <span className="xh-badge-place">Visakhapatnam</span>
            </p>
          </div>
          <h1 id="hero-heading" className="xh-title xh-r" style={{ ["--d" as string]: "90ms" }}>
            <span className="xh-title-lead">
              {content.titleBefore}
              <span className="xh-grad">{content.titleHighlight}</span>
            </span>
            {content.titleAfter ? <span className="xh-title-rest">{content.titleAfter.trim()}</span> : null}
          </h1>
          <p className="xh-sub xh-r" style={{ ["--d" as string]: "180ms" }}>
            {content.subtitle}
          </p>
          {content.lede ? (
            <p className="xh-lede xh-r" style={{ ["--d" as string]: "220ms" }}>
              {content.lede}
            </p>
          ) : null}
          <div className="xh-ctas xh-r" style={{ ["--d" as string]: "270ms" }}>
            <Button asChild size="lg" arrow className="xh-primary w-full sm:w-auto">
              <Link href={content.primaryHref}>{content.primaryLabel}</Link>
            </Button>
            <Link href={content.secondaryHref} className="xh-ghost">
              {content.secondaryLabel}
            </Link>
          </div>
          <ul className="xh-trust xh-r" style={{ ["--d" as string]: "340ms" }}>
            {["Free first call", "Written plan with cost", "Support after launch"].map((item) => (
              <li key={item}>
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <PromoReel className="xh-reel xh-r" />
      </div>
    </section>
  );
}
