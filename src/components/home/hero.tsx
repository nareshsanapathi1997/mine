import Image from "next/image";
import Link from "next/link";
import { EyebrowMark, UiIcon } from "@/components/icons";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { heroChat, heroPoints } from "@/content/home-page";
import { siteConfig } from "@/content/site";

export function HomeHero() {
  return (
    <section className="hero-stage page-hero h-hero relative -mt-[3.75rem] overflow-hidden border-b border-line sm:-mt-[4rem]" aria-labelledby="hero-heading">
      <div className="hero-grid" aria-hidden="true" />
      <div className="page-hero-glow" aria-hidden="true" />
      <Container className="relative grid items-center gap-10 pt-[calc(3.75rem+2.25rem)] pb-12 sm:pt-[calc(4rem+3rem)] sm:pb-16 lg:grid-cols-12 lg:gap-12">
        <div className="page-hero-copy lg:col-span-6">
          <p className="eyebrow">
            <EyebrowMark />
            Software · WhatsApp · AI · Made in Hyderabad
          </p>
          <h1 id="hero-heading" className="text-display mt-4 text-balance text-ink">
            Software that does the <span className="text-gradient">follow-up work</span> for you.
          </h1>
          <p className="text-body mt-5 max-w-[46ch] text-muted">
            {siteConfig.name} builds websites, apps, WhatsApp automation and AI assistants for schools, coaching centres, hotels, factories, clinics and small businesses across India.
          </p>
          <div className="mt-7 flex flex-col gap-2.5 sm:flex-row">
            <Button asChild size="lg" arrow className="w-full sm:w-auto">
              <Link href="/contact">Talk to us</Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto">
              <Link href="#what-we-build">See what we build</Link>
            </Button>
          </div>
          <ul className="mt-7 grid gap-2 border-t border-line pt-5 text-sm text-ink sm:grid-cols-2">
            {heroPoints.map((point) => (
              <li key={point} className="flex items-center gap-2">
                <UiIcon name="check" className="size-4 text-accent-ink" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="h-hero-visual relative min-w-0 lg:col-span-6">
          <figure className="photo-frame aspect-[4/3] sm:aspect-[16/11]">
            <Image
              src="/images/industry-education.webp"
              alt="Students in uniform working at desks in an Indian classroom"
              fill
              preload
              sizes="(max-width: 1024px) 100vw, 48vw"
              className="object-cover"
            />
          </figure>
          <div className="h-chat dark-island" role="img" aria-label="Sample WhatsApp chat: a parent asks about Class 6 admission and gets an instant reply with the entrance test time.">
            <div className="h-chat-bar">
              <span className="h-chat-avatar" aria-hidden="true">
                <UiIcon name="graduation" className="size-3.5" />
              </span>
              <span>
                <span className="block text-xs font-semibold text-ink">School admissions</span>
                <span className="block text-[11px] text-muted">WhatsApp · replies instantly</span>
              </span>
              <span className="sample-tag ml-auto">Sample</span>
            </div>
            <ol className="h-chat-body" aria-hidden="true">
              {heroChat.map((line, index) => (
                <li key={index} className={line.from === "bot" ? "h-bubble h-bubble-bot" : "h-bubble h-bubble-user"} style={{ animationDelay: `${600 + index * 900}ms` }}>
                  {line.text}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}
