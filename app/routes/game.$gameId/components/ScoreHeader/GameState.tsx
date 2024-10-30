import { Clock, PeriodDescriptior } from "types/types";

import { PERIODS } from "~/utils";

type GameStateProps = {
  gameState: string;
  periodDescriptor: PeriodDescriptior;
  clock: Clock;
  startTimeUTC: string;
  classnames?: string;
};

const OT_OR_CRITIAL =
  "rounded bg-red-700 px-2 py-0.5 text-xs md:text-sm font-semibold text-whit";
const FINAL =
  "rounded bg-gray-200 px-2 py-0.5 text-xs md:text-sm font-semibold text-black";

export default function GameState({
  gameState,
  periodDescriptor,
  clock,
  startTimeUTC,
  classnames = "",
}: GameStateProps) {
  const time = new Date(startTimeUTC).toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZoneName: "short",
  });
  const period = periodDescriptor?.number ?? undefined;

  if (gameState === "LIVE" || gameState === "CRIT") {
    if (periodDescriptor.periodType === "OT") {
      return (
        <div className={classnames}>
          <span className={OT_OR_CRITIAL}>OT</span>
          <span className="text-sm">{clock.timeRemaining}</span>
        </div>
      );
    }

    if ("otPeriods" in periodDescriptor) {
      return (
        <div className={classnames}>
          <span className={OT_OR_CRITIAL}>
            {`${periodDescriptor.otPeriods}OT`}
          </span>
          <span className="text-sm">{clock.timeRemaining}</span>
        </div>
      );
    }

    return (
      <div className={classnames}>
        <span className="rounded bg-green-700 px-2 py-0.5 text-xs font-semibold text-white md:text-sm">
          {PERIODS[period]} {clock.inIntermission ? "INT" : ""}
        </span>
        <span className="text-sm">{clock.timeRemaining}</span>
      </div>
    );
  }

  if (gameState === "OFF" || gameState === "FINAL") {
    if (periodDescriptor.periodType === "SO") {
      return <span className={FINAL}>FINAL/SO</span>;
    }

    if (periodDescriptor.periodType === "OT" && !periodDescriptor.otPeriods) {
      return <span className={FINAL}>FINAL/OT</span>;
    }

    if ("otPeriods" in periodDescriptor) {
      return (
        <span className={FINAL}>{`FINAL/${periodDescriptor.otPeriods}OT`}</span>
      );
    }

    return <span className={FINAL}>FINAL</span>;
  }

  return <span className="text-xs font-bold md:text-sm">{time}</span>;
}
