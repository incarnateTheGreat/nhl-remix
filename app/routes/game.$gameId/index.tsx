import { MetaFunction } from "@remix-run/node";
import { useParams } from "@remix-run/react";
import { useEventStream } from "@remix-sse/client";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import type { Game } from "types/types";

import getGameData from "~/api/getGemeData";
import ActiveGameData from "~/components/ActiveGameData";
import Loading from "~/components/Loading";
import { GameContext } from "~/context/game.context";
import { isGameActive, isGameComplete, isPreGame } from "~/utils";

import PreGameData from "./components/PreGameData";
import ScoreHeader from "./components/ScoreHeader";

type LoaderProps = {
  params: {
    gameId: string;
  };
};

export const meta: MetaFunction = (e) => {
  const { awayTeam, homeTeam, startTimeUTC } = e.data as Game;
  const date = format(startTimeUTC, "MMM d, yyyy");

  const title = `${awayTeam.placeName.default} ${awayTeam.name.default} vs. ${homeTeam.placeName.default} ${homeTeam.name.default} - ${date}`;

  return [
    {
      title,
    },
    {
      property: "og:title",
      content: title,
    },
    {
      name: "description",
      content: `This is the Game detail page for ${awayTeam.placeName.default} ${awayTeam.name.default} vs. ${homeTeam.placeName.default} ${homeTeam.name.default}`,
    },
  ];
};

export const loader = async ({ params }: LoaderProps) => {
  return getGameData(params.gameId);
};

export default function Game() {
  const { gameId } = useParams();
  const eventData = useEventStream(`/emitter/${gameId}`, {
    returnLatestOnly: true,
    deserialize: (raw) => JSON.parse(raw) as Game,
  });

  const [gameDataToRender, setGameDataToRender] = useState<Game>(eventData);

  useEffect(() => {
    setGameDataToRender(eventData);
  }, [eventData]);

  if (!gameDataToRender) {
    return <Loading />;
  }

  const { gameState } = gameDataToRender;

  return (
    <GameContext.Provider
      value={{
        gameDataToRender,
      }}
    >
      <div className="mx-auto flex w-full flex-col bg-white px-4 py-2">
        <ScoreHeader />

        {isPreGame(gameState) ? <PreGameData /> : null}

        {isGameActive(gameState) || isGameComplete(gameState) ? (
          <ActiveGameData />
        ) : null}
      </div>
    </GameContext.Provider>
  );
}
