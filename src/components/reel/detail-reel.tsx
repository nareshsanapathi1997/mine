"use client";

import { Brand, Item, ReelPlayer, Scene, ServiceGrid, y, type VoiceLine } from "@/components/reel/reel-player";

const DURATION = 22;

function listJoin(items: string[]) {
  if (items.length < 2) return items.join("");
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

export function DetailReel({
  name,
  problems,
  builds,
  ctaTitle,
  forIndustry = false,
  className,
}: {
  name: string;
  forIndustry?: boolean;
  problems: { problem: string; fix: string }[];
  builds: { title: string; body: string }[];
  ctaTitle: string;
  className?: string;
}) {
  const shownProblems = problems.slice(0, 3);
  const shownBuilds = builds.slice(0, 4);

  const voice: VoiceLine[] = [
    [0.1, `${name}. Sound familiar? ${shownProblems[0]?.problem ?? ""}`],
    [7.2, `Here is what changes. ${shownProblems[0]?.fix ?? ""}`],
    [13.2, `What we build: ${listJoin(shownBuilds.map((b) => b.title.toLowerCase()))}.`],
    [18.2, `${ctaTitle} Talk to Varasena Technologies.`],
  ];

  return (
    <ReelPlayer
      className={className}
      duration={DURATION}
      stillAt={12}
      voiceLines={voice}
      label={`VARASENA ${DURATION} second sample for ${name}: common problems, what changes, and what we build`}
    >
      {(t) => (
        <>
          <Scene t={t} s={0} e={7}>
            <Item t={t} s={0} className="promo-reel-tag">
              {name} · sample
            </Item>
            <Item t={t} s={0.1} className="promo-reel-big promo-reel-h promo-reel-wide" style={{ top: y(5) }}>
              Sound <span className="promo-reel-blue">familiar?</span>
            </Item>
            {shownProblems.map((item, index) => (
              <Item
                key={item.problem}
                t={t}
                s={0.8 + index * 1.4}
                className="promo-reel-step promo-reel-wide"
                style={{ top: y(16 + index * 10) }}
              >
                <i className="promo-reel-x">✕</i>
                {item.problem}
              </Item>
            ))}
          </Scene>

          <Scene t={t} s={7} e={13}>
            <Item t={t} s={7.1} className="promo-reel-big promo-reel-h promo-reel-wide" style={{ top: y(5) }}>
              Here is <span className="promo-reel-blue">what changes</span>.
            </Item>
            {shownProblems.map((item, index) => (
              <Item
                key={item.fix}
                t={t}
                s={7.8 + index * 1.4}
                className="promo-reel-step promo-reel-wide"
                style={{ top: y(16 + index * 10) }}
              >
                <i>✓</i>
                {item.fix}
              </Item>
            ))}
          </Scene>

          <Scene t={t} s={13} e={18}>
            <Item t={t} s={13.1} className="promo-reel-big promo-reel-h promo-reel-wide" style={{ top: y(5) }}>
              What we <span className="promo-reel-blue">build</span>
              {forIndustry ? ` for ${name.toLowerCase()}` : ""}.
            </Item>
            <ServiceGrid t={t} s={13.6} items={shownBuilds} columns={2} />
          </Scene>

          <Scene t={t} s={18} e={DURATION + 1}>
            <Item t={t} s={18.1} className="promo-reel-big promo-reel-wide" style={{ top: y(10) }}>
              {ctaTitle}
            </Item>
            <Item t={t} s={18.6} className="promo-reel-mid promo-reel-wide" style={{ top: y(30) }}>
              Free first call · <span className="promo-reel-blue">Written plan with cost</span> · Support after launch
            </Item>
            <Brand t={t} s={19.2} />
          </Scene>
        </>
      )}
    </ReelPlayer>
  );
}
