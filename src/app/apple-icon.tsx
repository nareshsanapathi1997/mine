import { ImageResponse } from "next/og";
import { siteConfig } from "@/content/site";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  const letter = siteConfig.name.trim().charAt(0).toUpperCase() || "K";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0B1220",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: 108,
              fontWeight: 700,
              color: "#FFFFFF",
              lineHeight: 1,
              letterSpacing: "-0.04em",
            }}
          >
            {letter}
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
            <div
              style={{
                width: 16,
                height: 16,
                borderRadius: 99,
                backgroundColor: "#2563EB",
              }}
            />
            <div
              style={{
                width: 16,
                height: 16,
                borderRadius: 99,
                backgroundColor: "#7C3AED",
              }}
            />
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
