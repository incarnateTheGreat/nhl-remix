import goalieActiveGame from "./utils/Goalies/goalieActiveGame";
import goaliePreGame from "./utils/Goalies/goaliePreGame";
import BoxscoreTable from "./BoxscoreTable";

import { GameState, GoalieStats } from "types/types";
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
    initSortById = "toi",
    initSortDirection = "desc";

  if (isPreGame(gameState)) {
    columns = goaliePreGame;
    initSortById = "gamesPlayed";
    initSortDirection = "asc";
  } else {
    columns = goalieActiveGame;
  }

  return (
    <div className="overflow-x-auto overflow-y-hidden">
      <BoxscoreTable
        data={goaltenders}
        columns={columns}
        initSortById={initSortById}
        initSortDirection={initSortDirection}
      />
    </div>
  );
}
