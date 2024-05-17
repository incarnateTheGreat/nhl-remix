import TableBody from "./TableBody";
import TableHeader from "./TableHeader";

import { LinescoreByPeriodObject, TeamGameStats } from "~/types";

type ShotsOnGoalProps = {
  awayTeamAbbrev: string;
  homeTeamAbbrev: string;
  shotsByPeriod: LinescoreByPeriodObject[];
  teamGameStats: TeamGameStats[];
};

export default function ShotsOnGoal({
  awayTeamAbbrev,
  homeTeamAbbrev,
  shotsByPeriod,
  teamGameStats,
}: ShotsOnGoalProps) {
  const totalSOG = teamGameStats.find(
    (stat) => stat.category === "sog",
  ) as TeamGameStats;

  return (
    <div className="flex w-full flex-col overflow-x-auto border p-4 lg:w-96">
      <h3 className="font-bold">Shots on Goal</h3>
      <table className="mt-4">
        <TableHeader
          homeTeamAbbrev={homeTeamAbbrev}
          awayTeamAbbrev={awayTeamAbbrev}
        />
        <TableBody shotsByPeriod={shotsByPeriod} totalSOG={totalSOG} />
      </table>
    </div>
  );
}
