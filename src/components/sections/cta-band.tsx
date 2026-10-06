import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

export function CtaBand() {
  return (
    <section className="band-dark relative overflow-hidden text-white" aria-labelledby="cta-heading">
      <div className="band-grid" aria-hidden="true" />
      <Container className="section relative z-[1] text-center">
        <h2 id="cta-heading" className="text-h2 mx-auto max-w-[18ch] text-balance text-white">
          Have a business problem that technology can solve?
        </h2>
        <p className="text-body cluster mx-auto max-w-[62ch] text-mist">
          Tell us what you’re trying to improve. We’ll help you find the right digital, AI or automation solution.
        </p>
        <div className="cluster-lg flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" arrow className="w-full sm:w-auto">
            <Link href="/contact">Talk to an Expert</Link>
          </Button>
          <Button asChild size="lg" variant="inverse" arrow className="w-full sm:w-auto">
            <Link href="/contact?need=New+project">Start a Project</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
