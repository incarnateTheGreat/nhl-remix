import Player from "./Player";
import Scenario from "./Scenario";

import type { GoalsType, PeriodDescriptior } from "~/types";

type GoalsProps = {
  awayTeamAbbrev: string;
  homeTeamAbbrev: string;
  period: {
    periodDescriptor: PeriodDescriptior;
    goals: GoalsType[];
  };
};

export default function Goals({
  period,
  awayTeamAbbrev,
  homeTeamAbbrev,
}: GoalsProps) {
  if (period.goals.length === 0) {
    return "No scoring.";
  }

  return period.goals.map((goal) => {
    const { awayScore, homeScore } = goal;

    let scoreSituation = "";

    if (awayScore > homeScore) {
      scoreSituation = `${awayScore}-${homeScore} ${awayTeamAbbrev}`;
    } else if (homeScore > awayScore) {
      scoreSituation = `${homeScore}-${awayScore} ${homeTeamAbbrev}`;
    } else {
      scoreSituation = `${homeScore}-${awayScore} Tied`;
    }

    return (
      <div key={goal.playerId} className="mb-1 flex">
        <Player goal={goal} />

        <Scenario
          scoreSituation={scoreSituation}
          timeInPeriod={goal.timeInPeriod}
          shotType={goal.shotType}
        />
      </div>
    );
  });
}
