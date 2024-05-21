import { LinescoreByPeriodObject } from "~/types";

const renderPeriodData = (
  periodData: LinescoreByPeriodObject[],
  team: "home" | "away",
) => {
  return periodData.map((period) => {
    return (
      <td key={period.periodDescriptor.number} className="w-10 p-2 text-center">
        {period[team]}
      </td>
    );
  });
};

type LineScoreRowProps = {
  logo: string;
  teamAbbrev: string;
  periodData: LinescoreByPeriodObject[];
  totals: number;
  homeAway: "home" | "away";
};

export default function LineScoreRow({
  logo,
  teamAbbrev,
  periodData,
  totals,
  homeAway,
}: LineScoreRowProps) {
  return (
    <tr className="border-b border-b-slate-200/90 odd:bg-slate-200/45">
      <td className="w-16 p-2 text-center">
        <img src={logo} alt={teamAbbrev} />
      </td>
      <td className="p-2 font-bold">{teamAbbrev}</td>
      {renderPeriodData(periodData, homeAway)}
      <td className="w-10 p-2 pr-4 text-center font-bold">{totals}</td>
    </tr>
  );
}
