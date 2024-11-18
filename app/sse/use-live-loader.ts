import { useLoaderData, useResolvedPath } from "@remix-run/react";
import { useEventSource } from "remix-utils/sse/react";
import { Game } from "types/types";

import { isGameActive, isPreGame } from "~/utils";

export function useLiveLoader<T>() {
  const path = useResolvedPath("./stream");
  const init = useLoaderData<T>() as Game;

  const { gameState } = init;

  useEventSource(path.pathname, {
    enabled: isPreGame(gameState) || isGameActive(gameState),
  });

  return init;
}
