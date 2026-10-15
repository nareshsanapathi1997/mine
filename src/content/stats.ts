/**
 * Figures for the stats strip on the home page (shown just below the hero).
 *
 * The list is EMPTY on purpose: the strip renders nothing until real,
 * verifiable figures are added. Never put estimates or made-up numbers here.
 *
 * To add a figure, push an object like:
 *   { value: 25, suffix: "+", label: "Projects delivered" },
 *   { value: 4, label: "Industries served" },
 *   { value: 98, suffix: "%", label: "Uptime last 12 months", note: "Across hosted client apps" },
 *
 * - value:  a plain number. It counts up from 0 when the strip scrolls into view.
 * - prefix / suffix: optional text around the number, such as "₹", "+" or "%".
 * - decimals: optional, digits after the decimal point (default 0).
 * - label:  short description shown under the number.
 * - note:   optional small print, for example the source or date of the figure.
 * Two to four figures look best.
 */
export type Stat = {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
  note?: string;
};

export const stats: Stat[] = [];
