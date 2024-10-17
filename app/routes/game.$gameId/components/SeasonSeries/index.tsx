import { useRouteLoaderData } from "@remix-run/react";

import SeriesGameBox from "./SeriesGameBox";

import type { Game, SeasonSeries } from "~/types";
import { isPreGame } from "~/utils";

export default function SeasonSeries() {
  const gameDataToRender = useRouteLoaderData("routes/game.$gameId") as Game;

  const { gameState } = gameDataToRender;

  let seasonSeriesData: SeasonSeries[] = [];

  if (isPreGame(gameState)) {
    const {
      matchup: { seasonSeries },
    } = gameDataToRender;

    seasonSeriesData = seasonSeries;
  } else {
    const { seasonSeries } = gameDataToRender;

    seasonSeriesData = seasonSeries;
  }

  return (
    <div className="flex flex-col">
      <h2 className="heading">Series History</h2>
      <div className="grid grid-cols-2 gap-3">
        {seasonSeriesData.map((game) => {
          return <SeriesGameBox key={game.id} game={game} />;
        })}
      </div>
    </div>
  );
}
