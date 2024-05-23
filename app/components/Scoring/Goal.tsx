import { GoalsType } from "~/types";
import { GOALMODIFIER } from "~/utils";

type GoalProps = {
  goal: GoalsType;
};

export default function Goal({ goal }: GoalProps) {
  return (
    <div className="flex items-center">
      <span className="font-semibold">
        {goal.firstName.default} {goal.lastName.default}
      </span>
      <span className="ml-1 font-semibold">({goal.goalsToDate})</span>
      <span className="flex">
        {goal.strength in GOALMODIFIER ? (
          <span className="ml-2 flex h-5 items-center rounded bg-red-600 px-1 text-[8px] font-bold uppercase text-white">
            {GOALMODIFIER[goal.strength]}
          </span>
        ) : null}
      </span>
    </div>
  );
}
