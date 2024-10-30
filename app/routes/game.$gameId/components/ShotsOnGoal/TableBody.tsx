import { LinescoreByPeriodObject, TeamGameStats } from "types/types";

import { handlePeriodLabel } from "~/utils";

type TableBodyProps = {
  shotsByPeriod: LinescoreByPeriodObject[];
  totalSOG?: TeamGameStats;
};

export default function TableBody({ shotsByPeriod, totalSOG }: TableBodyProps) {
  const shotsByPeriodNoShootout = shotsByPeriod.filter(
    (period) => period.periodDescriptor.periodType !== "SO",
  );

  return (
    <tbody>
      {shotsByPeriodNoShootout.map((period) => {
        const periodLabel = handlePeriodLabel(period.periodDescriptor);

        return (
          <tr
            key={period.periodDescriptor.number}
            className="border-b border-b-slate-200/90 text-sm odd:bg-slate-200/45"
          >
            <td className="w-16 p-2 text-center font-bold">{periodLabel}</td>
            <td className="p-2 text-center">{period.away}</td>
            <td className="w-10 p-2 text-center">{period.home}</td>
          </tr>
        );
      })}
      <tr className="border-b border-b-slate-200/90 text-sm odd:bg-slate-200/45">
        <td className="w-16 p-2 text-center font-bold">Total</td>
        <td className="p-2 text-center">{totalSOG?.awayValue}</td>
        <td className="w-10 p-2 text-center">{totalSOG?.homeValue}</td>
      </tr>
    </tbody>
  );
}
