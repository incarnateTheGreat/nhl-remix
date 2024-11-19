import { LoaderFunction } from "@remix-run/node";
import { EventStream } from "@remix-sse/server";

import getGameData from "~/api/getGemeData";
import { isGameActive, isGameComplete, isPreGame, Timer } from "~/utils";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const timerToUse = new Timer();

export const loader: LoaderFunction = async ({ request, params }) => {
  const { gameId = "" } = params;

  const gameData = await getGameData(gameId);

  const { gameState } = gameData;

  if (isGameComplete(gameState)) {
    return null;
  }

  // Return the EventStream from your route loader
  return new EventStream(request, (send) => {
    const init = async () => {
      const gameData = await getGameData(gameId);
      send(JSON.stringify(gameData));
    };

    const run = async () => {
      const gameData = await getGameData(gameId);

      const {
        gameState,
        clock: { inIntermission },
      } = gameData;

      if (isPreGame(gameState) || inIntermission) {
        timerToUse.start(() => {
          send(JSON.stringify(gameData));
          run();
        }, 5000); // Change back to 60000
      } else if (isGameActive(gameState) && !inIntermission) {
        timerToUse.start(() => {
          send(JSON.stringify(gameData));
          run();
        }, 15000);
      }

      if (timerToUse.running && isGameComplete(gameState)) {
        timerToUse.stop();
      }
    };

    init();
    run();

    return () => {
      timerToUse.stop();
    };
  });
};
