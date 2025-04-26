import { MetaFunction } from "@remix-run/node";
import { useNavigation } from "@remix-run/react";
import { format } from "date-fns";
import type { Game } from "types/types";

import getGameData from "~/api/getGameData";
import ActiveGameData from "~/components/ActiveGameData";
import Loading from "~/components/Loading";
import { useLiveLoader } from "~/sse/use-live-loader";
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

  const title = `${awayTeam.placeName.default} ${awayTeam.commonName.default} vs. ${homeTeam.placeName.default} ${homeTeam.commonName.default} - ${date}`;

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
      content: `This is the Game detail page for ${awayTeam.placeName.default} ${awayTeam.commonName.default} vs. ${homeTeam.placeName.default} ${homeTeam.commonName.default}`,
    },
  ];
};

export const loader = async ({ params }: LoaderProps) => {
  return getGameData(params.gameId);
};

export default function Game() {
  const gameDataToRender = useLiveLoader<Game>();
  const navigation = useNavigation();

  const { gameState } = gameDataToRender;

  return (
    <div className="mx-auto flex h-full w-full flex-col bg-white px-4 py-2">
      {navigation.state === "loading" ? <Loading /> : null}

      {navigation.state === "idle" ? (
        <>
          <ScoreHeader />

          {isPreGame(gameState) ? <PreGameData /> : null}

          {isGameActive(gameState) || isGameComplete(gameState) ? (
            <ActiveGameData />
          ) : null}
        </>
      ) : null}
    </div>
  );
}
