import { useRouteLoaderData } from "@remix-run/react";

import Tabs from "../Tabs";

import Defensemen from "./Defensemen";
import Forwards from "./Forwards";
import Goaltenders from "./Goaltenders";

import { Game } from "~/types";

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

export default function Boxscore() {
  const gameDataToRender = useRouteLoaderData("routes/game.$gameId") as Game;

  const { awayTeam, homeTeam, playerByGameStats } = gameDataToRender;

  tabData[0].title = awayTeam.name.default;
  tabData[0].component = () => {
    return (
      <>
        <Forwards forwards={playerByGameStats.awayTeam.forwards} />
        <Defensemen defensemen={playerByGameStats.awayTeam.defense} />
        <Goaltenders goaltenders={playerByGameStats.awayTeam.goalies} />
      </>
    );
  };

  tabData[1].title = homeTeam.name.default;
  tabData[1].component = () => {
    return (
      <>
        <Forwards forwards={playerByGameStats.homeTeam.forwards} />
        <Defensemen defensemen={playerByGameStats.homeTeam.defense} />
        <Goaltenders goaltenders={playerByGameStats.homeTeam.goalies} />
      </>
    );
  };

  return (
    <div className="my-2">
      <Tabs data={tabData} />
    </div>
  );
}
