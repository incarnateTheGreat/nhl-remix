import Boxscore from "../Boxscore";
import Linescore from "../Linescore";
import Penalties from "../Penalties";
import Scoring from "../Scoring";
import ShotsOnGoal from "../ShotsOnGoal";
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
    <div className="p-2">
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

      <div className="mt-1 lg:ml-2 lg:mt-0">
        <Linescore />

        <div className="mt-1">
          <ShotsOnGoal />
        </div>
      </div>
    </div>
  );
}
