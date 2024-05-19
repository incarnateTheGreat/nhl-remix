import Tabs from "../Tabs";

import Defensemen from "./Defensemen";
import Forwards from "./Forwards";
import Goaltenders from "./Goaltenders";

import { PlayerByGameStats } from "~/types";

const tabData = [
  {
    id: 0,
    title: "",
    component: () => <div />,
  },
  {
    id: 1,
    title: "",
    component: () => <div />,
  },
];

type BoxscoreProps = {
  data: PlayerByGameStats;
  awayTeamName: string;
  homeTeamName: string;
};

export default function Boxscore({
  data,
  awayTeamName,
  homeTeamName,
}: BoxscoreProps) {
  tabData[0].title = awayTeamName;
  tabData[0].component = () => {
    return (
      <>
        <Forwards forwards={data.awayTeam.forwards} />
        <Defensemen defensemen={data.awayTeam.defense} />
        <Goaltenders goaltenders={data.awayTeam.goalies} />
      </>
    );
  };

  tabData[1].title = homeTeamName;
  tabData[1].component = () => {
    return (
      <>
        <Forwards forwards={data.homeTeam.forwards} />
        <Defensemen defensemen={data.homeTeam.defense} />
        <Goaltenders goaltenders={data.homeTeam.goalies} />
      </>
    );
  };

  return (
    <div className="my-2">
      <Tabs data={tabData} />
    </div>
  );
}
