import type { Config } from "tailwindcss";
import { RecursiveKeyValuePair, ResolvableTo } from "tailwindcss/types/config";

export const TEAM_COLOURS_UTILS: { [k: string]: Record<string, unknown> } = {
  ANA: { 0: "#010101", 1: "#a2aaad", 2: "#fc4c02", 3: "#85714d" },
  ARI: { 0: "#010101", 1: "#862633", 2: "#ddcba4" },
  BOS: { 0: "#010101", 1: "#ffb81c" },
  BUF: { 0: "#041e42", 1: "#a2aaad", 2: "#ffb81c", 3: "#c8102e" },
  CGY: { 0: "#010101", 1: "#f1be48", 2: "#c8102e" },
  CAR: { 0: "#010101", 1: "#a2aaad", 2: "#c8102e" },
  CHI: {
    0: "#010101",
    1: "#ff671f",
    2: "#ffd100",
    3: "#001871",
    4: "#c8102e",
    5: "#00843d",
    6: "#cc8a00",
  },
  COL: { 0: "#010101", 1: "#236192", 2: "#a4a9ad", 3: "#6f263d" },
  CBJ: { 0: "#041e42", 1: "#a4a9ad", 2: "#c8102e" },
  DAL: { 0: "#006341", 1: "#010101", 2: "#8a8d8f" },
  DET: { 0: "#c8102e" },
  EDM: { 0: "#00205b", 1: "#cf4520" },
  FLA: { 0: "#041e42", 1: "#b9975b", 2: "#c8102e" },
  LAK: { 0: "#010101", 1: "#a2aaad" },
  MIN: { 0: "#154734", 1: "#ddcba4", 2: "#eaaa00", 3: "#a6192e" },
  MTL: { 0: "#001e62", 1: "#a6192e" },
  NSH: { 0: "#041e42", 1: "#ffb81c" },
  NYI: { 0: "#003087", 1: "#fc4c02" },
  NYR: { 0: "#0033a0", 1: "#c8102e" },
  NJD: { 0: "#010101", 1: "#c8102e" },
  OTT: { 0: "#010101", 1: "#c8102e", 2: "#c69214" },
  PHI: { 0: "#010101", 1: "#fa4616" },
  PIT: { 0: "#010101", 1: "#ffb81c" },
  SJS: { 0: "#010101", 1: "#e57200", 2: "#006272" },
  STL: { 0: "#041e42", 1: "#ffb81c", 2: "#003087" },
  SEA: { 0: "#001628", 1: "#93d4d5" },
  TBL: { 0: "#00205b" },
  TOR: { 0: "#00205b" },
  VAN: { 0: "#00205b", 1: "#97999b", 2: "#041c2c" },
  VGK: { 0: "#010101", 1: "#b4975a", 2: "#333f42" },
  WAS: {
    0: "#041e42",
    1: "#a2aaad",
    2: "#782f40",
    3: "#a6192e",
    4: "#53565a",
  },
  WPG: { 0: "#041e42", 1: "#c8102e" },
};

export const TEAM_COLOURS: ResolvableTo<RecursiveKeyValuePair<string, string>> =
  TEAM_COLOURS_UTILS as ResolvableTo<RecursiveKeyValuePair<string, string>>;

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: TEAM_COLOURS,
    },
  },
  plugins: [],
  safelist: [
    {
      pattern:
        /(bg|text|border)-ANA|ARI|BOS|BUF|CGY|CAR|CHI|COL|CBJ|DAL|DET|EDM|FLA|LAK|MIN|MTL|NSH|NJD|NYI|NYR|OTT|PHI|PIT|SJS|SEA|STL|TBL|TOR|UTA|VAN|VGK|WSH|WPG/,
    },
  ],
} satisfies Config;
