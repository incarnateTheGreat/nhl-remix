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
      const gameDataToString = JSON.stringify(gameData);

      const { gameState, clock } = gameData;

      if (isPreGame(gameState) || clock?.inIntermission) {
        timerToUse.start(() => {
          emitter.emit(eventName);
        }, 60000);
      } else if (isGameActive(gameState) && !clock?.inIntermission) {
        timerToUse.start(() => {
          emitter.emit(eventName);
        }, 15000);
      } else if (timerToUse.running && isGameComplete(gameState)) {
        timerToUse.stop();
      }

      send({
        data: gameDataToString,
      });
    };

    emitter.addListener(eventName, run);

    emitter.emit(eventName);

    return () => {
      emitter.removeListener(eventName, run);
    };
  });
}
