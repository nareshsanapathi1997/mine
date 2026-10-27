import { ImageResponse } from "next/og";
import { siteConfig } from "@/content/site";

export const socialImageSize = { width: 1200, height: 630 };
export const socialImageContentType = "image/png";
export const socialImageAlt = `${siteConfig.name} — Business systems built around how you operate.`;

function titleLines(title: string) {
  const words = title.trim().split(/\s+/);
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > 26 && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);

  if (lines.length <= 3) return lines;
  return [lines[0], lines[1], lines.slice(2).join(" ")];
}

export function socialImage(options?: { eyebrow?: string; title?: string; footer?: string }) {
  const eyebrow = (options?.eyebrow ?? siteConfig.name).toUpperCase();
  const lines = options?.title
    ? titleLines(options.title)
    : ["Build Smarter.", "Automate Faster.", "Grow Better."];
  const fontSize = lines.length >= 3 ? 54 : 64;
  const footer = options?.footer ?? "Web · Mobile · AI · Automation · Cloud";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "#050d22",
          color: "#f4f8ff",
        }}
      >
        <div style={{ width: 18, height: "100%", backgroundColor: "#7af0ff" }} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "68px 72px",
            flex: 1,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: 99,
                backgroundColor: "#0a5ce6",
              }}
            />
            <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: "0.08em", color: "#7af0ff" }}>
              {eyebrow}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {lines.map((line) => (
              <div
                key={line}
                style={{
                  fontSize,
                  fontWeight: 700,
                  letterSpacing: "-0.045em",
                  lineHeight: 1.05,
                }}
              >
                {line}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 26, color: "#9ba9c3", letterSpacing: "0.01em" }}>{footer}</div>
        </div>
      </div>
    ),
    { ...socialImageSize },
  );
}
