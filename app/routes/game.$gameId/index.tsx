import { useCallback, useEffect } from "react";
import { MetaFunction } from "@remix-run/node";
import { useLoaderData, useRevalidator } from "@remix-run/react";
import { format } from "date-fns";

import PreGameData from "./components/PreGameData";
import ScoreHeader from "./components/ScoreHeader";

import ActiveGameData from "~/components/ActiveGameData";
import type { Game } from "~/types";
import { deepMerge, isGameActive, isGameComplete, isPreGame } from "~/utils";

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
  const fetchGameDataUrls = [
    fetch(`https://api-web.nhle.com/v1/gamecenter/${params.gameId}/landing`),
    fetch(`https://api-web.nhle.com/v1/gamecenter/${params.gameId}/boxscore`),
    fetch(`https://api-web.nhle.com/v1/gamecenter/${params.gameId}/right-rail`),
  ];

  try {
    const [
      gameDataResponse,
      boxscoreDataResponse,
      rightRailResponse,
    ]: Response[] = await Promise.all(fetchGameDataUrls);

    const gameData = await gameDataResponse.json();
    const boxscoreData = await boxscoreDataResponse.json();
    const rightRail = await rightRailResponse.json();

    return deepMerge(gameData, boxscoreData, rightRail);
  } catch (e) {
    return {
      gameData: [],
      boxscoreData: [],
    };
  }
};

export default function Game() {
  const gameDataToRender = useLoaderData<Game>();
  const revalidator = useRevalidator();

  const { gameState } = gameDataToRender;

  const visibilityChange = useCallback(() => {
    if (
      document.visibilityState === "visible" &&
      (isPreGame(gameState) || isGameActive(gameState))
    ) {
      revalidator.revalidate();
    }
  }, [gameState, revalidator]);

  useEffect(() => {
    document.addEventListener("visibilitychange", visibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", visibilityChange);
    };
  }, [visibilityChange]);

  return (
    <div className="mx-auto mt-4 flex w-full flex-col bg-white px-4 py-2">
      <ScoreHeader />

      {isPreGame(gameState) ? <PreGameData /> : null}

      {isGameActive(gameState) || isGameComplete(gameState) ? (
        <ActiveGameData />
      ) : null}
    </div>
  );
}
