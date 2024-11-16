import { eventStream } from "remix-utils/sse/server";
import { Game } from "types/types";

import getGameData from "~/api/getGameData";
import { isGameActive, isGameComplete, isPreGame, Timer } from "~/utils";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const timerToUse = new Timer();
const controller = new AbortController();

export function createGameEventStream(request: Request, gameId: string) {
  // request.signal.addEventListener("abort", () => controller.abort());

  return eventStream(controller.signal, (send) => {
    let cancelled = false;

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
      }

      if (isGameComplete(gameState)) {
        console.log("Game complete. Close connection.");
        send({
          data: gameDataToString,
        });
        cancelled = true;

        // controller.abort();
      }

      console.log({ cancelled });

      send({
        data: gameDataToString,
      });
    };

    if (!cancelled) {
      run();
    }

    return () => {
      console.log("Cleanup.");
      cancelled = true;

      timerToUse.stop();
    };
  });
}
