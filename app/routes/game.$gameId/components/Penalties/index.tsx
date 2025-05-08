import { useLiveLoader } from "~/sse/use-live-loader";
import { getRandomKey, handlePeriodLabel } from "~/utils";

import PenaltyByPeriod from "./PenaltyByPeriod";

export default function Penalties() {
  const gameDataToRender = useLiveLoader();

  return (
    <div className="default_border flex flex-1 flex-col p-2 text-sm">
      <h2 className="heading">Penalties</h2>
      {gameDataToRender?.summary?.penalties?.map((periodPenalty) => {
        return (
          <div key={getRandomKey()} className="mb-4 flex flex-col">
            <h2 className="border-b border-gray-700 font-bold">
              {handlePeriodLabel(periodPenalty.periodDescriptor)} Period
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
