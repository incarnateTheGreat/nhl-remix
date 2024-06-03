import Boxscore from "../Boxscore";
import PlayersToWatch from "../PlayersToWatch";
import SeasonSeries from "../SeasonSeries";
import TeamStats from "../TeamStats";

import GameInfo from "./GameInfo";

export default function PreGameData() {
  return (
    <div className="mt-2 flex flex-col lg:flex-row">
      <div className="default_border mr-2 flex-1 px-4 py-2">
        <PlayersToWatch />
        <div className="mt-4">
          <Boxscore />
        </div>
      </div>
      <div className="default_border mt-2 flex w-full flex-col overflow-x-auto px-4 py-2 lg:mt-0 lg:w-96">
        <SeasonSeries />
        <div className="my-4">
          <TeamStats />
        </div>
        <div className="mt-4">
          <GameInfo />
        </div>
      </div>
    </div>
  );
}
