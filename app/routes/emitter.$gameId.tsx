import { LoaderFunction } from "@remix-run/node";
import { EventStream } from "@remix-sse/server";
import { Game } from "types/types";

import getGameData from "~/api/getGemeData";
import { isGameActive, isGameComplete, isPreGame, Timer } from "~/utils";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const timerToUse = new Timer();

export const loader: LoaderFunction = async ({ request, params }) => {
  const { gameId = "" } = params;

  const gameData = await getGameData(gameId);

  // const { gameState } = gameData;

  // if (isGameComplete(gameState)) {
  //   return gameData;
  // }

  // Return the EventStream from your route loader
  return new EventStream(request, (send) => {
    // const init = async () => {
    //   const gameData = await getGameData(gameId);

    //   send(JSON.stringify(gameData));

    // };

    const run = async () => {
      const gameData = (await getGameData(gameId)) as Game;

      const {
        gameState,
        clock: { inIntermission },
      } = gameData;

      if (isPreGame(gameState) || inIntermission) {
        timerToUse.start(() => {
          send(JSON.stringify(gameData));
          run();
        }, 60000);
      } else if (isGameActive(gameState) && !inIntermission) {
        timerToUse.start(() => {
          send(JSON.stringify(gameData));
          run();
        }, 15000);
      } else if (isGameComplete(gameState)) {
        send(JSON.stringify(gameData));
        timerToUse.stop();
      }
    };

    // init();

    send(JSON.stringify(gameData));

    const {
      gameState,
      clock: { inIntermission },
    } = gameData;

    if (
      isPreGame(gameState) ||
      inIntermission ||
      (isGameActive(gameState) && !inIntermission)
    ) {
      run();
    }

    return () => {
      timerToUse.stop();
    };
  });
};
