import LineScoreRow from "./LinescoreRow";
import { LinescoreProps } from ".";

import { handlePeriodGoals } from "~/utils";

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
        homeAway="away"
      />
      <LineScoreRow
        logo={homeTeamLogo}
        teamAbbrev={homeTeamAbbrev}
        periodData={periodData}
        totals={totals.home}
        homeAway="home"
      />
    </tbody>
  );
}
