import defensemenActiveGame from "./utils/Defensemen/defensemenActiveGame";
import defensemenPreGame from "./utils/Defensemen/defensemenPreGame";
import BoxscoreTable from "./BoxscoreTable";

import { GameState, SkaterStats } from "~/types";
import { isPreGame } from "~/utils";

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
    columns = defensemenActiveGame;
  }

  return (
    <div className="overflow-x-auto overflow-y-hidden">
      <BoxscoreTable
        data={defensemen}
        columns={columns}
        initSortById={initSortById}
        initSortDirection="asc"
      />
    </div>
  );
}
