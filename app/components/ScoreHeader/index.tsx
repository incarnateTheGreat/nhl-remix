import { useRouteLoaderData } from "@remix-run/react";

import GameState from "./GameState";

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
      <div className="order-2 flex w-full items-center lg:order-1 lg:flex-1">
        <img
          src={awayTeam.logo}
          width={150}
          alt={`${awayTeam.placeName.default} ${awayTeam.name.default}`}
        />
        <div className="flex flex-col">
          <span className="text-md">{awayTeam.placeName.default}</span>
          <span className="text-xl font-bold">{awayTeam.name.default}</span>
          <span className="text-sm">SOG: {awayTeam.sog}</span>
        </div>
        <div className="ml-auto text-4xl font-bold">{awayTeam.score}</div>
      </div>
      <div className="order-1 ml-auto flex justify-end text-center lg:order-2 lg:w-2/12 lg:justify-center">
        <GameState
          clock={clock}
          periodDescriptor={periodDescriptor}
          gameState={gameState}
          startTimeUTC={startTimeUTC}
          classnames="flex flex-col"
        />
      </div>
      <div className="order-3 flex w-full items-center lg:flex-1 lg:flex-row lg:items-center">
        <div className="order-3 ml-auto text-4xl font-bold lg:order-1 lg:ml-0 lg:mr-auto">
          {homeTeam.score}
        </div>
        <div className="order-2 flex flex-col">
          <span className="text-md">{homeTeam.placeName.default}</span>
          <span className="text-xl font-bold">{homeTeam.name.default}</span>
          <span className="text-sm">SOG: {homeTeam.sog}</span>
        </div>
        <img
          className="order-1 lg:order-3"
          src={homeTeam.logo}
          width={150}
          alt={`${homeTeam.placeName.default} ${homeTeam.name.default}`}
        />
      </div>
    </div>
  );
}
