import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { GameState, LinescoreByPeriod, PeriodDescriptior } from "./types";

const PERIODS: { [k: string]: string } = {
  1: "1st",
  2: "2nd",
  3: "3rd",
};

const GOAL_MODIFIER: { [k: string]: string } = {
  sh: "sh",
  pp: "ppg",
  ["empty-net"]: "en",
};

const handlePeriodLabel = (periodDescriptor: PeriodDescriptior) => {
  if (periodDescriptor.periodType === "OT") {
    return `${periodDescriptor.otPeriods ?? ""}OT`;
  }

  if (periodDescriptor.periodType === "SO") {
    return "SO";
  }

  return PERIODS[periodDescriptor.number];
};

const handlePeriodGoals = (byPeriod: LinescoreByPeriod) => {
  const periodData = [...byPeriod].filter(
    (game) => game.periodDescriptor.periodType === "REG",
  );

  const OTPeriods = [...byPeriod]
    .filter((game) => game.periodDescriptor.periodType === "OT")
    .pop();

  const SOPeriod = [...byPeriod]
    .filter((game) => game.periodDescriptor.periodType === "SO")
    .pop();

  if (OTPeriods) {
    periodData.push(OTPeriods);
  }

  if (SOPeriod) {
    periodData.push(SOPeriod);
  }

  return periodData;
};

const isPreGame = (gameState: GameState) => {
  return gameState === "PRE" || gameState === "FUT";
};

const isGameActive = (gameState: GameState) => {
  return gameState === "CRIT" || gameState === "LIVE" || gameState === "ON";
};

const isGameComplete = (gameState: GameState) => {
  return gameState === "OFF" || gameState === "FINAL";
};

const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

const isObject = (item: object) => {
  return item && typeof item === "object" && !Array.isArray(item);
};

const getLogo = (teamAbbrev: string) => {
  return `https://assets.nhle.com/logos/nhl/svg/${teamAbbrev}_light.svg`;
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const deepMerge = (target, ...sources) => {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        deepMerge(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return deepMerge(target, ...sources);
};

// const TEAM_COLOURS_UTILS: { [k: string]: Record<string, unknown> } = {
//   // const TEAM_COLOURS: ResolvableTo<RecursiveKeyValuePair<string, string>> = {
//   ANA: { 0: "#010101", 1: "#a2aaad", 2: "#fc4c02", 3: "#85714d" },
//   ARI: { 0: "#010101", 1: "#862633", 2: "#ddcba4" },
//   BOS: { 0: "#010101", 1: "#ffb81c" },
//   BUF: { 0: "#041e42", 1: "#a2aaad", 2: "#ffb81c", 3: "#c8102e" },
//   CGY: { 0: "#010101", 1: "#f1be48", 2: "#c8102e" },
//   CAR: { 0: "#010101", 1: "#a2aaad", 2: "#c8102e" },
//   CHI: {
//     0: "#010101",
//     1: "#ff671f",
//     2: "#ffd100",
//     3: "#001871",
//     4: "#c8102e",
//     5: "#00843d",
//     6: "#cc8a00",
//   },
//   COL: { 0: "#010101", 1: "#236192", 2: "#a4a9ad", 3: "#6f263d" },
//   CBJ: { 0: "#041e42", 1: "#a4a9ad", 2: "#c8102e" },
//   DAL: { 0: "#010101", 1: "#006341", 2: "#8a8d8f" },
//   DET: { 0: "#c8102e" },
//   EDM: { 0: "#00205b", 1: "#cf4520" },
//   FLA: { 0: "#041e42", 1: "#b9975b", 2: "#c8102e" },
//   LAK: { 0: "#010101", 1: "#a2aaad" },
//   MIN: { 0: "#154734", 1: "#ddcba4", 2: "#eaaa00", 3: "#a6192e" },
//   MTL: { 0: "#001e62", 1: "#a6192e" },
//   NSH: { 0: "#041e42", 1: "#ffb81c" },
//   NYI: { 0: "#003087", 1: "#fc4c02" },
//   NYR: { 0: "#0033a0", 1: "#c8102e" },
//   NJD: { 0: "#010101", 1: "#c8102e" },
//   OTT: { 0: "#010101", 1: "#c8102e", 2: "#c69214" },
//   PHI: { 0: "#010101", 1: "#fa4616" },
//   PIT: { 0: "#010101", 1: "#ffb81c" },
//   SJS: { 0: "#010101", 1: "#e57200", 2: "#006272" },
//   STL: { 0: "#041e42", 1: "#ffb81c", 2: "#003087" },
//   SEA: { 0: "#001628", 1: "#93d4d5" },
//   TBL: { 0: "#00205b" },
//   TOR: { 0: "#00205b" },
//   VAN: { 0: "#00205b", 1: "#97999b", 2: "#041c2c" },
//   VGK: { 0: "#010101", 1: "#b4975a", 2: "#333f42" },
//   WAS: {
//     0: "#041e42",
//     1: "#a2aaad",
//     2: "#782f40",
//     3: "#a6192e",
//     4: "#53565a",
//   },
//   WPG: { 0: "#041e42", 1: "#c8102e" },
// };

export {
  cn,
  deepMerge,
  getLogo,
  GOAL_MODIFIER,
  handlePeriodGoals,
  handlePeriodLabel,
  isGameActive,
  isGameComplete,
  isPreGame,
  PERIODS,
};
