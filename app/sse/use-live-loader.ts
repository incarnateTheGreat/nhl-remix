import { useLoaderData, useResolvedPath } from "@remix-run/react";
import { useEventSource } from "remix-utils/sse/react";
import { Game } from "types/types";

export function useLiveLoader<T>() {
  const path = useResolvedPath("./stream");
  const init = useLoaderData<T>() as Game;
  useEventSource(path.pathname);

  return init;
}
