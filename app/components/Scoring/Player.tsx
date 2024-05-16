import Assists from "./Assists";
import Goal from "./Goal";

import { Goals } from "~/types";

type PlayerProps = {
  goal: Goals;
};

export default function Player({ goal }: PlayerProps) {
  return (
    <div className="flex w-80 flex-col justify-center">
      <Goal goal={goal} />
      <Assists assists={goal.assists} />
    </div>
  );
}
