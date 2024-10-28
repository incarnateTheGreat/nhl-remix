import { useRouteLoaderData } from "@remix-run/react";

import Goals from "./Goals";

import type { Game } from "types/types";
import { handlePeriodLabel } from "~/utils";
import Shootout from "../Shootout";

export default function Scoring() {
  const gameDataToRender = useRouteLoaderData("routes/game.$gameId") as Game;

  const {
    awayTeam,
    homeTeam,
    summary: { scoring, shootout },
  } = gameDataToRender;

  const scoringNoShootout = scoring.filter(
    (period) => period.periodDescriptor.periodType !== "SO",
  );

  return (
    <div className="flex flex-1 flex-col border p-2">
      <h2 className="heading">Scoring</h2>
      {scoringNoShootout.map((period) => {
        return (
          <div key={period.periodDescriptor.number} className="mb-4">
            <h2 className="mb-2 border-b border-gray-700 font-bold">
              {handlePeriodLabel(period.periodDescriptor)} Period
            </h2>
            <Goals period={period} />
          </div>
        );
      })}
      {shootout.length > 0 ? (
        <Shootout shootout={shootout} awayTeam={awayTeam} homeTeam={homeTeam} />
      ) : null}
    </div>
  );
}
