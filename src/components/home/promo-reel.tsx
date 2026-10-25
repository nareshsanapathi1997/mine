"use client";

import { Brand, Item, ReelPlayer, Scene, ServiceGrid, y, type VoiceLine } from "@/components/reel/reel-player";

const SERVICES = [
  { title: "Websites", body: "Fast sites that bring enquiries" },
  { title: "Mobile apps", body: "Android and iPhone" },
  { title: "Business software", body: "Fees, orders, stock, dashboards" },
  { title: "WhatsApp automation", body: "Replies and reminders" },
  { title: "AI assistants", body: "On chat and phone" },
  { title: "Cloud and support", body: "Hosting, backups, care" },
];

const INDUSTRIES = [
  { name: "Schools", service: "Website", body: "Online admissions and fee details" },
  { name: "Hotels", service: "Mobile app", body: "Guests book rooms from their phone" },
  { name: "Factories", service: "Software", body: "Orders and stock on one screen" },
  { name: "Clinics", service: "AI assistant", body: "Bookings and reminders, day and night" },
];

const OUTCOMES = [
  ["Every enquiry", "Saved in one list"],
  ["Every reply", "Sent within seconds"],
  ["Every follow-up", "Already scheduled"],
];

type Variant = "home" | "automation";

/** Story start (a), tools-and-outcome start (b) and total length per variant. */
const TIMING: Record<Variant, { a: number; b: number; duration: number; still: number }> = {
  home: { a: 5, b: 28, duration: 35, still: 4 },
  automation: { a: 0, b: 15, duration: 22, still: 13 },
};

function voiceLines(variant: Variant): VoiceLine[] {
  const { a, b } = TIMING[variant];
  return [
    ...(variant === "home"
      ? ([[0.1, "Varasena builds websites, mobile apps, software, automation and AI."]] as VoiceLine[])
      : []),
    [a, "Every day, enquiries like this go unanswered."],
    [a + 4.2, "What if every message got a reply in seconds, even at 9 PM?"],
    [a + 8.7, "An AI assistant replies instantly, saves the enquiry, and tells your team."],
    ...(variant === "home"
      ? ([
          [
            19.6,
            "A school website that takes admissions. A hotel booking app. Order software for factories. And an AI receptionist for clinics.",
          ],
        ] as VoiceLine[])
      : []),
    [b + 0.2, "It works with the tools you already use, and your people stay in charge."],
    [
      b + 3.6,
      "Next morning, every enquiry is saved, every reply sent, every follow-up scheduled. Varasena Technologies.",
    ],
  ];
}

export function PromoReel({ className, variant = "home" }: { className?: string; variant?: Variant }) {
  const { a, b, duration, still } = TIMING[variant];
  const home = variant === "home";
  const howEnd = home ? a + 14.5 : b;

  return (
    <ReelPlayer
      className={className}
      duration={duration}
      stillAt={still}
      voiceLines={voiceLines(variant)}
      label={
        home
          ? `VARASENA ${duration} second sample promo: the services we build, then a school WhatsApp enquiry answered automatically`
          : `VARASENA ${duration} second sample: a school WhatsApp enquiry answered automatically`
      }
    >
      {(t) => (
        <>
          {home ? (
            <Scene t={t} s={0} e={5}>
              <Item t={t} s={0.1} className="promo-reel-big promo-reel-h promo-reel-wide" style={{ top: y(5) }}>
                Everything your business needs, <span className="promo-reel-blue">built in one place</span>.
              </Item>
              <ServiceGrid t={t} s={0.5} items={SERVICES} />
              <Brand t={t} s={2.8} />
            </Scene>
          ) : null}

          <Scene t={t} s={a} e={a + 4}>
            <Item t={t} s={a} className="promo-reel-tag">
              Sample scenario
            </Item>
            <Item t={t} s={a} className="promo-reel-phone">
              <div className="promo-reel-phone-hd">School WhatsApp · 9:02 PM</div>
              <Item t={t} s={a + 0.5} className="promo-reel-b promo-reel-in" style={{ position: "relative" }}>
                Is admission open for Class 6?
                <small>9:02 PM</small>
              </Item>
            </Item>
            <Item t={t} s={a + 1.2} className="promo-reel-big promo-reel-side" style={{ top: y(15) }}>
              9 PM.
              <br />
              No one replies.
            </Item>
            <Item t={t} s={a + 2.6} className="promo-reel-mid promo-reel-side" style={{ top: y(36) }}>
              By morning, that parent has called another school.
            </Item>
          </Scene>

          <Scene t={t} s={a + 4} e={a + 8}>
            <Item t={t} s={a + 4.2} className="promo-reel-big promo-reel-wide" style={{ top: y(14) }}>
              What if every message got a reply <span className="promo-reel-blue">in seconds</span>?
            </Item>
            <Item t={t} s={a + 5.6} className="promo-reel-mid promo-reel-wide" style={{ top: y(40) }}>
              Even at 9 PM. Even on a Sunday. Without anyone on duty.
            </Item>
          </Scene>

          <Scene t={t} s={a + 8} e={howEnd}>
            <Item t={t} s={a + 8} className="promo-reel-phone">
              <div className="promo-reel-phone-hd">School WhatsApp</div>
              <div className="promo-reel-b promo-reel-in">
                Is admission open for Class 6?
                <small>9:02 PM</small>
              </div>
              <Item t={t} s={a + 8.7} className="promo-reel-b promo-reel-out" style={{ position: "relative" }}>
                Yes, admissions are open. Here are the fees and the form link.
                <small>9:02 PM · instant</small>
              </Item>
            </Item>
            {[
              "Instant reply, from the school\u2019s own information",
              "Saved in the admission list. No one types it again",
              "Counsellor sees it next morning, with the full chat",
              "Polite reminder if the form is not filled",
            ].map((step, index) => (
              <Item
                key={step}
                t={t}
                s={a + 9.2 + index * 1.2}
                className="promo-reel-step promo-reel-side"
                style={{ top: y(11 + index * 8.5) }}
              >
                <i>{index + 1}</i>
                {step}
              </Item>
            ))}
          </Scene>

          {home ? (
            <Scene t={t} s={19.5} e={b}>
              <Item t={t} s={19.6} className="promo-reel-big promo-reel-h promo-reel-wide" style={{ top: y(5) }}>
                One team. <span className="promo-reel-blue">Every kind of business.</span>
              </Item>
              {INDUSTRIES.map((row, index) => (
                <Item
                  key={row.name}
                  t={t}
                  s={20.3 + index * 1.8}
                  className="promo-reel-row"
                  style={{ top: y(16 + index * 10) }}
                >
                  <b>
                    {row.name}
                    <em>{row.service}</em>
                  </b>
                  <span>{row.body}</span>
                </Item>
              ))}
            </Scene>
          ) : null}

          <Scene t={t} s={b} e={b + 3.5}>
            <Item t={t} s={b + 0.1} className="promo-reel-big promo-reel-h promo-reel-wide" style={{ top: y(9) }}>
              Works with the tools you already use.
            </Item>
            <Item t={t} s={b + 0.6} className="promo-reel-chips" style={{ top: y(26) }}>
              <span>WhatsApp Business</span>
              <span>Tally</span>
              <span>Excel</span>
              <span>Google Sheets</span>
              <span>Razorpay</span>
              <span>UPI</span>
              <span>Gmail</span>
            </Item>
            <Item t={t} s={b + 1.3} className="promo-reel-mid promo-reel-wide" style={{ top: y(42) }}>
              AI answers the routine questions. <span className="promo-reel-blue">People stay in charge</span> of
              decisions.
            </Item>
          </Scene>

          <Scene t={t} s={b + 3.5} e={duration + 1}>
            <Item t={t} s={b + 3.6} className="promo-reel-big promo-reel-h promo-reel-wide" style={{ top: y(5) }}>
              Next morning, your team <span className="promo-reel-blue">starts ahead</span>.
            </Item>
            {OUTCOMES.map(([title, body], index) => (
              <Item
                key={title}
                t={t}
                s={b + 4.1 + index * 0.5}
                className="promo-reel-row"
                style={{ top: y(16 + index * 10) }}
              >
                <b>{title}</b>
                <span>{body}</span>
              </Item>
            ))}
            <Brand t={t} s={b + 5.6} top={46} />
          </Scene>
        </>
      )}
    </ReelPlayer>
  );
}
