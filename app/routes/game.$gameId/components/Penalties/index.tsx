import { useRouteLoaderData } from "@remix-run/react";
import { Game } from "types/types";

import { PERIODS } from "~/utils";

import PenaltyByPeriod from "./PenaltyByPeriod";

export default function Penalties() {
  const gameDataToRender = useRouteLoaderData("routes/game.$gameId") as Game;

  const {
    summary: { penalties },
  } = gameDataToRender;

  return (
    <div className="flex flex-1 flex-col border p-2 text-sm">
      <h2 className="heading">Penalties</h2>
      {penalties.map((periodPenalty, idx) => {
        return (
          <div key={idx} className="mb-4 flex flex-col">
            <h2 className="border-b border-gray-700 font-bold">
              {PERIODS[periodPenalty.periodDescriptor.number]} Period
            </h2>
            {periodPenalty.penalties.length > 0 ? (
              <PenaltyByPeriod periodPenalty={periodPenalty} />
            ) : (
              <span className="py-1">No penalties</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
