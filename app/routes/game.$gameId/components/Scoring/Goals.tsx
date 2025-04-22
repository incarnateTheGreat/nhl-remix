import type { GoalsType, PeriodDescriptior } from "types/types";

import { useLiveLoader } from "~/sse/use-live-loader";

import GoalContainer from "./GoalContainer";

type GoalsProps = {
  period: {
    periodDescriptor: PeriodDescriptior;
    goals: GoalsType[];
  };
};

export default function Goals({ period }: GoalsProps) {
  const gameDataToRender = useLiveLoader();

  const { awayTeam, homeTeam } = gameDataToRender;

  if (period.goals.length === 0) {
    return <span className="text-sm">No scoring.</span>;
  }

  return period.goals.map((goal) => {
    return (
      <GoalContainer
        key={goal.eventId}
        goal={goal}
        awayTeam={awayTeam}
        homeTeam={homeTeam}
      />
    );
  });
}
