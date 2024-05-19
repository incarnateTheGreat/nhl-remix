import { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { format } from "date-fns";

import ActiveGameData from "~/components/ActiveGameData";
import ScoreHeader from "~/components/ScoreHeader";
import type { Game } from "~/types";
import { deepMerge, isGameActive, isGameComplete } from "~/utils";

type LoaderProps = {
  params: {
    gameId: string;
  };
};

export const meta: MetaFunction = (e) => {
  const { awayTeam, homeTeam, startTimeUTC } = e.data as Game;
  const date = format(startTimeUTC, "MMM d, yyyy");

  const title = `${awayTeam.placeName.default} ${awayTeam.name.default} - ${homeTeam.placeName.default} ${homeTeam.name.default} ${date}`;

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
  const fetchGameDataUrls = [
    fetch(`https://api-web.nhle.com/v1/gamecenter/${params.gameId}/landing`),
    fetch(`https://api-web.nhle.com/v1/gamecenter/${params.gameId}/boxscore`),
  ];

  try {
    const [gameDataResponse, boxscoreDataResponse]: Response[] =
      await Promise.all(fetchGameDataUrls);

    const gameData = await gameDataResponse.json();
    const boxscoreData = await boxscoreDataResponse.json();

    return deepMerge(gameData, boxscoreData);
  } catch (e) {
    return {
      gameData: [],
      boxscoreData: [],
    };
  }
};

export default function Game() {
  const gameDataToRender = useLoaderData<Game>();

  const {
    awayTeam,
    homeTeam,
    clock,
    periodDescriptor,
    gameState,
    startTimeUTC,
    summary,
  } = gameDataToRender;

  return (
    <div className="mx-auto flex w-full flex-col">
      <ScoreHeader
        awayTeam={awayTeam}
        homeTeam={homeTeam}
        clock={clock}
        periodDescriptor={periodDescriptor}
        gameState={gameState}
        startTimeUTC={startTimeUTC}
      />

      {isGameActive(gameState) || isGameComplete(gameState) ? (
        <ActiveGameData
          awayTeam={awayTeam}
          homeTeam={homeTeam}
          summary={summary}
          playerByGameStats={gameDataToRender.playerByGameStats}
        />
      ) : null}
    </div>
  );
}
