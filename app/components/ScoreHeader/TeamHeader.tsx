import { GameState, Team } from "~/types";
import { isPreGame } from "~/utils";

const CLASSES = {
  away: {
    parentClasses: "order-2 flex w-full items-center lg:order-1 lg:flex-1",
    scoreClasses: "ml-auto text-4xl font-bold",
    teamClasses: "flex flex-col",
    imageClasses: "",
  },
  home: {
    parentClasses:
      "order-3 flex w-full items-center lg:flex-1 lg:flex-row lg:items-center",
    scoreClasses:
      "order-3 ml-auto text-4xl font-bold lg:order-1 lg:ml-0 lg:mr-auto",
    teamClasses: "order-2 flex flex-col",
    imageClasses: "order-1 lg:order-3",
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
  const { logo, placeName, name, sog, score } = team;
  const { parentClasses, scoreClasses, teamClasses, imageClasses } =
    CLASSES[homeAway];

  return (
    <div className={parentClasses}>
      <img
        src={logo}
        width={125}
        alt={`${placeName.default} ${name.default}`}
        className={imageClasses}
      />
      <div className={teamClasses}>
        <span className="text-md">{placeName.default}</span>
        <span className="text-xl font-bold leading-none">{name.default}</span>
        <div>
          {isPreGame(gameState) ? (
            <>{team.record}</>
          ) : (
            <span className="text-sm">SOG: {sog}</span>
          )}
        </div>
      </div>
      <div className={scoreClasses}>{score}</div>
    </div>
  );
}
