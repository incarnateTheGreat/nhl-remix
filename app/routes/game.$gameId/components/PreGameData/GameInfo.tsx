import { useRouteLoaderData } from "@remix-run/react";

import { Game } from "~/types";

export default function GameInfo() {
  const gameDataToRender = useRouteLoaderData("routes/game.$gameId") as Game;

  const { awayTeam, homeTeam, tvBroadcasts, venue, gameInfo } =
    gameDataToRender;

  const tvBroadcastsStr = tvBroadcasts.map((tv) => tv.network).join(", ");

  return (
    <div>
      <h2 className="mb-4 text-base font-bold">Game Info</h2>
      <div className="mb-1 grid grid-cols-[110px_auto] text-sm last:mb-0">
        <span className="mr-1 font-semibold">Networks:</span>
        <div>{tvBroadcastsStr}</div>
      </div>
      <div className="mb-1 grid grid-cols-[110px_auto] text-sm last:mb-0">
        <span className="mr-1 font-semibold">Location:</span>
        <div>{venue.default}</div>
      </div>
      <div className="mb-1 grid grid-cols-[110px_auto] text-sm last:mb-0">
        <span className="mr-1 font-semibold">{awayTeam.abbrev} Coach:</span>
        <div>{gameInfo.awayTeam.headCoach.default}</div>
      </div>
      <div className="mb-1 grid grid-cols-[110px_auto] text-sm last:mb-0">
        <span className="mr-1 font-semibold">{homeTeam.abbrev} Coach:</span>
        <div>{gameInfo.homeTeam.headCoach.default}</div>
      </div>
    </div>
  );
}
