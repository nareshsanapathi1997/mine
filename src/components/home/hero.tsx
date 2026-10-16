import { Photo } from "@/components/ui/photo";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { newImages } from "@/content/new-images";
import { siteConfig } from "@/content/site";

/*
 * Home hero: copy on the left, photo on the right (stacked on mobile).
 * The photo keeps its natural framing so the subject is not cropped away.
 */
export function HomeHero() {
  return (
    <section className="xh band-dark relative isolate overflow-hidden lg:-mt-[4rem]" aria-labelledby="hero-heading">
      <div className="xh-media" aria-hidden="true">
        <Photo
          src={newImages.home.src}
          alt=""
          fill
          priority
          sizes="(max-width: 1023px) 100vw, 58vw"
          className="xh-img"
        />
      </div>
      <div className="xh-shade" aria-hidden="true" />

      <div className="xh-inner mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <div className="xh-copy">
          <p className="xh-brand xh-r" style={{ ["--d" as string]: "0ms" }}>
            {siteConfig.name}
          </p>
          <h1 id="hero-heading" className="xh-title xh-r" style={{ ["--d" as string]: "90ms" }}>
            Software that does the <span className="xh-grad">follow-up work</span> for you.
          </h1>
          <p className="xh-sub xh-r" style={{ ["--d" as string]: "180ms" }}>
            Websites, apps, WhatsApp automation and AI assistants for schools, hotels, factories, clinics and growing businesses.
          </p>
          <div className="xh-ctas xh-r" style={{ ["--d" as string]: "270ms" }}>
            <Button asChild size="lg" arrow className="w-full sm:w-auto">
              <Link href="/contact">Talk to us</Link>
            </Button>
            <Link href="#what-we-build" className="xh-ghost">
              See what we build
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
