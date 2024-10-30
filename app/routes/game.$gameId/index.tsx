import { MetaFunction } from "@remix-run/node";
import { useLoaderData, useRevalidator } from "@remix-run/react";
import { format } from "date-fns";
import { useEffect } from "react";
import type { Game } from "types/types";

import ActiveGameData from "~/components/ActiveGameData";
import {
  deepMerge,
  getTodaysDate,
  isGameActive,
  isGameComplete,
  isPreGame,
  Timer,
} from "~/utils";

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

  const {
    gameState,
    gameDate,
    clock: { inIntermission },
  } = gameDataToRender;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const timerToUse = new Timer();

  useEffect(() => {
    if (getTodaysDate() === gameDate) {
      if (isPreGame(gameState) || inIntermission) {
        timerToUse.start(() => {
          revalidator.revalidate();
        }, 60000);
      } else if (isGameActive(gameState) && !inIntermission) {
        timerToUse.start(() => {
          revalidator.revalidate();
        }, 15000);
      }
    }

    return () => timerToUse.stop();
  }, [inIntermission, gameState]);

  useEffect(() => {
    console.log(timerToUse.running);
    if (timerToUse.running && isGameComplete(gameState)) {
      timerToUse.stop();
    }
  }, [gameState, timerToUse]);

  useEffect(() => {
    if (isGameComplete(gameState)) {
      timerToUse.stop();
    }
  }, [gameState, timerToUse]);

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
