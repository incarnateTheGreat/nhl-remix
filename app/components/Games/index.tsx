import GameBox from "../GameBox";

import type { GameBoxType } from "~/types";

type GamesProps = {
  games: GameBoxType[];
};

export default function Games({ games }: GamesProps) {
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
