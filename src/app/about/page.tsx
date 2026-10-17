import Link from "next/link";
import { UiIcon } from "@/components/icons";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/sections/cta-band";
import { SectionPhotoFrame } from "@/components/ui/section-photo";
import { newImages } from "@/content/new-images";
import { listDetails } from "@/content/details";
import { siteConfig } from "@/content/site";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "About",
  description: `${siteConfig.name} is a Hyderabad-based team building websites, software, WhatsApp automation and AI assistants for Indian schools, hotels, factories and small businesses.`,
  path: "/about",
});

const beliefs = [
  { title: "Start with the problem, not the technology", body: "We first ask what your team does by hand every day. Only then do we suggest a website, an app, an assistant or nothing at all." },
  { title: "Small first version, then improve", body: "We build the one part that saves the most time, let your team use it, and add more based on what they tell us." },
  { title: "Plain language, no jargon", body: "You will always know what we are building, why, and what it will cost, in words your whole team understands." },
  { title: "People stay in charge", body: "Software and AI handle routine steps. Decisions about money, refunds, admissions or health stay with your staff." },
];

const promises = [
  "The founders are on your project from the first call to after launch.",
  "You see working screens early, not only at the end.",
  "We explain costs before work starts.",
  "We stay on for support and the next improvement.",
];

export default function AboutPage() {
  const sectors = listDetails("industry").filter((page) => !page.parent);
  /** Set to true to show the team section again. */
  const showTeamSection = false;
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="A small Hyderabad team that builds practical software."
        description={`${siteConfig.name} builds websites, apps, business software, WhatsApp automation and AI assistants for schools, hotels, factories, clinics and growing businesses across India.`}
        photo={newImages.about}
      />

      <section className="section h-section" aria-labelledby="story-heading">
        <Container className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <p className="eyebrow">Our story</p>
            <h2 id="story-heading" className="text-h2 mt-3 text-ink">Why we started</h2>
            <div className="text-body cluster space-y-4 text-muted">
              <p>
                Most businesses we meet already have tools: a website, a WhatsApp number, a few Excel sheets, maybe accounting software. The trouble is the work in between. Someone copies an enquiry into a sheet, someone else sends a reminder by hand, and the owner calls around to know the day&apos;s position.
              </p>
              <p>
                We build software that does those in-between steps for you, so your team spends less time typing and chasing, and more time with students, guests and customers.
              </p>
              <p className="text-sm">
                The name KYNTRIQ comes from {siteConfig.nameMeaning}.
              </p>
            </div>
          </div>
          <div className="lg:col-span-5">
            <SectionPhotoFrame photo={newImages.aboutStory} />
          </div>
        </Container>
      </section>

      <section className="section h-section h-band-soft" aria-labelledby="beliefs-heading">
        <Container>
          <div className="home-head">
            <div>
              <p className="eyebrow">How we think</p>
              <h2 id="beliefs-heading" className="text-h2 mt-3 text-ink">Four things we believe</h2>
            </div>
            <p className="text-body text-muted">These shape every project, big or small.</p>
          </div>
          <ul className="stack grid gap-3 sm:grid-cols-2" data-reveal-stagger>
            {beliefs.map((item, index) => (
              <li key={item.title} className="card h-problem" data-reveal-child>
                <span className="h-step-num" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 text-lg font-semibold tracking-tight text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {showTeamSection ? (
      <section className="section h-section" aria-labelledby="team-heading">
        <Container className="grid gap-8 lg:grid-cols-12 lg:gap-12 lg:items-start">
          <div className="lg:col-span-5">
            <p className="eyebrow">The team</p>
            <h2 id="team-heading" className="text-h2 mt-3 text-ink">Who you will work with</h2>
            <div className="mt-5">
              <SectionPhotoFrame photo={newImages.aboutTeam} sizes="(max-width: 1024px) 100vw, 420px" />
            </div>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {[
                { name: "Naresh Sanapathi", role: "Founder" },
                { name: "Nageswara Rao", role: "Co-founder" },
              ].map((person) => (
                <li key={person.name} className="card flex items-center gap-3 p-4">
                  <span className="icon-chip icon-chip-sm"><UiIcon name="user" /></span>
                  <span>
                    <span className="block font-semibold text-ink">{person.name}</span>
                    <span className="block text-sm text-accent-ink">{person.role}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-7">
            <h3 className="text-h3 text-ink">What you can expect</h3>
            <ul className="mt-4 space-y-3" data-reveal-stagger>
              {promises.map((item) => (
                <li key={item} className="flex items-start gap-3 text-body text-ink" data-reveal-child>
                  <UiIcon name="check" className="mt-1 size-4 shrink-0 text-accent-ink" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-body mt-6 text-muted">
              Want to speak to us directly? Call <a className="text-link" href={siteConfig.phoneHref}>{siteConfig.phoneDisplay}</a> or email{" "}
              <a className="text-link break-all" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
            </p>
          </div>
        </Container>
      </section>
      ) : null}

      <section className="section-tight h-section border-t border-line" aria-labelledby="sectors-heading">
        <Container>
          <h2 id="sectors-heading" className="text-h3 text-ink">Who we work with</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {sectors.map((page) => (
              <li key={page.slug}>
                <Link href={`/industries/${page.slug}` as "/"} className="chip chip-link">{page.name}</Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand title="Tell us how your team works today." description="A short call with no obligation. We will tell you honestly whether we can help." primaryLabel="Talk to us" showWhatsapp />
    </>
  );
}
