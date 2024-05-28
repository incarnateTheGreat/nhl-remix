import Boxscore from "../Boxscore";
import PlayersToWatch from "../PlayersToWatch";
import SeasonSeries from "../SeasonSeries";

import GameInfo from "./GameInfo";

export default function PreGameData() {
  return (
    <div className="mt-2 flex flex-col lg:flex-row">
      <div className="mr-2 flex-1 border border-slate-500 px-4 py-2">
        <PlayersToWatch />
        <div className="mt-4">
          <Boxscore />
        </div>
      </div>
      <div className="mt-2 flex w-full flex-col overflow-x-auto border border-slate-500 px-4 py-2 lg:mt-0 lg:w-96">
        <SeasonSeries />
        <GameInfo />
      </div>
    </div>
  );
}
