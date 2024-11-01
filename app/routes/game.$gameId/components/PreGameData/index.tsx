import Boxscore from "../Boxscore";
import Last10Games from "../Last10Games";
import SeasonSeries from "../SeasonSeries";
import TeamStats from "../TeamStats";
import GameInfo from "./GameInfo";

export default function PreGameData() {
  return (
    <div className="mt-2 flex flex-col lg:flex-row">
      <div className="default_border mr-2 w-full flex-1 px-4 py-2 lg:w-8/12">
        <Boxscore />
      </div>
      <div className="flex w-full flex-col lg:w-4/12">
        <div className="default_border mt-2 grid w-full grid-cols-1 gap-y-8 overflow-x-auto px-4 py-2 lg:mt-0">
          <SeasonSeries />
          <TeamStats />
          <GameInfo />
          <Last10Games />
        </div>
      </div>
    </div>
  );
}
