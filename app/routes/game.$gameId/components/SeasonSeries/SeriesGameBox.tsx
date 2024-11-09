import { Link } from "@remix-run/react";
import { SeasonSeries } from "types/types";

import {
  cn,
  getDate,
  getNumberWithOrdinal,
  isGameComplete,
  isPreGame,
} from "~/utils";

import SeriesGameStatus from "./SeriesGameStatus";
import SeriesTeamRow from "./SeriesTeamRow";

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
      {isPreGame(gameState) ? (
        <SeriesGameStatus startTimeUTC={startTimeUTC} />
      ) : null}
      {isLive ? (
        <div className="mt-1 flex justify-between text-xs text-gray-500">
          <div className="ml-2">
            {getNumberWithOrdinal(periodDescriptor.number)}
          </div>
          <div>{clock.timeRemaining}</div>
        </div>
      ) : null}
      {isGameComplete(gameState) ? (
        <div className="mt-2 flex justify-between text-xs text-gray-500">
          <div>{getDate(startTimeUTC)}</div>
          <div>Final</div>
        </div>
      ) : null}
    </Link>
  );
}
