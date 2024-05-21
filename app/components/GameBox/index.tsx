import { Link } from "@remix-run/react";

import GameState from "../ScoreHeader/GameState";
import TeamRow from "../TeamRow";

import { GameBoxType } from "~/types";

type GameBoxProps = {
  game: GameBoxType;
};

export default function GameBox({ game }: GameBoxProps) {
  const {
    id,
    seriesStatus,
    awayTeam,
    homeTeam,
    startTimeUTC,
    gameState,
    periodDescriptor,
    clock,
  } = game;

  const {
    round,
    gameNumberOfSeries,
    topSeedTeamAbbrev,
    topSeedWins,
    neededToWin,
    bottomSeedTeamAbbrev,
    bottomSeedWins,
  } = seriesStatus;

  const roundStatus = () => {
    if (bottomSeedWins === neededToWin || topSeedWins === neededToWin) {
      if (bottomSeedWins > topSeedWins) {
        return `${bottomSeedTeamAbbrev} wins ${bottomSeedWins}-${topSeedWins}`;
      } else if (topSeedWins > bottomSeedWins) {
        return `${topSeedTeamAbbrev} wins ${topSeedWins}-${bottomSeedWins}`;
      }
    }

    if (bottomSeedWins > topSeedWins) {
      return `${bottomSeedTeamAbbrev} leads ${bottomSeedWins}-${topSeedWins}`;
    } else if (topSeedWins > bottomSeedWins) {
      return `${topSeedTeamAbbrev} leads ${topSeedWins}-${bottomSeedWins}`;
    }

    return `Series tied ${bottomSeedWins}-${topSeedWins}`;
  };

  return (
    <Link
      className="mb-4 mr-2.5 cursor-pointer rounded-sm border border-gray-300 p-4 transition-all hover:border-gray-800 md:w-80"
      to={`/game/${id}`}
    >
      <div>
        <div>{`Round ${round}, Gm ${gameNumberOfSeries}`}</div>
        {roundStatus()}
      </div>
      <div className="my-2 text-sm">
        <GameState
          clock={clock}
          periodDescriptor={periodDescriptor}
          gameState={gameState}
          startTimeUTC={startTimeUTC}
          classnames="w-[90px] flex justify-between items-center"
        />
      </div>
      <div className="mt-3">
        <TeamRow team={awayTeam} gameState={gameState} />
        <TeamRow team={homeTeam} gameState={gameState} />
      </div>
    </Link>
  );
}
