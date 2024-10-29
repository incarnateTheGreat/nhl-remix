import type { GoalsType } from "types/types";

import Assists from "./Assists";
import Goal from "./Goal";

type PlayerProps = {
  goal: GoalsType;
};

export default function Player({ goal }: PlayerProps) {
  const { headshot, firstName, lastName, teamAbbrev, assists } = goal;

  return (
    <div className="flex items-center">
      <img
        className="default_border rounded-full"
        src={headshot}
        width={50}
        alt={`${firstName.default} ${lastName.default}`}
      />
      <div className="mx-2 flex w-full flex-col">
        <Goal goal={goal} />
        <Assists teamAbbrev={teamAbbrev.default} assists={assists} />
      </div>
    </div>
  );
}
