import { Link } from "@remix-run/react";
import { GameState, Team } from "types/types";

import { isPreGame } from "~/utils";

const CLASSES = {
  away: {
    parentClasses:
      "order-2 flex w-full items-center lg:order-1 lg:flex-1 mb-2 lg:mb-0",
    scoreClasses: "ml-auto text-4xl font-bold",
    teamClasses: "flex flex-col group mr-4",
    powerplayClasses: "flex",
    imageClasses: "mr-4 w-20",
  },
  home: {
    parentClasses:
      "order-3 flex w-full items-center lg:flex-1 lg:flex-row lg:items-center mt-2 md:mt-0",
    scoreClasses:
      "order-3 ml-auto text-4xl font-bold lg:order-1 lg:ml-0 lg:mr-auto",
    teamClasses: "order-2 flex flex-col mr-4 group lg:order-3",
    powerplayClasses: "order-3 flex lg:order-2 lg:mr-4",
    imageClasses: "order-1 lg:order-4 mr-4 lg:mr-0 w-20",
  },
};

type TeamHeaderProps = {
  team: Team;
  homeAway: "home" | "away";
  gameState: GameState;
};

export default function TeamHeader({
  team,
  homeAway,
  gameState,
}: TeamHeaderProps) {
  const { abbrev, logo, placeName, commonName, sog = 0, score } = team;
  const {
    parentClasses,
    scoreClasses,
    teamClasses,
    imageClasses,
    powerplayClasses,
  } = CLASSES[homeAway];

  return (
    <div className={parentClasses}>
      <Link
        prefetch="intent"
        to={`/team/schedule/${abbrev}`}
        className={imageClasses}
      >
        <img src={logo} alt={`${placeName.default} ${commonName.default}`} />
      </Link>
      <Link
        prefetch="intent"
        to={`/team/schedule/${abbrev}`}
        className={teamClasses}
      >
        <span className="text-md group-hover:underline">
          {placeName.default}
        </span>
        <span className="text-xl font-bold leading-none group-hover:underline">
          {commonName.default}
        </span>
        <div>
          {isPreGame(gameState) ? (
            <span className="text-sm">{team.record}</span>
          ) : (
            <span className="text-xs">SOG: {sog}</span>
          )}
        </div>
      </Link>
      {/* <div
        className={cn(
          powerplayClasses,
          "flex h-5 min-w-[30px] items-center justify-center rounded bg-red-600 px-1 text-[10px] font-semibold uppercase text-white",
        )}
      >
        PP
      </div> */}
      <div className={scoreClasses}>{score}</div>
    </div>
  );
}
