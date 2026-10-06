"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="section bg-canvas">
      <Container className="max-w-xl">
        <h1 className="text-h1 text-ink">Something went wrong.</h1>
        <p className="text-body cluster text-muted">
          The page did not finish loading. You can try again.
        </p>
        <Button type="button" className="cluster-lg" onClick={() => reset()}>
          Try again
        </Button>
      </Container>
    </section>
  );
}
