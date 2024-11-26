import { eventStream } from "remix-utils/sse/server";
import { Game } from "types/types";

import getGameData from "~/api/getGameData";
import { isGameActive, isGameComplete, isPreGame, Timer } from "~/utils";

import { emitter } from "./emitter.server";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const timerToUse = new Timer();

export function createGameEventStream(
  request: Request,
  eventName: string,
  gameId: string,
) {
  return eventStream(request.signal, (send) => {
    const run = async () => {
      const gameData: Game = await getGameData(gameId);

      const { gameState, clock } = gameData;

      console.log({ gameState });

      if (isPreGame(gameState) || clock?.inIntermission) {
        timerToUse.start(() => {
          emitter.emit("gameData");
        }, 60000);
      } else if (isGameActive(gameState) && !clock?.inIntermission) {
        timerToUse.start(() => {
          emitter.emit("gameData");
        }, 5000);
      } else if (timerToUse.running && isGameComplete(gameState)) {
        timerToUse.stop();
      }

      send({
        data: JSON.stringify(gameData),
      });

      console.log("Data sent.");
    };

    emitter.addListener(eventName, run);

    emitter.emit("gameData");

    return () => {
      emitter.removeListener(eventName, run);
    };
  });
}
