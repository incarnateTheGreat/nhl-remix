import { Clock, PeriodDescriptior } from "types/types";

import { PERIODS } from "~/utils";

type GameStateProps = {
  gameState: string;
  periodDescriptor: PeriodDescriptior;
  clock: Clock;
  startTimeUTC: string;
  classnames?: string;
};

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
          <span className="rounded bg-red-700 px-2 py-0.5 text-sm font-semibold text-white">
            OT
          </span>
          <span className="text-sm">{clock.timeRemaining}</span>
        </div>
      );
    }

    if ("otPeriods" in periodDescriptor) {
      return (
        <div className={classnames}>
          <span className="rounded bg-red-700 px-2 py-0.5 text-sm font-semibold text-white">
            {`${periodDescriptor.otPeriods}OT`}
          </span>
          <span className="text-sm">{clock.timeRemaining}</span>
        </div>
      );
    }

    return (
      <div className={classnames}>
        <span className="rounded bg-green-700 px-2 py-0.5 text-sm font-semibold text-white">
          {PERIODS[period]} {clock.inIntermission ? "INT" : ""}
        </span>
        <span className="text-sm">{clock.timeRemaining}</span>
      </div>
    );
  }

  if (gameState === "OFF" || gameState === "FINAL") {
    if (periodDescriptor.periodType === "SO") {
      return (
        <span className="rounded bg-gray-200 px-2 py-0.5 text-sm font-semibold text-black">
          FINAL/SO
        </span>
      );
    }

    if (periodDescriptor.periodType === "OT" && !periodDescriptor.otPeriods) {
      return (
        <span className="rounded bg-gray-200 px-2 py-0.5 text-sm font-semibold text-black">
          FINAL/OT
        </span>
      );
    }

    if ("otPeriods" in periodDescriptor) {
      return (
        <span className="rounded bg-gray-200 px-2 py-0.5 text-sm font-semibold text-black">
          {`FINAL/${periodDescriptor.otPeriods}OT`}
        </span>
      );
    }

    return (
      <span className="rounded bg-gray-200 px-2 py-0.5 text-sm font-semibold text-black">
        FINAL
      </span>
    );
  }

  return <span className="text-sm font-bold">{time}</span>;
}
