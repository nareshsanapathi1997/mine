import {
  AudioLines,
  Blocks,
  Bot,
  Briefcase,
  Building2,
  Cloud,
  Compass,
  Cpu,
  Factory,
  Globe,
  GraduationCap,
  Handshake,
  HeartPulse,
  Hotel,
  Layers,
  Link2,
  Database,
  MessageCircle,
  Shield,
  Smartphone,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "@/content/types";

const icons: Record<IconName, LucideIcon> = {
  globe: Globe,
  smartphone: Smartphone,
  blocks: Blocks,
  bot: Bot,
  audio: AudioLines,
  message: MessageCircle,
  workflow: Workflow,
  cloud: Cloud,
  graduation: GraduationCap,
  hotel: Hotel,
  factory: Factory,
  building: Building2,
  heart: HeartPulse,
  briefcase: Briefcase,
  compass: Compass,
  cpu: Cpu,
  layers: Layers,
  shield: Shield,
  handshake: Handshake,
  link: Link2,
  database: Database,
};

export function Icon({
  name,
  className,
}: {
  name: IconName;
  className?: string;
}) {
  const Cmp = icons[name];
  return <Cmp className={className} strokeWidth={1.5} aria-hidden="true" />;
}
