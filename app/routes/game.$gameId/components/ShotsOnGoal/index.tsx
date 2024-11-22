import { useContext } from "react";
import { TeamGameStats } from "types/types";

import { GameContext } from "~/context/game.context";

import TableBody from "./TableBody";
import TableHeader from "./TableHeader";

export default function ShotsOnGoal() {
  const { gameDataToRender } = useContext(GameContext);

  const { awayTeam, homeTeam, shotsByPeriod, teamGameStats } = gameDataToRender;

  const totalSOG = teamGameStats.find(
    (stat) => stat.category === "sog",
  ) as TeamGameStats;

  return (
    <div className="flex w-full flex-col overflow-x-auto">
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
