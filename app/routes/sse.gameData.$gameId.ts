import { LoaderFunctionArgs } from "@remix-run/node";
import { eventStream } from "remix-utils/sse/server";

import { deepMerge } from "~/utils";

type LoaderProps = {
  gameId: string;
};

const getGameData = async (gameId: string): Promise<string> => {
  const fetchGameDataUrls = [
    fetch(`https://api-web.nhle.com/v1/gamecenter/${gameId}/landing`),
    fetch(`https://api-web.nhle.com/v1/gamecenter/${gameId}/boxscore`),
    fetch(`https://api-web.nhle.com/v1/gamecenter/${gameId}/right-rail`),
  ];

  const [
    gameDataResponse,
    boxscoreDataResponse,
    rightRailResponse,
  ]: Response[] = await Promise.all(fetchGameDataUrls);

  const gameData = await gameDataResponse.json();
  const boxscoreData = await boxscoreDataResponse.json();
  const rightRail = await rightRailResponse.json();

  return JSON.stringify(deepMerge(gameData, boxscoreData, rightRail));
};

export async function loader({ request, params }: LoaderFunctionArgs) {
  const { gameId } = params as LoaderProps;

  return eventStream(request.signal, function setup(send) {
    const interval = setInterval(async () => {
      const gameData = await getGameData(gameId);

      send({
        event: "gameData",
        data: gameData,
      });
    }, 15000);

    const run = async () => {
      const gameData = await getGameData(gameId);

      send({
        event: "gameData",
        data: gameData,
      });
    };

    run();

    return function clear() {
      clearInterval(interval);
    };
  });
}
