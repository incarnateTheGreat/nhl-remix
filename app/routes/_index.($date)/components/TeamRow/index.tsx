import { GameState, Team } from "types/types";

import { isPreGame } from "~/utils";

type TeamRowProps = {
  team: Team;
  gameState: GameState;
  situation?: {
    teamAbbrev: string;
    timeRemaining: string;
    situationCode: string;
  };
};

export default function TeamRow({ team, gameState }: TeamRowProps) {
  const { logo, name, score, sog } = team;
  const [...teamName] = name.default.split(" ");

  const scoreIndicator = score ?? "";

  return (
    <div className="mb-3 flex items-center last:mb-0">
      <div className="flex flex-1">
        <img src={logo} alt={name.default} width={50} />
        <div className="ml-2 text-sm">
          <div className="font-semibold">{teamName.join(" ")}</div>
          <div>
            {isPreGame(gameState) ? (
              <span className="text-xs">{team.record}</span>
            ) : (
              <span className="text-xs">SOG: {sog}</span>
            )}
          </div>
        </div>
      </div>
      <div className="text-md min-w-3 text-center font-bold">
        {scoreIndicator}
      </div>
    </div>
  );
}
