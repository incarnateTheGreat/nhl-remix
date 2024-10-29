import type { Shootout, Team } from "types/types";

import { cn, getLogo, getRandomKey } from "~/utils";

type ShootoutProps = {
  shootout: Shootout[];
  awayTeam: Team;
  homeTeam: Team;
};

export default function Shootout({
  shootout,
  awayTeam,
  homeTeam,
}: ShootoutProps) {
  const shootoutScore = shootout.reduce(
    (acc, elem) => {
      if (elem.result === "goal") {
        acc[elem.teamAbbrev] += 1;
      }

      return acc;
    },
    {
      [awayTeam.abbrev]: 0,
      [homeTeam.abbrev]: 0,
    },
  );

  return (
    <div>
      <h2 className="mb-2 flex justify-between border-b border-gray-700 font-bold">
        <span>Shootout</span>
        <span>
          {`${awayTeam.abbrev} ${shootoutScore[awayTeam.abbrev]}`} -{" "}
          {`${homeTeam.abbrev} ${shootoutScore[homeTeam.abbrev]}`}
        </span>
      </h2>

      {shootout.map((attempt) => {
        const {
          headshot,
          firstName,
          lastName,
          teamAbbrev,
          result,
          gameWinner,
        } = attempt;

        return (
          <div
            key={getRandomKey()}
            className={cn("mb-3 flex border p-2 md:flex-col lg:flex-row", {
              "bg-green-200/25": gameWinner,
            })}
          >
            <img
              className="default_border rounded-full"
              src={headshot}
              width={50}
              alt={`${firstName} ${lastName}`}
            />
            <div className="ml-2 flex w-full items-center justify-between">
              <div>
                <div>
                  {firstName} {lastName}
                </div>
                <div className="flex">
                  <img width={30} src={getLogo(teamAbbrev)} alt={teamAbbrev} />
                  <div className="my-0.5 ml-0.5 text-xs capitalize">
                    {result}
                  </div>
                </div>
              </div>
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full p-4 text-lg font-black text-white",
                  {
                    "bg-green-800": result === "goal",
                    "bg-red-800": result === "save",
                  },
                )}
              >
                {result === "goal" ? <>&#x2713;</> : null}
                {result === "save" ? <>X</> : null}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
