
import { useLiveLoader } from "~/sse/use-live-loader";

import ListGaneStats from "./ListGameStats";

export default function GameStats() {
  const gameDataToRender = useLiveLoader();

  const { awayTeam, homeTeam } = gameDataToRender;

  return (
    <div className="flex w-full flex-col overflow-x-auto">
      <div className="flex justify-between">
        <img src={awayTeam.logo} alt={awayTeam.abbrev} width={50} />
        <h3 className="font-bold">Game Stats</h3>
        <img src={homeTeam.logo} alt={homeTeam.abbrev} width={50} />
      </div>
      <ListGaneStats />
    </div>
  );
}
