import { useLoaderData, useParams } from "@remix-run/react";
import { useEventStream } from "@remix-sse/client";
import { Game } from "types/types";

export function useLiveLoader<T>() {
  const { gameId } = useParams();
  const init = useLoaderData<T>() as Game;

  const eventStreamData = useEventStream(`/emitter/${gameId}`, {
    returnLatestOnly: true,
    deserialize: (raw) => JSON.parse(raw) as Game,
  });

  if (eventStreamData) {
    return eventStreamData;
  }

  return init;
}
