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

const isGameActive = (gameState: GameState) => {
  return gameState === "CRIT" || gameState === "LIVE" || gameState === "ON";
};

const isGameComplete = (gameState: GameState) => {
  return gameState === "OFF" || gameState === "FINAL";
};

const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export {
  cn,
  GOALMODIFIER,
  handlePeriodGoals,
  handlePeriodLabel,
  isGameActive,
  isGameComplete,
  PERIODS,
};
