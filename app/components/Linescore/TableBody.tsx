import { LinescoreProps } from ".";

import { LinescoreByPeriodObject } from "~/types";
import { handlePeriodGoals } from "~/utils";

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
};

const LineScoreRow = ({
  logo,
  teamAbbrev,
  periodData,
  totals,
}: LineScoreRowProps) => {
  return (
    <tr className="border-b border-b-slate-200/90 odd:bg-slate-200/45">
      <td className="w-16 p-2 text-center">
        <img src={logo} alt={teamAbbrev} />
      </td>
      <td className="p-2 font-bold">{teamAbbrev}</td>
      {renderPeriodData(periodData, "away")}
      <td className="w-10 p-2 pr-4 text-center font-bold">{totals}</td>
    </tr>
  );
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
      <LineScoreRow
        logo={awayTeamLogo}
        teamAbbrev={awayTeamAbbrev}
        periodData={periodData}
        totals={totals.away}
      />
      <LineScoreRow
        logo={homeTeamLogo}
        teamAbbrev={homeTeamAbbrev}
        periodData={periodData}
        totals={totals.home}
      />
    </tbody>
  );
}
