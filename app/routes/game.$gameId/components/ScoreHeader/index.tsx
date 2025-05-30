import { useLiveLoader } from "~/sse/use-live-loader";

import GameState from "./GameState";
import TeamHeader from "./TeamHeader";

export default function ScoreHeader() {
  const gameDataToRender = useLiveLoader();

  const {
    awayTeam,
    homeTeam,
    clock,
    periodDescriptor,
    gameState,
    startTimeUTC,
    situation,
  } = gameDataToRender;

  const time = new Date(startTimeUTC).toLocaleString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div>
      <span className="text-sm font-bold">{time}</span>
      <div className="default_border mt-2 flex flex-col items-start p-2 lg:flex-row lg:items-center">
        <TeamHeader
          team={awayTeam}
          homeAway="awayTeam"
          gameState={gameState}
          situation={situation}
        />
        <div className="order-1 mb-2 flex w-full pl-1 lg:order-2 lg:mb-0 lg:ml-auto lg:w-2/12 lg:justify-center">
          <GameState
            clock={clock}
            periodDescriptor={periodDescriptor}
            gameState={gameState}
            startTimeUTC={startTimeUTC}
            classnames="flex text-center justify-between w-full lg:justify-normal lg:flex-col lg:w-auto"
            situation={situation}
          />
        </div>
        <TeamHeader
          team={homeTeam}
          homeAway="homeTeam"
          gameState={gameState}
          situation={situation}
        />
      </div>
    </div>
  );
}
