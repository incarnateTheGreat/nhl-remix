import type { LoaderFunctionArgs } from "@remix-run/node";

import { createEventStream } from "~/sse/create-event-stream.server";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const { gameId = "" } = params;

  return createEventStream(request, "gameData", gameId);
}
