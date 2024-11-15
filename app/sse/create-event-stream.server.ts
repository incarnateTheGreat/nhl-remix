import { eventStream } from "remix-utils/sse/server";
import { Game } from "types/types";

import {
  deepMerge,
  isGameActive,
  isGameComplete,
  isPreGame,
  Timer,
} from "~/utils";

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

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const timerToUse = new Timer();

export function createEventStream(
  request: Request,
  eventName: string,
  gameId: string,
) {
  return eventStream(request.signal, (send) => {
    // const handle = async () => {
    //   console.log("handle.");

    //   const gameData = await getGameData(gameId);

    //   send({
    //     data: gameData,
    //   });
    // };

    // emitter.addListener(eventName, handle);

    const run = async () => {
      const gameData = await getGameData(gameId);

      const gameDataParsed: Game = JSON.parse(gameData);

      const {
        gameState,
        clock: { inIntermission },
      } = gameDataParsed;

      if (isPreGame(gameState) || inIntermission) {
        timerToUse.start(() => {
          // revalidator.revalidate();
          console.log("Pre-Game or Intermissions.");

          run();
        }, 60000);
      } else if (isGameActive(gameState) && !inIntermission) {
        timerToUse.start(async () => {
          console.log("Game is Active.");

          run();
        }, 15000);
      } else if (timerToUse.running && isGameComplete(gameState)) {
        console.log("Game Ended.");

        timerToUse.stop();
      }

      send({
        data: gameData,
      });
    };

    run();

    return () => {
      // emitter.removeListener(eventName, handle);
      // clearInterval(interval);
      timerToUse.stop();
    };
  });
}
