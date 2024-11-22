import { useLoaderData, useParams } from "@remix-run/react";
import { useEventStream } from "@remix-sse/client";
import { useEffect, useState } from "react";
import { Game } from "types/types";

export function useLiveLoader<T>() {
  // const { gameId } = useParams();

  // const eventStreamData = useEventStream(`/emitter/${gameId}`, {
  //   returnLatestOnly: true,
  //   deserialize: (raw) => JSON.parse(raw) as Game,
  // });

  // if (eventStreamData) {
  //   return eventStreamData;
  // }

  // return init;

  const { gameId } = useParams();
  const init = useLoaderData<T>() as Game;
  const eventData = useEventStream(`/emitter/${gameId}`, {
    returnLatestOnly: true,
    deserialize: (raw) => JSON.parse(raw) as Game,
  });

  const [gameDataToRender, setGameDataToRender] = useState<Game>(init);

  useEffect(() => {
    if (eventData) {
      setGameDataToRender(eventData);
    }
  }, [eventData]);

  return gameDataToRender;
}
