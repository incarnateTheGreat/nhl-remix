import { useRouteLoaderData } from "@remix-run/react";
import type { Game, SeasonSeries } from "types/types";

import SeriesGameBox from "./SeriesGameBox";

export default function SeasonSeries() {
  const gameDataToRender = useRouteLoaderData("routes/game.$gameId") as Game;

  let seasonSeriesData: SeasonSeries[] = [];

  const { seasonSeries } = gameDataToRender;

  seasonSeriesData = seasonSeries;

  return (
    <div className="flex flex-col">
      <h2 className="text-base font-bold">Series History</h2>
      <div className="mt-4 grid grid-cols-2 gap-1">
        {seasonSeriesData.map((game) => {
          return <SeriesGameBox key={game.id} game={game} />;
        })}
      </div>
    </div>
  );
}
