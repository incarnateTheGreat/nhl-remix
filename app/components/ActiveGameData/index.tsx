import Boxscore from "~/routes/game.$gameId/components/Boxscore";
import Penalties from "~/routes/game.$gameId/components/Penalties";
import GameInfo from "~/routes/game.$gameId/components/PreGameData/GameInfo";
import Scoring from "~/routes/game.$gameId/components/Scoring";
import SeasonSeries from "~/routes/game.$gameId/components/SeasonSeries";
import ShotsOnGoal from "~/routes/game.$gameId/components/ShotsOnGoal";

import GameStats from "../GameStats";
import Linescore from "../Linescore";
import Tabs from "../Tabs";

const tabData = [
  {
    id: 0,
    title: "Stats",
    component: () => <div />,
  },
  {
    id: 1,
    title: "Boxscore",
    component: () => <div />,
  },
];

export default function ActiveGameData() {
  tabData[0].component = () => (
    <div className="grid gap-y-2">
      <Scoring />
      <Penalties />
    </div>
  );

  tabData[1].component = () => {
    return <Boxscore />;
  };

  return (
    <div className="mt-2 flex flex-col xl:flex-row">
      <div className="flex-1">
        <Tabs data={tabData} />
      </div>

      <div className="flex flex-col xl:ml-4">
        <div className="default_border mt-2 grid grid-cols-1 gap-y-8 px-4 py-2 md:w-full xl:mt-[2.35rem] xl:w-96">
          <Linescore />
          <ShotsOnGoal />
          <GameStats />
          <SeasonSeries />
          <GameInfo />
        </div>
      </div>
    </div>
  );
}
