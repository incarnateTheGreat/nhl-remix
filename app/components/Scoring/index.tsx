import { useRouteLoaderData } from "@remix-run/react";

import Goals from "./Goals";

import type { Game } from "~/types";
import { handlePeriodLabel } from "~/utils";

export default function Scoring() {
  const gameDataToRender = useRouteLoaderData("routes/game.$gameId") as Game;

  const {
    summary: { scoring },
  } = gameDataToRender;

  return (
    <div className="flex flex-1 flex-col border p-2">
      <h2 className="mb-4 text-2xl font-semibold">Scoring</h2>
      {scoring.map((period) => {
        return (
          <div key={period.periodDescriptor.number} className="mb-4">
            <h2 className="mb-2 border-b border-gray-700 font-bold">
              {handlePeriodLabel(period.periodDescriptor)} Period
            </h2>
            <Goals period={period} />
          </div>
        );
      })}
    </div>
  );
}
