import { useRouteLoaderData } from "@remix-run/react";
import { Game, LinescoreByPeriod, LinescoreTotals } from "types/types";

import TableBody from "./TableBody";
import TableHeader from "./TableHeader";

export type LinescoreProps = {
  byPeriod: LinescoreByPeriod;
  totals: LinescoreTotals;
  awayTeamAbbrev: string;
  awayTeamLogo: string;
  homeTeamAbbrev: string;
  homeTeamLogo: string;
};

export default function Linescore() {
  const gameDataToRender = useRouteLoaderData("routes/game.$gameId") as Game;

  const {
    linescore: { byPeriod },
  } = gameDataToRender;

  return (
    <div className="flex w-full flex-col overflow-x-auto lg:w-96">
      <h3 className="font-bold">Linescore</h3>
      <table>
        <TableHeader byPeriod={byPeriod} />
        <TableBody />
      </table>
    </div>
  );
}
