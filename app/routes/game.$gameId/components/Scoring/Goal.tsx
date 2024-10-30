import { GoalsType } from "types/types";

import { GOAL_MODIFIER } from "~/utils";

type GoalProps = {
  goal: GoalsType;
};

export default function Goal({ goal }: GoalProps) {
  let goal_modifier;

  if (goal.strength in GOAL_MODIFIER) {
    goal_modifier = GOAL_MODIFIER[goal.strength];
  } else if (goal.goalModifier in GOAL_MODIFIER) {
    goal_modifier = GOAL_MODIFIER[goal.goalModifier];
  }

  return (
    <div className="flex items-center">
      <span className="text-sm font-semibold">
        {goal.firstName.default} {goal.lastName.default}
      </span>
      <span className="ml-1 font-semibold">({goal.goalsToDate})</span>
      <span className="flex">
        {goal_modifier ? (
          <span className="ml-2 flex h-5 min-w-[30px] items-center justify-center rounded bg-red-600 px-1 text-[10px] font-semibold uppercase text-white">
            {goal_modifier}
          </span>
        ) : null}
      </span>
    </div>
  );
}
