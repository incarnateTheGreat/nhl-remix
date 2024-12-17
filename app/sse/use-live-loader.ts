import { useLoaderData, useResolvedPath } from "@remix-run/react";
import { useEffect, useState } from "react";
import { useEventSource } from "remix-utils/sse/react";
import { Game } from "types/types";

import { isGameActive, isPreGame } from "~/utils";

export function useLiveLoader<T>() {
  const path = useResolvedPath("./stream");
  const init = useLoaderData<T>() as Game;
  const [gameDataToRender, setGameDataToRender] = useState<Game>(init);

  const { gameState } = init;

  const eventData = useEventSource(path.pathname, {
    enabled: isPreGame(gameState) || isGameActive(gameState) || false,
  });

  useEffect(() => {
    if (eventData) {
      setGameDataToRender(JSON.parse(eventData));
    }
  }, [eventData]);

  return gameDataToRender;
}
