import { useLiveLoader } from "~/sse/use-live-loader";
import { handlePeriodLabel } from "~/utils";

import Shootout from "../Shootout";
import Goals from "./Goals";

export default function Scoring() {
  const gameDataToRender = useLiveLoader();

  const { awayTeam, homeTeam, summary } = gameDataToRender;

  const scoringNoShootout = summary?.scoring.filter(
    (period) => period.periodDescriptor.periodType !== "SO",
  );

  return (
    <div className="default_border flex flex-1 flex-col p-2">
      <h2 className="heading">Scoring</h2>
      {scoringNoShootout?.map((period) => {
        return (
          <div key={period.periodDescriptor.number} className="mb-4">
            <h2 className="mb-2 border-b border-gray-700 font-bold">
              {handlePeriodLabel(period.periodDescriptor)} Period
            </h2>
            <Goals period={period} />
          </div>
        );
      })}
      {summary?.shootout.length > 0 ? (
        <Shootout
          shootout={summary?.shootout}
          awayTeam={awayTeam}
          homeTeam={homeTeam}
        />
      ) : null}
    </div>
  );
}
