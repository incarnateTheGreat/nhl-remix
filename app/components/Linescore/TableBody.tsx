import { useRouteLoaderData } from "@remix-run/react";

import LineScoreRow from "./LinescoreRow";

import { Game } from "~/types";
import { handlePeriodGoals } from "~/utils";

export default function TableBody() {
  const gameDataToRender = useRouteLoaderData("routes/game.$gameId") as Game;

  const {
    awayTeam,
    homeTeam,
    linescore: { byPeriod, totals },
  } = gameDataToRender;

  const periodData = [...handlePeriodGoals(byPeriod)].filter(
    (period) => period.periodDescriptor.periodType !== "SO",
  );

  return (
    <tbody>
      <LineScoreRow
        logo={awayTeam.logo}
        teamAbbrev={awayTeam.abbrev}
        periodData={periodData}
        totals={totals.away}
        homeAway="away"
      />
      <LineScoreRow
        logo={homeTeam.logo}
        teamAbbrev={homeTeam.abbrev}
        periodData={periodData}
        totals={totals.home}
        homeAway="home"
      />
    </tbody>
  );
}
