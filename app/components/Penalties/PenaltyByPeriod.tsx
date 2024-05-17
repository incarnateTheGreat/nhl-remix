import TableBody from "./TableBody";
import TableHeader from "./TableHeader";

import { PenaltiesType, PeriodDescriptior } from "~/types";

type PenaltyByPeriodProps = {
  periodPenalty: {
    periodDescriptor: PeriodDescriptior;
    penalties: PenaltiesType[];
  };
};

export default function PenaltyByPeriod({
  periodPenalty,
}: PenaltyByPeriodProps) {
  return (
    <table className="w-full">
      <TableHeader />
      <TableBody {...periodPenalty} />
    </table>
  );
}
