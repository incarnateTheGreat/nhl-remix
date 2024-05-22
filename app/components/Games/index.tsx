import { useRouteLoaderData } from "@remix-run/react";

import GameBox from "../GameBox";

import type { GamesType } from "~/types";

export default function Games() {
  const gameDataToRender = useRouteLoaderData(
    "routes/scores.($date)",
  ) as GamesType;

  const { games } = gameDataToRender;

  return (
    <section className="mb-4">
      <div className="flex flex-col py-2 md:flex-row">
        {games?.map((game) => {
          return <GameBox key={game.id} game={game} />;
        })}
      </div>
    </section>
  );
}
