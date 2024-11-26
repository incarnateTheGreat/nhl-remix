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
  console.log("HIT");

  return eventStream(
    request.signal,
    (send) => {
      const run = async () => {
        const gameData: Game = await getGameData(gameId);

        const { gameState, clock } = gameData;

        send({
          data: JSON.stringify(gameData),
        });

        if (isPreGame(gameState) || clock?.inIntermission) {
          timerToUse.start(() => {
            run();
          }, 60000);
        } else if (isGameActive(gameState) && !clock?.inIntermission) {
          timerToUse.start(() => {
            run();
          }, 5000);
        } else if (timerToUse.running && isGameComplete(gameState)) {
          timerToUse.stop();
        }

        console.log("Data sent.");
      };

      // emitter.addListener(eventName, run);

      // emitter.emit("gameData");

      run();

      return () => {
        // emitter.removeListener(eventName, run);
        timerToUse.stop();
      };
    },
    { headers: { "Cache-Control": "no-cache" } },
  );
}
