import Assists from "./Assists";
import Goal from "./Goal";

import type { GoalsType } from "~/types";

type PlayerProps = {
  goal: GoalsType;
};

export default function Player({ goal }: PlayerProps) {
  return (
    <div className="flex items-center">
      <img
        className="rounded-full border border-slate-400"
        src={goal.headshot}
        width={50}
        alt={`${goal.firstName.default} ${goal.lastName.default}`}
      />
      <div className="ml-2 flex w-80 flex-col">
        <Goal goal={goal} />
        <Assists teamAbbrev={goal.teamAbbrev.default} assists={goal.assists} />
      </div>
    </div>
  );
}
