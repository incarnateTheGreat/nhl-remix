import type { SeasonSeries } from "types/types";

import { useLiveLoader } from "~/hooks/useLiveLoader";

import SeriesGameBox from "./SeriesGameBox";

export default function SeasonSeries() {
  const gameDataToRender = useLiveLoader();

  let seasonSeriesData: SeasonSeries[] = [];

  const { seasonSeries } = gameDataToRender;

  seasonSeriesData = seasonSeries;

  return (
    <div className="flex flex-col">
      <h2 className="text-base font-bold">Season Series</h2>
      <div className="mt-4 grid grid-cols-2 gap-1 md:grid-cols-3 lg:grid-cols-2">
        {seasonSeriesData.map((game) => {
          return <SeriesGameBox key={game.id} game={game} />;
        })}
      </div>
    </div>
  );
}
