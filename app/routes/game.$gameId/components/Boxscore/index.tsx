import { useRouteLoaderData } from "@remix-run/react";

import Defensemen from "./Defensemen";
import Forwards from "./Forwards";
import Goaltenders from "./Goaltenders";
import { preGameData, reorderGoalies } from "./utils";

import Tabs from "~/components/Tabs";
import { Game, PlayerByGameStats } from "~/types";
import { isPreGame } from "~/utils";

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

  const { awayTeam, homeTeam, gameState } = gameDataToRender;

  let playersData: PlayerByGameStats;

  if (isPreGame(gameState)) {
    const awayTeamId = awayTeam.id;
    const homeTeamId = homeTeam.id;

    playersData = preGameData(gameDataToRender, awayTeamId, homeTeamId);
  } else {
    const { playerByGameStats } = gameDataToRender;

    playersData = playerByGameStats;

    playersData.awayTeam.goalies = reorderGoalies(playersData.awayTeam.goalies);
    playersData.homeTeam.goalies = reorderGoalies(playersData.homeTeam.goalies);
  }

  tabData[0].title = awayTeam.name.default;
  tabData[0].component = () => {
    return (
      <>
        <Forwards
          forwards={playersData.awayTeam.forwards}
          gameState={gameState}
        />
        <Defensemen
          defensemen={playersData.awayTeam.defense}
          gameState={gameState}
        />
        <Goaltenders
          goaltenders={playersData.awayTeam.goalies}
          gameState={gameState}
        />
      </>
    );
  };

  tabData[1].title = homeTeam.name.default;
  tabData[1].component = () => {
    return (
      <>
        <Forwards
          forwards={playersData.homeTeam.forwards}
          gameState={gameState}
        />
        <Defensemen
          defensemen={playersData.homeTeam.defense}
          gameState={gameState}
        />
        <Goaltenders
          goaltenders={playersData.homeTeam.goalies}
          gameState={gameState}
        />
      </>
    );
  };

  return (
    <div className="my-2">
      <Tabs data={tabData} />
    </div>
  );
}
