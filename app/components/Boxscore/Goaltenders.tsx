import goalieActiveGame from "./utils/Goalies/goalieActiveGame";
import goaliePreGame from "./utils/Goalies/goaliePreGame";
import BoxscoreTable from "./BoxscoreTable";

import { GameState, GoalieStats } from "~/types";
import { isPreGame } from "~/utils";

type GoaltendersProps = {
  goaltenders: GoalieStats[];
  gameState: GameState;
};

export default function Goaltenders({
  goaltenders,
  gameState,
}: GoaltendersProps) {
  let columns,
    initSortById = "toi";

  if (isPreGame(gameState)) {
    columns = goaliePreGame;
    initSortById = "gamesPlayed";
  } else {
    columns = goalieActiveGame;
  }

  return (
    <div className="overflow-x-auto overflow-y-hidden">
      <BoxscoreTable
        data={goaltenders}
        columns={columns}
        initSortById={initSortById}
      />
    </div>
  );
}
