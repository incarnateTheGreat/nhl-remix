import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import {
  GameState,
  LinescoreByPeriod,
  PeriodDescriptior,
} from "../types/types";
import { ConferencesType, DivisionsType } from "./routes/standings.($type)";

type TzOptions = {
  [key: string]: string;
};

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
  if (!n) {
    return "--";
  }

  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;

  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const deepMerge = (target, ...sources) => {
  if (!sources.length) {
    return target;
  }
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) {
          Object.assign(target, { [key]: {} });
        }
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

const getTimeZone = (tz = "EST") => {
  const tzOptions: TzOptions = {
    EST: "America/Toronto",
    CST: "America/Chicago",
    MST: "America/Denver",
    PST: "America/Los_Angeles",
  };

  return tzOptions[tz];
};

const getDate = (dateStr: string) => {
  const date = new Date(dateStr);

  const tzName = getTimeZone("EST");

  const day = date.toLocaleString("en-US", {
    day: "numeric",
    timeZone: tzName,
  });

  const month = date.toLocaleString("en-US", {
    month: "short",
    timeZone: tzName,
  });

  return `${month} ${day}`;
};

const getTodaysDate = () => {
  const date = new Date();

  const tzName = getTimeZone("EST");

  const day = date.toLocaleString("en-US", {
    day: "2-digit",
    timeZone: tzName,
  });

  const month = date.toLocaleString("en-US", {
    month: "2-digit",
    timeZone: tzName,
  });

  const year = date.getUTCFullYear();

  return `${year}-${month}-${day}`;
};

const convertTime = (dateStr: string) => {
  const timeZone = getTimeZone("EST");

  const time = new Date(dateStr).toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone,
  });

  return `${time}`;
};

type TimerProps = {
  running: boolean;
  iv: number;
  timeout: number | NodeJS.Timeout;
  cb: () => void;
  start: (cb?: (() => void) | undefined, iv?: number) => void;
  execute: (e: TimerProps) => void;
  stop: () => void;
  set_interval: (iv: number) => void;
};

function Timer(this: TimerProps) {
  this.running = false;
  this.iv = 5000;
  this.timeout = 0;
  this.cb = () => {};
  this.start = (cb, iv) => {
    const elm = this as TimerProps;

    clearInterval(this.timeout);

    this.running = true;

    if (cb) {
      this.cb = cb;
    }
    if (iv) {
      this.iv = iv;
    }

    this.timeout = setTimeout(function () {
      elm.execute(elm);
    }, this.iv);
  };
  this.execute = (e) => {
    if (!e.running) {
      return false;
    }
    e.cb();
    e.start();
  };
  this.stop = () => {
    this.running = false;
  };
  this.set_interval = (iv) => {
    clearInterval(this.timeout);
    this.start(this.cb, iv);
  };
}

const reverseLeagueData = (data: DivisionsType | ConferencesType) => {
  return Object.keys(data)
    .reverse()
    .reduce((acc: DivisionsType | ConferencesType, name) => {
      acc[name] = data[name];

      return acc;
    }, {});
};

export {
  cn,
  convertTime,
  deepMerge,
  getDate,
  getLogo,
  getNumberWithOrdinal,
  getRandomKey,
  getTodaysDate,
  GOAL_MODIFIER,
  handlePeriodGoals,
  handlePeriodLabel,
  isGameActive,
  isGameComplete,
  isPreGame,
  PERIODS,
  reverseLeagueData,
  Timer,
};
