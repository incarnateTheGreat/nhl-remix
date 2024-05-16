import { Team } from "~/types";

type TeamRowProps = {
  team: Team;
  gameState: string;
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
      <img src={logo} alt={name.default} width={50} />
      <div className="text-sm">
        <div className="font-semibold">{teamName.join(" ")}</div>
        <div>
          {gameState === "FUT" || gameState === "PRE" ? (
            <>{team.record}</>
          ) : (
            <>SOG: {sog}</>
          )}{" "}
        </div>
      </div>
      <div className="flex-1 text-right text-lg font-bold">
        {scoreIndicator}
      </div>
    </div>
  );
}
