import Boxscore from "../Boxscore";
import Last10Games from "../Last10Games";
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
      <div className="flex flex-col">
        <div className="default_border mt-2 grid w-full grid-cols-1 gap-y-8 overflow-x-auto px-4 py-2 lg:mt-0 lg:w-96">
          <SeasonSeries />
          <TeamStats />
          <GameInfo />
          <Last10Games />
        </div>
      </div>
    </div>
  );
}
