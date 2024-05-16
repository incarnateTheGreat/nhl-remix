import { LinescoreProps } from ".";

import { LinescoreByPeriodObject } from "~/types";
import { handlePeriodGoals } from "~/utils";

const renderPeriodData = (
  periodData: LinescoreByPeriodObject[],
  team: "home" | "away"
) => {
  return periodData.map((period) => {
    return (
      <td key={period.periodDescriptor.number} className="p-2 text-center w-10">
        {period[team]}
      </td>
    );
  });
};

type TableBodyProps = LinescoreProps;

export default function TableBody({
  byPeriod,
  totals,
  awayTeamAbbrev,
  awayTeamLogo,
  homeTeamAbbrev,
  homeTeamLogo,
}: TableBodyProps) {
  const periodData = handlePeriodGoals(byPeriod);

  return (
    <tbody>
      <tr className="bg-slate-200/45 border-b border-b-slate-200/90">
        <td className="p-2 text-center w-16">
          <img src={awayTeamLogo} alt={awayTeamAbbrev} />
        </td>
        <td className="p-2 text-center font-bold">{awayTeamAbbrev}</td>
        {renderPeriodData(periodData, "away")}
        <td className="p-2 text-center w-10 font-bold">{totals.away}</td>
      </tr>
      <tr>
        <td className="p-2 text-center w-16">
          <img src={homeTeamLogo} alt={homeTeamAbbrev} />
        </td>
        <td className="p-2 text-center font-bold">{homeTeamAbbrev}</td>
        {renderPeriodData(periodData, "home")}
        <td className="p-2 text-center font-bold w-10">{totals.home}</td>
      </tr>
    </tbody>
  );
}
