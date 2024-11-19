import { useLiveLoader } from "~/hooks/useLiveLoader";
import { handlePeriodGoals } from "~/utils";

import LineScoreRow from "./LinescoreRow";

export default function TableBody() {
  const gameDataToRender = useLiveLoader();

  const {
    awayTeam,
    homeTeam,
    linescore: { byPeriod, totals },
  } = gameDataToRender;

  const periodData = [...handlePeriodGoals(byPeriod)].filter(
    (period) => period.periodDescriptor.periodType !== "SO",
  );

  return (
    <tbody>
      <LineScoreRow
        logo={awayTeam.logo}
        teamAbbrev={awayTeam.abbrev}
        periodData={periodData}
        totals={totals.away}
        homeAway="away"
      />
      <LineScoreRow
        logo={homeTeam.logo}
        teamAbbrev={homeTeam.abbrev}
        periodData={periodData}
        totals={totals.home}
        homeAway="home"
      />
    </tbody>
  );
}
