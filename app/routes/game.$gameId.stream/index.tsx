import type { LoaderFunctionArgs } from "@remix-run/node";
import { Game } from "types/types";

import getGameData from "~/api/getGameData";
import { createGameEventStream } from "~/sse/create-game-event-stream.server";
import { isGameComplete } from "~/utils";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const { gameId = "" } = params;

  const gameData = (await getGameData(gameId)) as Game;

  const { gameState } = gameData;

  if (isGameComplete(gameState)) {
    return gameData;
  }

  return createGameEventStream(request, gameId);
}
