import { useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Game, Summary } from "types/types";

import Boxscore from "~/routes/game.$gameId/components/Boxscore";
import Highlights from "~/routes/game.$gameId/components/Highlights";
import Penalties from "~/routes/game.$gameId/components/Penalties";
import GameInfo from "~/routes/game.$gameId/components/PreGameData/GameInfo";
import Scoring from "~/routes/game.$gameId/components/Scoring";
import SeasonSeries from "~/routes/game.$gameId/components/SeasonSeries";
import ShotsOnGoal from "~/routes/game.$gameId/components/ShotsOnGoal";

import GameStats from "../GameStats";
import Linescore from "../Linescore";
import Tabs from "../Tabs";

type TabsData = {
  id: number;
  title: string;
  component: () => void;
};

const initTabsData = [
  {
    id: 0,
    title: "Stats",
    component: () => (
      <div className="grid gap-y-2">
        <Scoring />
        <Penalties />
      </div>
    ),
  },
  {
    id: 1,
    title: "Boxscore",
    component: () => <Boxscore />,
  },
];

export default function ActiveGameData() {
  const data = useLoaderData<Game & Summary>();
  const [tabsData, setTabsData] = useState<TabsData[]>(initTabsData);

  useEffect(() => {
    if (data?.gameVideo) {
      setTabsData([
        ...tabsData,
        {
          id: 2,
          title: "Highlights",
          component: () => <Highlights />,
        },
      ]);
    }
  }, []);

  return (
    <div className="mt-2 flex flex-col xl:flex-row">
      <div className="flex-1">
        <Tabs data={tabsData} />
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
