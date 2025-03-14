import { Link } from "@remix-run/react";
import { GameBoxType } from "types/types";

import GameState from "~/routes/game.$gameId/components/ScoreHeader/GameState";

import TeamRow from "../TeamRow";
import RoundStatus from "./RoundStatus";

type GameBoxProps = {
  game: GameBoxType;
};

export default function GameBox({ game }: GameBoxProps) {
  const {
    id,
    awayTeam,
    homeTeam,
    startTimeUTC,
    gameState,
    periodDescriptor,
    clock,
    gameType,
  } = game;

  return (
    <Link
      prefetch="intent"
      className="cursor-pointer rounded border border-gray-300 p-3 transition-all hover:border-gray-800"
      to={`/game/${id}`}
    >
      {gameType === 3 ? <RoundStatus seriesStatus={game.seriesStatus} /> : null}

      <div className="text-sm">
        <GameState
          clock={clock}
          periodDescriptor={periodDescriptor}
          gameState={gameState}
          startTimeUTC={startTimeUTC}
          classnames="flex justify-between items-center"
        />
      </div>
      <div className="mt-3">
        <TeamRow team={awayTeam} gameState={gameState} />
        <TeamRow team={homeTeam} gameState={gameState} />
      </div>
    </Link>
  );
}
