import { useRouteLoaderData } from "@remix-run/react";

import SeriesGameBox from "./SeriesGameBox";

import { Game } from "~/types";

export default function SeasonSeries() {
  const gameDataToRender = useRouteLoaderData("routes/game.$gameId") as Game;

  const {
    matchup: { seasonSeries },
  } = gameDataToRender;

  return (
    <div className="flex flex-col">
      <h2 className="heading">Series History</h2>
      <div className="grid grid-cols-2 gap-3">
        {seasonSeries.map((game) => {
          return <SeriesGameBox key={game.id} game={game} />;
        })}
      </div>
    </div>
  );
}
