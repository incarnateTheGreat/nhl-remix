import { Link } from "@remix-run/react";

import SeriesGameStatus from "./SeriesGameStatus";
import SeriesTeamRow from "./SeriesTeamRow";

import { SeasonSeries } from "~/types";
import { isGameComplete } from "~/utils";

type SeriesGameBoxProps = {
  game: SeasonSeries;
};

export default function SeriesGameBox({ game }: SeriesGameBoxProps) {
  const { awayTeam, homeTeam, startTimeUTC, gameState, id } = game;

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
      className="cursor-pointer rounded border border-slate-200 p-2 transition-all hover:border-gray-800"
    >
      <SeriesTeamRow team={awayTeam} classNames={awayTeamRow} />
      <SeriesTeamRow team={homeTeam} classNames={homeTeamRow} />
      <SeriesGameStatus startTimeUTC={startTimeUTC} />
    </Link>
  );
}
