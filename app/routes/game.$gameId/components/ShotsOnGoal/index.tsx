import { useRouteLoaderData } from "@remix-run/react";
import { Game, TeamGameStats } from "types/types";

import TableBody from "./TableBody";
import TableHeader from "./TableHeader";

export default function ShotsOnGoal() {
  const gameDataToRender = useRouteLoaderData("routes/game.$gameId") as Game;

  const { awayTeam, homeTeam, shotsByPeriod, teamGameStats } = gameDataToRender;

  const totalSOG = teamGameStats.find(
    (stat) => stat.category === "sog",
  ) as TeamGameStats;

  return (
    <div className="flex w-full flex-col overflow-x-auto lg:w-96">
      <h3 className="font-bold">Shots on Goal</h3>
      <table className="mt-4">
        <TableHeader
          homeTeamAbbrev={awayTeam.abbrev}
          awayTeamAbbrev={homeTeam.abbrev}
        />
        <TableBody shotsByPeriod={shotsByPeriod} totalSOG={totalSOG} />
      </table>
    </div>
  );
}
