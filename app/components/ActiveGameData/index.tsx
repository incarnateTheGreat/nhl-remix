import GameStats from "../GameStats";
import Linescore from "../Linescore";
import Tabs from "../Tabs";

import Boxscore from "~/routes/game.$gameId/components/Boxscore";
import Penalties from "~/routes/game.$gameId/components/Penalties";
import Scoring from "~/routes/game.$gameId/components/Scoring";
import SeasonSeries from "~/routes/game.$gameId/components/SeasonSeries";
import ShotsOnGoal from "~/routes/game.$gameId/components/ShotsOnGoal";

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
    <div className="mt-4">
      <Scoring />
      <div className="mt-1">
        <Penalties />
      </div>
    </div>
  );

  tabData[1].component = () => {
    return (
      <div className="mt-4">
        <Boxscore />
      </div>
    );
  };

  return (
    <div className="mt-2 flex flex-col lg:flex-row">
      <div className="flex-1">
        <div>
          <Tabs data={tabData} />
        </div>
      </div>

      <div className="flex flex-col lg:ml-4">
        <div className="default_border mt-2 grid w-full grid-cols-1 gap-y-8 px-4 py-2">
          <Linescore />
          <ShotsOnGoal />
          <GameStats />
          <SeasonSeries />
        </div>
      </div>
    </div>
  );
}
