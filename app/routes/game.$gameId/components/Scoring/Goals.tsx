import type { Game, GoalsType, PeriodDescriptior } from "types/types";

import { useLiveLoader } from "~/sse/use-live-loader";
import { getRandomKey } from "~/utils";

import GoalContainer from "./GoalContainer";

type GoalsProps = {
  period: {
    periodDescriptor: PeriodDescriptior;
    goals: GoalsType[];
  };
};

export default function Goals({ period }: GoalsProps) {
  const gameDataToRender = useLiveLoader() as Game;

  const { awayTeam, homeTeam } = gameDataToRender;

  if (period.goals.length === 0) {
    return "No scoring.";
  }

  return period.goals.map((goal) => (
    <GoalContainer
      key={getRandomKey()}
      goal={goal}
      awayTeam={awayTeam}
      homeTeam={homeTeam}
    />
  ));
}
