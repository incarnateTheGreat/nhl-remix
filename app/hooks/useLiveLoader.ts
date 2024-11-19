import { useLoaderData, useParams } from "@remix-run/react";
import { useEventStream } from "@remix-sse/client";
import { Game } from "types/types";

export function useLiveLoader<T>() {
  const { gameId } = useParams();

  const greeting = useEventStream(`/emitter/${gameId}`, {
    returnLatestOnly: true,
    deserialize: (raw) => JSON.parse(raw) as Game,
  });

  const init = useLoaderData<T>() as Game;

  const { gameState } = init;

  // console.log({ init, greeting });

  if (greeting) {
    console.log("Return Greeting.");

    return greeting;
  }

  return init;
}
