import { eventStream } from "remix-utils/sse/server";
import { Game } from "types/types";

import getGameData from "~/api/getGameData";

import { emitter } from "./emitter.server";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// const timerToUse = new Timer();

export function createGameEventStream(
  request: Request,
  eventName: string,
  gameId: string,
) {
  return eventStream(request.signal, (send) => {
    const run = async () => {
      const gameData: Game = await getGameData(gameId);
      const gameDataToString = JSON.stringify(gameData);

      // const {
      //   gameState,
      //   clock: { inIntermission },
      // } = gameData;

      // if (isPreGame(gameState) || inIntermission) {
      //   timerToUse.start(() => {
      //     run();
      //   }, 60000);
      // } else if (isGameActive(gameState) && !inIntermission) {
      //   timerToUse.start(() => {
      //     run();
      //   }, 15000);
      // } else if (timerToUse.running && isGameComplete(gameState)) {
      //   timerToUse.stop();
      // }

      send({
        data: gameDataToString,
      });

      return gameData;
    };

    emitter.addListener(eventName, run);

    // timerToUse.start(() => {
    //   console.log("Get Game Data via Emitter.");

    //   emitter.emit("gameData");
    // }, 5000);

    return () => {
      emitter.removeListener(eventName, run);
    };
  });
}
