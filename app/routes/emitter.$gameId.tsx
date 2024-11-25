import { LoaderFunction } from "@remix-run/node";
import { EventStream } from "@remix-sse/server";
import { Game } from "types/types";

import getGameData from "~/api/getGemeData";
import { isGameActive, isGameComplete, isPreGame, Timer } from "~/utils";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const timerToUse = new Timer();

export const loader: LoaderFunction = async ({ request, params }) => {
  console.log("Enter Loader.");

  const { gameId = "" } = params;

  const gameData = await getGameData(gameId);

  const { gameState, clock } = gameData;

  // TODO: Find a way to abort Event Stream on Vercel Edge Runtimes.
  if (isGameComplete(gameState)) {
    return new EventStream(request, (send) => {
      send(JSON.stringify(gameData));

      return () => {
        timerToUse.stop();
      };
    });
  }

  // Return the EventStream from your route loader
  return new EventStream(request, (send) => {
    // const init = async () => {
    //   const gameData = await getGameData(gameId);

    //   send(JSON.stringify(gameData));
    // };

    const run = async () => {
      const gameData = (await getGameData(gameId)) as Game;

      const { gameState } = gameData;
      console.log(timerToUse);
      console.log("In Run:", gameState);

      if (isPreGame(gameState) || clock?.inIntermission) {
        timerToUse.stop();
        timerToUse.start(() => {
          send(JSON.stringify(gameData));
          run();
        }, 60000);
      } else if (isGameActive(gameState) && !clock?.inIntermission) {
        timerToUse.stop();
        timerToUse.start(() => {
          send(JSON.stringify(gameData));
          run();
        }, 15000);
      } else if (isGameComplete(gameState)) {
        send(JSON.stringify(gameData));
        timerToUse.stop();
        console.log("Game over.");

        return;
      }
    };

    // init();

    send(JSON.stringify(gameData));

    if (
      isPreGame(gameState) ||
      clock?.inIntermission ||
      (isGameActive(gameState) && !clock?.inIntermission)
    ) {
      run();
    }

    return () => {
      timerToUse.stop();
    };
  });
};
