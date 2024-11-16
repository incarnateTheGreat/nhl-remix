import { eventStream } from "remix-utils/sse/server";
import { Game } from "types/types";

import getGameData from "~/api/getGameData";
import { isGameActive, isGameComplete, isPreGame, Timer } from "~/utils";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const timerToUse = new Timer();

export function createGameEventStream(request: Request, gameId: string) {
  return eventStream(request.signal, (send) => {
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

      send({
        data: gameDataToString,
      });

      if (isGameComplete(gameState)) {
        console.log("Game complete. Close connection.");

        return;
      }
    };

    run();

    return () => {
      console.log("Cleanup.");

      timerToUse.stop();
    };
  });
}
