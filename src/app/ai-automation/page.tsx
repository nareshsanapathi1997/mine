import Link from "next/link";
import { DetailCard } from "@/components/detail/detail-card";
import { HomeFaq } from "@/components/home/faq";
import { HomeSampleFlow } from "@/components/home/sample-flow";
import { UiIcon } from "@/components/icons";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { newImages } from "@/content/new-images";
import { getDetail } from "@/content/details";
import { createMetadata } from "@/lib/seo";
import { servicesJsonLd } from "@/lib/structured-data";

export const metadata = createMetadata({
  title: "AI & Automation",
  description: "AI assistants, phone assistants, WhatsApp messages and automation explained simply: what they can do, what they should not do, and a sample of how they work.",
  path: "/ai-automation",
});

const can = [
  "Answer common questions from your own fees, rates, timings or stock",
  "Collect a name, number and requirement, and save it",
  "Book an open slot, share a form or a payment link",
  "Send reminders and updates on time, every time",
  "Pass a chat or call to your staff with the full history",
];

const cannot = [
  "Make up prices, offers or answers you have not approved",
  "Give discounts, refunds or exceptions on its own",
  "Give medical, legal or financial advice",
  "Replace the people who make decisions in your business",
];

const sample = {
  id: "ai",
  label: "WhatsApp assistant",
  title: "A parent asks about bus timings",
  steps: [
    { title: "Message arrives", body: "\"What time does the bus reach Kukatpally?\" comes in at 7 AM on the school's WhatsApp." },
    { title: "Looks up the answer", body: "The assistant checks the bus route list the school has shared, not the internet." },
    { title: "Replies", body: "It sends the stop time and the driver's helpline number." },
    { title: "Not sure? Hands over", body: "If the parent asks something new, such as a route change, the transport desk gets the chat." },
  ],
};

const faqs = [
  { q: "Is AI safe to use with my customers?", a: "Yes, when it is set up to answer only from information you approve and to hand over anything else. We test it with your real questions before it goes live." },
  { q: "What is the difference between AI and automation?", a: "Automation follows fixed rules, such as sending a reminder on the 5th. AI understands a written or spoken question and picks the right answer or step." },
  { q: "Do I need a big budget to start?", a: "No. Most businesses start with one assistant or a few automatic reminders, and add more once they see it working." },
];

export default function AIAutomationPage() {
  const pages = ["ai-agents", "voice-ai", "whatsapp-automation", "business-automation"].flatMap((slug) => {
    const page = getDetail("solution", slug);
    return page ? [page] : [];
  });
  return (
    <>
      <JsonLd data={servicesJsonLd()} />
      <PageHeader
        eyebrow="AI & Automation"
        title="AI that does real work, with your team in charge."
        description="An AI assistant is useful when it finishes a job, like booking a slot or sending a reminder, and passes everything else to a person."
        photo={newImages["ai-agents"]}
      >
        <Button asChild size="lg" arrow className="w-full sm:w-auto">
          <Link href="/contact?need=AI%20assistant">Talk to us</Link>
        </Button>
      </PageHeader>

      <section className="section h-section" aria-labelledby="can-heading">
        <Container>
          <div className="home-head">
            <div>
              <p className="eyebrow">Honest limits</p>
              <h2 id="can-heading" className="text-h2 mt-3 text-ink">What AI can and cannot do for you</h2>
            </div>
            <p className="text-body text-muted">We set these limits on every assistant we build.</p>
          </div>
          <div className="stack grid gap-3 md:grid-cols-2" data-reveal-stagger>
            <div className="card" data-reveal-child>
              <h3 className="flex items-center gap-2 text-lg font-semibold text-ink"><span className="icon-chip icon-chip-sm"><UiIcon name="check" /></span>It can</h3>
              <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-ink">
                {can.map((item) => <li key={item} className="flex gap-2"><UiIcon name="check" className="mt-0.5 size-3.5 shrink-0 text-accent-ink" />{item}</li>)}
              </ul>
            </div>
            <div className="card" data-reveal-child>
              <h3 className="flex items-center gap-2 text-lg font-semibold text-ink"><span className="icon-chip icon-chip-sm"><UiIcon name="minus" /></span>It will not</h3>
              <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-ink">
                {cannot.map((item) => <li key={item} className="flex gap-2"><UiIcon name="minus" className="mt-0.5 size-3.5 shrink-0 text-muted" />{item}</li>)}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="section h-section h-band-soft" aria-labelledby="tools-heading">
        <Container>
          <div className="home-head">
            <div>
              <p className="eyebrow">Options</p>
              <h2 id="tools-heading" className="text-h2 mt-3 text-ink">Four ways to use AI and automation</h2>
            </div>
            <p className="text-body text-muted">Each page has a sample and common questions.</p>
          </div>
          <ul className="stack grid gap-3 sm:grid-cols-2 lg:grid-cols-4" data-reveal-stagger>
            {pages.map((page) => <DetailCard key={page.slug} page={page} />)}
          </ul>
        </Container>
      </section>

      <HomeSampleFlow flows={[sample]} eyebrow="Sample walkthrough" title={sample.title} intro="An example of an assistant at work. It is an illustration, not a client result." />
      <HomeFaq items={faqs} title="Questions about AI" />
      <CtaBand title="Want to try AI on one small job?" description="Send us the questions your team answers most. We will show you how an assistant would handle them." primaryLabel="Talk to us" showWhatsapp />
    </>
  );
}
