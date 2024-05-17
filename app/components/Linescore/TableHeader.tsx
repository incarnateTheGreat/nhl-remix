import { LinescoreByPeriod } from "~/types";
import { handlePeriodLabel } from "~/utils";

type TableHeaderProps = {
  byPeriod: LinescoreByPeriod;
};

export default function TableHeader({ byPeriod }: TableHeaderProps) {
  // If multiple OT games are present, separate and keep the last one to display.
  const periodData = [...byPeriod].filter(
    (game) => game.periodDescriptor.periodType !== "OT",
  );
  const OTPeriods = [...byPeriod]
    .filter((game) => game.periodDescriptor.periodType === "OT")
    .pop();

  if (OTPeriods) {
    periodData.push(OTPeriods);
  }

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
              className="w-12 p-2 text-center"
            >
              {periodLabel}
            </th>
          );
        })}
        <th className="p-2 pr-4 text-center">T</th>
      </tr>
    </thead>
  );
}
