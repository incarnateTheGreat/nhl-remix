import type { LoaderFunctionArgs } from "@remix-run/node";

import { createGameEventStream } from "~/sse/create-game-event-stream.server";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const { gameId = "" } = params;

  return createGameEventStream(request, "gameData", gameId);
}
