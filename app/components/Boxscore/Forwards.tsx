import forwardActiveGame from "./utils/Forwards/forwardActiveGame";
import forwardPreGame from "./utils/Forwards/forwardPreGame";
import BoxscoreTable from "./BoxscoreTable";

import { GameState, SkaterStats } from "~/types";
import { isPreGame } from "~/utils";

type ForwardsProps = {
  forwards: SkaterStats[];
  gameState: GameState;
};

export default function Forwards({ forwards, gameState }: ForwardsProps) {
  let columns,
    initSortById = "sweaterNumber",
    initSortDirection = "asc";

  if (isPreGame(gameState)) {
    columns = forwardPreGame;
    initSortById = "gamesPlayed";
    initSortDirection = "desc";
  } else {
    columns = forwardActiveGame;
  }

  return (
    <div className="overflow-x-auto overflow-y-hidden">
      <BoxscoreTable
        data={forwards}
        columns={columns}
        initSortById={initSortById}
        initSortDirection={initSortDirection}
      />
    </div>
  );
}
