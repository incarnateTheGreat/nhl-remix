import { useRouteLoaderData } from "@remix-run/react";
import type { GamesType } from "types/types";

import GameBox from "../GameBox";

export default function Games() {
  const gameDataToRender = useRouteLoaderData(
    "routes/_index.($date)",
  ) as GamesType;

  const { games } = gameDataToRender;

  return (
    <section className="mb-4">
      <div className="grid grid-cols-1 py-2 md:grid-cols-2 lg:grid-cols-4">
        {games?.map((game) => {
          return <GameBox key={game.id} game={game} />;
        })}
      </div>
    </section>
  );
}
