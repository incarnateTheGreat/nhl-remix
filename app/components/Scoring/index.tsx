import Goals from "./Goals";

import type { GoalsType, PeriodDescriptior } from "~/types";
import { PERIODS } from "~/utils";

type ScoringProps = {
  awayTeamAbbrev: string;
  homeTeamAbbrev: string;
  scoring: {
    periodDescriptor: PeriodDescriptior;
    goals: GoalsType[];
  }[];
};

export default function Scoring({
  awayTeamAbbrev,
  homeTeamAbbrev,
  scoring,
}: ScoringProps) {
  return (
    <div className="flex flex-1 flex-col">
      {scoring.map((period) => {
        return (
          <div
            key={period.periodDescriptor.number}
            className="mb-4 border border-gray-400 p-2"
          >
            <h2 className="mb-2 border-b border-gray-700 font-bold">
              {PERIODS[period.periodDescriptor.number]} Period
            </h2>
            <Goals
              awayTeamAbbrev={awayTeamAbbrev}
              homeTeamAbbrev={homeTeamAbbrev}
              period={period}
            />
          </div>
        );
      })}
    </div>
  );
}
