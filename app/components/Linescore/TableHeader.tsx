import { LinescoreByPeriod } from "~/types";
import { handlePeriodGoals, handlePeriodLabel } from "~/utils";

type TableHeaderProps = {
  byPeriod: LinescoreByPeriod;
};

export default function TableHeader({ byPeriod }: TableHeaderProps) {
  const periodData = [...handlePeriodGoals(byPeriod)].filter(
    (period) => period.periodDescriptor.periodType !== "SO",
  );

  return (
    <thead>
      <tr>
        <th>&nbsp;</th>
        <th>&nbsp;</th>
        {periodData.map((period) => {
          const periodLabel = handlePeriodLabel(period.periodDescriptor);

          return (
            <th
              key={period.periodDescriptor.number}
              className="w-12 p-2 text-center text-sm"
            >
              {periodLabel}
            </th>
          );
        })}
        <th className="p-2 pr-4 text-center text-sm">T</th>
      </tr>
    </thead>
  );
}
