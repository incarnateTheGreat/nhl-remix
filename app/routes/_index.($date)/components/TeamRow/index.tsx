import { GameState, Situation, Team } from "types/types";

import { cn, getRandomKey, isPreGame } from "~/utils";

type TeamRowProps = {
  team: Team;
  homeAway: "homeTeam" | "awayTeam";
  gameState: GameState;
  situation?: Situation;
};

export default function TeamRow({
  team,
  gameState,
  homeAway,
  situation,
}: TeamRowProps) {
  const { logo, name, score, sog = "--" } = team;
  const [...teamName] = name.default.split(" ");

  const scoreIndicator = score ?? "";

  return (
    <div className="mb-3 flex items-center last:mb-0">
      <div className="flex flex-1 items-center">
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
        {situation ? (
          <div className="ml-3 flex items-center text-xs font-semibold text-red-500">
            {situation?.[homeAway]?.situationDescriptions?.map(
              (situationLabel) => {
                return (
                  <>
                    <div
                      key={getRandomKey()}
                      className={cn(
                        "flex h-5 min-w-[30px] items-center justify-center rounded bg-red-600 px-1 text-[10px] font-semibold uppercase text-white",
                      )}
                    >
                      {situationLabel}
                    </div>
                    <div className="ml-2">{situation?.timeRemaining}</div>
                  </>
                );
              },
            )}
          </div>
        ) : null}
      </div>
      <div className="text-md min-w-3 text-center font-bold">
        {scoreIndicator}
      </div>
    </div>
  );
}
