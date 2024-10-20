import { Link } from "@remix-run/react";

import SeriesGameStatus from "./SeriesGameStatus";
import SeriesTeamRow from "./SeriesTeamRow";

import { SeasonSeries } from "~/types";
import { cn, getNumberWithOrdinal, isGameComplete } from "~/utils";

type SeriesGameBoxProps = {
  game: SeasonSeries;
};

export default function SeriesGameBox({ game }: SeriesGameBoxProps) {
  const {
    awayTeam,
    homeTeam,
    startTimeUTC,
    gameState,
    id,
    clock,
    periodDescriptor,
  } = game;

  const isLive = clock && periodDescriptor;

  let homeTeamRow = "";
  let awayTeamRow = "";

  if (isGameComplete(gameState)) {
    if (awayTeam.score > homeTeam.score) {
      awayTeamRow = "font-semibold";
      homeTeamRow = "opacity-60";
    } else if (homeTeam.score > awayTeam.score) {
      awayTeamRow = "opacity-60";
      homeTeamRow = "font-semibold";
    }
  }

  return (
    <Link
      to={`/game/${id}`}
      className={cn(
        "cursor-pointer rounded border border-slate-200 p-2 transition-all hover:border-gray-800",
        {
          "border-green-700": isLive,
        },
      )}
    >
      <SeriesTeamRow team={awayTeam} classNames={awayTeamRow} />
      <SeriesTeamRow team={homeTeam} classNames={homeTeamRow} />
      {isLive ? (
        <div className="mt-1 flex justify-between text-xs text-gray-500">
          <div className="ml-2">
            {getNumberWithOrdinal(periodDescriptor.number)}
          </div>
          <div>{clock.timeRemaining}</div>
        </div>
      ) : (
        <SeriesGameStatus startTimeUTC={startTimeUTC} />
      )}
    </Link>
  );
}
