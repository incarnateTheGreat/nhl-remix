import { eventStream } from "remix-utils/sse/server";
import { Game } from "types/types";

import getGameData from "~/api/getGameData";
import { isGameActive, isGameComplete, isPreGame, Timer } from "~/utils";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const timerToUse = new Timer();

export function createGameEventStream(
  request: Request,
  eventName: string,
  gameId: string,
) {
  const controller = new AbortController();

  request.signal.addEventListener("abort", () => controller.abort());

  return eventStream(controller.signal, function setup(send) {
    const run = async () => {
      const gameData: Game = await getGameData(gameId);
      const gameDataToString = JSON.stringify(gameData);

      const {
        gameState,
        clock: { inIntermission },
      } = gameData;

      if (isPreGame(gameState) || inIntermission) {
        timerToUse.start(() => {
          run();
        }, 60000);
      } else if (isGameActive(gameState) && !inIntermission) {
        timerToUse.start(() => {
          run();
        }, 15000);
      } else if (timerToUse.running && isGameComplete(gameState)) {
        timerToUse.stop();
      } else {
        // emitter.removeListener(eventName, run);
        console.log("Abort controller.");

        return controller.abort();
      }

      send({
        data: gameDataToString,
      });
    };

    run();

    // emitter.addListener(eventName, run);

    return () => {
      // emitter.removeListener(eventName, run);
      if (timerToUse.running) {
        console.log("Stop running the clock.");

        timerToUse.stop();
      }
      // return controller.abort();
    };
  });
}
