"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function MobileCta() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname === "/contact" || !visible) return null;

  return (
    <div className="sticky bottom-0 z-40 border-t border-line bg-surface/95 px-4 py-3 backdrop-blur-md lg:hidden">
      <Button asChild arrow className="w-full">
        <Link href="/contact">Talk to an Expert</Link>
      </Button>
    </div>
  );
}
