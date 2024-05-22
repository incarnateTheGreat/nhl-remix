import { useRouteLoaderData } from "@remix-run/react";

import GameState from "./GameState";
import TeamHeader from "./TeamHeader";

import { Game } from "~/types";

export default function ScoreHeader() {
  const gameDataToRender = useRouteLoaderData("routes/game.$gameId") as Game;

  const {
    awayTeam,
    homeTeam,
    clock,
    periodDescriptor,
    gameState,
    startTimeUTC,
  } = gameDataToRender;

  return (
    <div className="flex flex-col items-start border border-slate-500 p-2 lg:flex-row lg:items-center">
      <TeamHeader team={awayTeam} homeAway="away" />
      <div className="order-1 ml-auto flex justify-end text-center lg:order-2 lg:w-2/12 lg:justify-center">
        <GameState
          clock={clock}
          periodDescriptor={periodDescriptor}
          gameState={gameState}
          startTimeUTC={startTimeUTC}
          classnames="flex flex-col"
        />
      </div>
      <TeamHeader team={homeTeam} homeAway="home" />
    </div>
  );
}
