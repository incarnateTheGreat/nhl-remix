import { Clock, PeriodDescriptior } from "types/types";

import Whistle from "~/components/Whistle";
import { cn, PERIODS } from "~/utils";

type GameStateProps = {
  gameState: string;
  periodDescriptor: PeriodDescriptior;
  clock: Clock;
  startTimeUTC: string;
  classnames?: string;
};

type CurrentGameStatusType = {
  isPlayStopped: boolean;
  timeRemaining: string;
};

const CurrentGameStatus = ({
  isPlayStopped,
  timeRemaining,
}: CurrentGameStatusType) => {
  return (
    <div className="flex items-center justify-center text-sm">
      {isPlayStopped ? <Whistle /> : null}
      {timeRemaining}
    </div>
  );
};

const OT_OR_CRITIAL =
  "rounded bg-red-700 px-2 py-0.5 text-xs md:text-sm font-semibold text-white";
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
  const isPlayStopped = !clock?.running && !clock?.inIntermission;

  if (gameState === "LIVE" || gameState === "CRIT") {
    if (periodDescriptor.periodType === "OT") {
      return (
        <div className={classnames}>
          <div className={OT_OR_CRITIAL}>OT</div>
          <CurrentGameStatus
            isPlayStopped={isPlayStopped}
            timeRemaining={clock?.timeRemaining}
          />
        </div>
      );
    }

    if ("otPeriods" in periodDescriptor) {
      return (
        <div className={classnames}>
          <div className={OT_OR_CRITIAL}>
            {`${periodDescriptor.otPeriods}OT`}
          </div>
          <div className="text-sm">{clock?.timeRemaining}</div>
        </div>
      );
    }

    return (
      <div className={classnames}>
        <div
          className={cn(
            "rounded bg-green-700 px-2 py-0.5 text-xs font-semibold text-white md:text-sm",
            {
              "bg-yellow-700": clock?.inIntermission,
            },
          )}
        >
          {PERIODS[period]} {clock?.inIntermission ? "INT" : ""}
        </div>
        <div className="md:mt-0.5">
          <CurrentGameStatus
            isPlayStopped={isPlayStopped}
            timeRemaining={clock?.timeRemaining}
          />
        </div>
      </div>
    );
  }

  if (gameState === "OFF" || gameState === "FINAL") {
    if (periodDescriptor.periodType === "SO") {
      return <div className={FINAL}>FINAL/SO</div>;
    }

    if (periodDescriptor.periodType === "OT" && !periodDescriptor.otPeriods) {
      return <div className={FINAL}>FINAL/OT</div>;
    }

    if ("otPeriods" in periodDescriptor) {
      return (
        <div className={FINAL}>{`FINAL/${periodDescriptor.otPeriods}OT`}</div>
      );
    }

    return <div className={FINAL}>FINAL</div>;
  }

  return <div className="text-xs font-bold md:text-sm">{time}</div>;
}
