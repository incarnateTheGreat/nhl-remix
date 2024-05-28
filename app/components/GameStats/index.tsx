import { useRouteLoaderData } from "@remix-run/react";

import ListGaneStats from "./ListGameStats";

import { Game } from "~/types";
import { getLogo } from "~/utils";

export default function GameStats() {
  const gameDataToRender = useRouteLoaderData("routes/game.$gameId") as Game;

  const { awayTeam, homeTeam } = gameDataToRender;

  return (
    <div className="flex w-full flex-col overflow-x-auto border p-4 lg:w-96">
      <div className="flex justify-between">
        <img src={getLogo(awayTeam.abbrev)} alt={awayTeam.abbrev} width={50} />
        <h3 className="font-bold">Game Stats</h3>
        <img src={getLogo(homeTeam.abbrev)} alt={homeTeam.abbrev} width={50} />
      </div>
      <ListGaneStats />
    </div>
  );
}