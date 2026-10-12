import {
  ArrowRight,
  AudioLines,
  Blocks,
  Bot,
  Briefcase,
  Building2,
  Check,
  CircleCheck,
  ClipboardList,
  Cloud,
  Compass,
  Cpu,
  Database,
  Factory,
  Globe,
  GraduationCap,
  Handshake,
  HeartPulse,
  Hotel,
  Layers,
  Link2,
  Mail,
  MapPin,
  MessageCircle,
  Minus,
  Phone,
  Plus,
  Search,
  Shield,
  Smartphone,
  User,
  Users,
  Workflow,
  Zap,
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

const uiIcons = {
  arrow: ArrowRight,
  audio: AudioLines,
  blocks: Blocks,
  bot: Bot,
  briefcase: Briefcase,
  building: Building2,
  check: Check,
  clipboard: ClipboardList,
  cloud: Cloud,
  compass: Compass,
  cpu: Cpu,
  database: Database,
  factory: Factory,
  globe: Globe,
  graduation: GraduationCap,
  handshake: Handshake,
  heart: HeartPulse,
  hotel: Hotel,
  layers: Layers,
  link: Link2,
  mail: Mail,
  message: MessageCircle,
  minus: Minus,
  phone: Phone,
  pin: MapPin,
  plus: Plus,
  search: Search,
  shield: Shield,
  smartphone: Smartphone,
  status: CircleCheck,
  user: User,
  users: Users,
  workflow: Workflow,
  zap: Zap,
} as const;

export type UiIconName = keyof typeof uiIcons;

export function UiIcon({
  name,
  className = "size-4 shrink-0",
}: {
  name: UiIconName;
  className?: string;
}) {
  const Cmp = uiIcons[name];
  return <Cmp className={className} strokeWidth={1.5} aria-hidden="true" />;
}

export function EyebrowMark() {
  return (
    <span className="icon-chip icon-chip-sm" aria-hidden="true">
      <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M4.5 3v10" />
        <path d="M4.5 8 12 4.2" />
        <path d="M4.5 8 12 11.8" />
      </svg>
    </span>
  );
}

const glyphProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true as const,
};

export function SocialGlyph({ label, className = "size-3.5 shrink-0" }: { label: string; className?: string }) {
  if (label === "LinkedIn") {
    return (
      <svg {...glyphProps} className={className}>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M8 10.5V17M8 7.5h.01M12 17v-4a2 2 0 1 1 4 0v4" />
      </svg>
    );
  }
  if (label === "Instagram") {
    return (
      <svg {...glyphProps} className={className}>
        <rect x="4" y="4" width="16" height="16" rx="4" />
        <circle cx="12" cy="12" r="3.5" />
        <circle cx="17.2" cy="6.8" r="0.7" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  return (
    <svg {...glyphProps} className={className}>
      <path d="M5 5.5 10.4 12 5.2 18.5M19 5.5 13.5 12l5.3 6.5" />
    </svg>
  );
}
