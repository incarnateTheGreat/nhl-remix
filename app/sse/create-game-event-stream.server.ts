import { eventStream } from "remix-utils/sse/server";
import { Game } from "types/types";

import getGameData from "~/api/getGameData";
import { isGameActive, isGameComplete, isPreGame, Timer } from "~/utils";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const timerToUse = new Timer();

const controller = new AbortController();

export function createGameEventStream(request: Request, gameId: string) {
  let cancel = false;
  // request.signal.addEventListener("abort", () => controller.abort());

  return eventStream(controller.signal, (send) => {
    const run = async () => {
      const gameData: Game = await getGameData(gameId);

      console.log({ cancel });

      if (cancel) {
        console.log("ABORT.");

        return controller.abort();
      }

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
        cancel = true;
      } else {
        console.log("Switch to TRUE.");

        cancel = true;
      }

      // console.log(timerToUse);

      send({
        data: gameDataToString,
      });
    };

    run();

    return () => {
      timerToUse.stop();
    };
  });
}
