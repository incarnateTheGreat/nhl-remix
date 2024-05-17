import PenaltyByPeriod from "./PenaltyByPeriod";

import { PenaltiesType, PeriodDescriptior } from "~/types";
import { PERIODS } from "~/utils";

type PenaltiesProps = {
  penalties: {
    periodDescriptor: PeriodDescriptior;
    penalties: PenaltiesType[];
  }[];
};

export default function Penalties({ penalties }: PenaltiesProps) {
  return (
    <div className="flex flex-1 flex-col border p-2">
      <h2 className="mb-4 text-2xl font-semibold">Penalties</h2>
      {penalties.map((periodPenalty, idx) => {
        return (
          <div key={idx} className="mb-4">
            <h2 className="mb-2 border-b border-gray-700 font-bold">
              {PERIODS[periodPenalty.periodDescriptor.number]} Period
            </h2>
            <PenaltyByPeriod periodPenalty={periodPenalty} />
          </div>
        );
      })}
    </div>
  );
}
