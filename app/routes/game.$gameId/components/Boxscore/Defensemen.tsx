import { GameState, SkaterStats } from "types/types";

import { isPreGame } from "~/utils";

import BoxscoreTable from "./BoxscoreTable";
import defensemenActiveGame from "./utils/Defensemen/defensemenActiveGame";
import defensemenPreGame from "./utils/Defensemen/defensemenPreGame";

type DefensemenProps = {
  defensemen: SkaterStats[];
  gameState: GameState;
};

export default function Defensemen({ defensemen, gameState }: DefensemenProps) {
  let columns,
    initSortById = "sweaterNumber";

  if (isPreGame(gameState)) {
    columns = defensemenPreGame;
    initSortById = "gamesPlayed";
  } else {
    initSortById = "points";
    columns = defensemenActiveGame;
  }

  return (
    <div className="overflow-x-auto overflow-y-hidden">
      <BoxscoreTable
        data={defensemen}
        columns={columns}
        initSortById={initSortById}
      />
    </div>
  );
}
