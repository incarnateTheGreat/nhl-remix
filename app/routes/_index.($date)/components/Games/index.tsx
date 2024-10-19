import { useRouteLoaderData } from "@remix-run/react";

import GameBox from "../GameBox";

import type { GamesType } from "~/types";

export default function Games() {
  const gameDataToRender = useRouteLoaderData(
    "routes/_index.($date)",
  ) as GamesType;

  const { games } = gameDataToRender;

  return (
    <section className="mb-4">
      <div className="grid py-2 md:grid-cols-3">
        {games?.map((game) => {
          return <GameBox key={game.id} game={game} />;
        })}
      </div>
    </section>
  );
}
