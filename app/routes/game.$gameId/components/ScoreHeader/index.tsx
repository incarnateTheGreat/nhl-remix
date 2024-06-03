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

  const time = new Date(startTimeUTC).toLocaleString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div>
      <span className="font-bold">{time}</span>
      <div className="default_border mt-2 flex flex-col items-start p-2 lg:flex-row lg:items-center">
        <TeamHeader team={awayTeam} homeAway="away" gameState={gameState} />
        <div className="order-1 ml-auto flex w-full justify-end lg:order-2 lg:w-2/12 lg:justify-center">
          <GameState
            clock={clock}
            periodDescriptor={periodDescriptor}
            gameState={gameState}
            startTimeUTC={startTimeUTC}
            classnames="flex flex-col text-center"
          />
        </div>
        <TeamHeader team={homeTeam} homeAway="home" gameState={gameState} />
      </div>
    </div>
  );
}
