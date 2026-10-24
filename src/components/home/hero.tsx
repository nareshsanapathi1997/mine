import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Photo } from "@/components/ui/photo";
import type { HomeHeroContent } from "@/lib/cms/types";

export function HomeHero({ content, positioning }: { content: HomeHeroContent; positioning: string }) {
  return (
    <section className="xh band-dark relative isolate overflow-hidden lg:-mt-[5rem]" aria-labelledby="hero-heading">
      <div className="xh-glow" aria-hidden="true" />
      <div className="xh-media" aria-hidden="true">
        <Photo
          src={content.photo.src}
          alt=""
          fill
          priority
          sizes="(max-width: 1023px) 100vw, 58vw"
          className="xh-img"
        />
        <span className="xh-media-edge" />
      </div>
      <div className="xh-shade" aria-hidden="true" />

      <div className="xh-inner mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <div className="xh-copy">
          <div className="xh-mark-row xh-r" style={{ ["--d" as string]: "0ms" }}>
            <Image
              src={content.markSrc}
              alt=""
              width={512}
              height={512}
              priority
              className="xh-mark"
            />
            <p className="xh-position">{positioning}</p>
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
        </div>
      </div>
    </section>
  );
}
