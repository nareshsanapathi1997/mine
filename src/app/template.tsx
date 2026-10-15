import { RouteTransition } from "@/components/motion/route-transition";

/** Re-mounts on every navigation, so each new page fades in. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <RouteTransition>{children}</RouteTransition>;
}
