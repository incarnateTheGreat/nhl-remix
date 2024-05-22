import { useRouteLoaderData } from "@remix-run/react";

import Player from "./Player";
import Scenario from "./Scenario";

import type { Game, GoalsType, PeriodDescriptior } from "~/types";

type GoalsProps = {
  period: {
    periodDescriptor: PeriodDescriptior;
    goals: GoalsType[];
  };
};

export default function Goals({ period }: GoalsProps) {
  const gameDataToRender = useRouteLoaderData("routes/game.$gameId") as Game;

  const { awayTeam, homeTeam } = gameDataToRender;

  if (period.goals.length === 0) {
    return "No scoring.";
  }

  return period.goals.map((goal) => {
    const { awayScore, homeScore } = goal;

    let scoreSituation = "";

    if (awayScore > homeScore) {
      scoreSituation = `${awayScore}-${homeScore} ${awayTeam.abbrev}`;
    } else if (homeScore > awayScore) {
      scoreSituation = `${homeScore}-${awayScore} ${homeTeam.abbrev}`;
    } else {
      scoreSituation = `${homeScore}-${awayScore} Tied`;
    }

    return (
      <div key={goal.timeInPeriod} className="mb-3 flex flex-col lg:flex-row">
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
