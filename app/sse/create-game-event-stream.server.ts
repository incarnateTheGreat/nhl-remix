import { eventStream } from "remix-utils/sse/server";
import { Game } from "types/types";

import getGameData from "~/api/getGameData";
import { isGameActive, isGameComplete, isPreGame, Timer } from "~/utils";

import { emitter } from "./emitter.server";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const timerToUse = new Timer();

function setTimer(ms: number) {
  return timerToUse.start(() => {
    emitter.emit("gameData");
  }, ms);
}

export function createGameEventStream(
  request: Request,
  eventName: string,
  gameId: string,
) {
  return eventStream(
    request.signal,
    (send) => {
      const run = async () => {
        const gameData: Game = await getGameData(gameId);

        const { gameState, clock } = gameData;

        if (isPreGame(gameState) || clock?.inIntermission) {
          setTimer(60000);
        } else if (isGameActive(gameState) && !clock?.inIntermission) {
          setTimer(15000);
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
    },
    { headers: { "Cache-Control": "no-cache" } },
  );
}
