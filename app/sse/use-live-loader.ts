import { useLoaderData, useResolvedPath } from "@remix-run/react";
import { useEventSource } from "remix-utils/sse/react";

export function useLiveLoader<T>() {
  const path = useResolvedPath("./stream");
  const data = useEventSource(path.pathname);
  const init = useLoaderData<T>();

  if (data) {
    return JSON.parse(data);
  }

  return init;
}
