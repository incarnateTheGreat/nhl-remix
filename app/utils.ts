import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { GameState, LinescoreByPeriod, PeriodDescriptior } from "./types";

const PERIODS: { [k: string]: string } = {
  1: "1st",
  2: "2nd",
  3: "3rd",
};

const GOALMODIFIER: { [k: string]: string } = {
  sh: "ppg",
  pp: "shg",
  en: "en",
};

const handlePeriodLabel = (periodDescriptor: PeriodDescriptior) => {
  if (periodDescriptor.periodType === "OT") {
    return `${periodDescriptor.otPeriods ?? ""}OT`;
  }

  return PERIODS[periodDescriptor.number];
};

const handlePeriodGoals = (byPeriod: LinescoreByPeriod) => {
  const periodData = [...byPeriod].filter(
    (game) => game.periodDescriptor.periodType !== "OT",
  );
  const OTPeriods = [...byPeriod]
    .filter((game) => game.periodDescriptor.periodType === "OT")
    .pop();

  if (OTPeriods) {
    periodData.push(OTPeriods);
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

export {
  cn,
  deepMerge,
  getLogo,
  GOALMODIFIER,
  handlePeriodGoals,
  handlePeriodLabel,
  isGameActive,
  isGameComplete,
  isPreGame,
  PERIODS,
};
