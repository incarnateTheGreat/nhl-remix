import { LinescoreByPeriodObject, TeamGameStats } from "~/types";
import { handlePeriodLabel } from "~/utils";

type TableBodyProps = {
  shotsByPeriod: LinescoreByPeriodObject[];
  totalSOG?: TeamGameStats;
};

export default function TableBody({ shotsByPeriod, totalSOG }: TableBodyProps) {
  return (
    <tbody>
      {shotsByPeriod.map((period) => {
        const periodLabel = handlePeriodLabel(period.periodDescriptor);

        return (
          <tr
            key={period.periodDescriptor.number}
            className="border-b border-b-slate-200/90 odd:bg-slate-200/45"
          >
            <td className="p-2 text-center w-16 font-bold">{periodLabel}</td>
            <td className="p-2 text-center">{period.away}</td>
            <td className="p-2 text-center w-10">{period.home}</td>
          </tr>
        );
      })}
      <tr className="border-b border-b-slate-200/90 odd:bg-slate-200/45">
        <td className="p-2 text-center w-16 font-bold">Total</td>
        <td className="p-2 text-center">{totalSOG?.awayValue}</td>
        <td className="p-2 text-center w-10">{totalSOG?.homeValue}</td>
      </tr>
    </tbody>
  );
}
