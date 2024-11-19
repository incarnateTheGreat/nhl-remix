import { LoaderFunction } from "@remix-run/node";
import { EventStream } from "@remix-sse/server";

import getGameData from "~/api/getGemeData";
import { isGameActive, isGameComplete, isPreGame, Timer } from "~/utils";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const timerToUse = new Timer();

export const loader: LoaderFunction = ({ request, params }) => {
  const { gameId = "" } = params;

  // Return the EventStream from your route loader
  return new EventStream(request, (send) => {
    // In the init function, setup your SSE Event source
    // This can be any asynchronous data source, that will send
    // events to the client periodically

    // Here we will just use a `setInterval`

    const init = async () => {
      const gameData = await getGameData(gameId);
      send(JSON.stringify(gameData));
    };

    const run = async () => {
      const gameData = await getGameData(gameId);

      const {
        gameState,
        clock: { inIntermission },
      } = gameData;

      if (isPreGame(gameState) || inIntermission) {
        timerToUse.start(() => {
          send(JSON.stringify(gameData));
          run();
        }, 10000);
      } else if (isGameActive(gameState) && !inIntermission) {
        timerToUse.start(() => {
          send(JSON.stringify(gameData));
          run();
        }, 5000);
      }

      if (timerToUse.running && isGameComplete(gameState)) {
        timerToUse.stop();
      }
    };

    init();
    run();

    // const interval = setInterval(async () => {
    //   const gameData = await getGameData(gameId);

    //   // You can send events to the client via the `send` function
    //   send(JSON.stringify(gameData));

    //   //   // if you to send different events on multiple channels you can
    //   //   // specify an eventKey in the options
    //   //   send(JSON.stringify({ hello: "world" }), { eventKey: "channelExample" });
    // }, 5000);

    return () => {
      // Return a cleanup function
      // clearInterval(interval);
      timerToUse.stop();
    };
  });
};
