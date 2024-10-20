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

const getNumberWithOrdinal = (n: number) => {
  if (!n) return "--";

  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;

  return n + (s[(v - 20) % 10] || s[v] || s[0]);
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

const getRandomKey = () => {
  const randomBuffer = new Uint32Array(1);

  return crypto.getRandomValues(randomBuffer)[0];
};

export {
  cn,
  deepMerge,
  getLogo,
  getNumberWithOrdinal,
  GOAL_MODIFIER,
  handlePeriodGoals,
  handlePeriodLabel,
  getRandomKey,
  isGameActive,
  isGameComplete,
  isPreGame,
  PERIODS,
};
