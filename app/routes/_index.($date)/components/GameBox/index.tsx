import { Link } from "@remix-run/react";

import TeamRow from "../TeamRow";

import RoundStatus from "./RoundStatus";

import GameState from "~/routes/game.$gameId/components/ScoreHeader/GameState";
import { GameBoxType } from "~/types";

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
      className="mb-4 mr-2.5 cursor-pointer rounded border border-gray-300 p-4 transition-all hover:border-gray-800"
      to={`/game/${id}`}
    >
      {gameType === 3 ? <RoundStatus seriesStatus={game.seriesStatus} /> : null}

      <div className="my-2 text-sm">
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
