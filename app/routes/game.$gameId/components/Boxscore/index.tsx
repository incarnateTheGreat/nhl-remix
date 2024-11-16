import { Game, PlayerByGameStats } from "types/types";

import Tabs from "~/components/Tabs";
import { useLiveLoader } from "~/sse/use-live-loader";
import { cn, isGameComplete, isPreGame } from "~/utils";

import Defensemen from "./Defensemen";
import Forwards from "./Forwards";
import Goaltenders from "./Goaltenders";
import { preGameData, reorderGoalies } from "./utils";

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
  const gameDataToRender = useLiveLoader() as Game;

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
    <div
      className={cn("my-2", {
        "default_border p-2": isGameComplete(gameState),
      })}
    >
      <Tabs data={tabData} />
    </div>
  );
}
