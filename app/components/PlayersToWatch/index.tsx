import { useRouteLoaderData } from "@remix-run/react";

import { Game } from "~/types";
import { getLogo } from "~/utils";

const STATCODES: { [k: string]: string } = {
  points: "P",
  goals: "G",
  assists: "A",
  plusMinus: "+/-",
};

export default function PlayersToWatch() {
  const gameDataToRender = useRouteLoaderData("routes/game.$gameId") as Game;

  const {
    matchup: { teamLeadersL5 },
    awayTeam,
    homeTeam,
  } = gameDataToRender;

  return (
    <div className="flex flex-col">
      <h2 className="mb-4 text-2xl font-semibold">Players to Watch</h2>
      <div className="flex justify-between">
        <img src={getLogo(awayTeam.abbrev)} alt={awayTeam.abbrev} width={75} />
        <img src={getLogo(homeTeam.abbrev)} alt={homeTeam.abbrev} width={75} />
      </div>
      <div>
        {teamLeadersL5.map((stat) => {
          const { category, awayLeader, homeLeader } = stat;

          return (
            <div key={category} className="flex flex-col">
              <div className="flex justify-center lg:justify-start">
                <span className="uppercase">{category}</span>
              </div>
              <div className="flex">
                <div className="my-4 flex w-1/2 items-center justify-between pl-4">
                  <div className="flex w-12 flex-col items-center">
                    <span className="text-3xl font-extrabold">
                      {awayLeader.value}
                    </span>
                    <span>{STATCODES[category]}</span>
                  </div>
                  <div className="flex w-full justify-end border-r border-yellow-600 pr-8">
                    <div className="mr-8 flex flex-col">
                      <span className="text-right">
                        {awayLeader.firstName.default}
                      </span>
                      <span className="text-xl font-bold">
                        {awayLeader.lastName.default}
                      </span>
                      <span className="text-right text-sm">
                        #{awayLeader.sweaterNumber} &#8226;{" "}
                        {awayLeader.positionCode}
                      </span>
                    </div>
                    <img
                      className="rounded-full border border-slate-500"
                      src={awayLeader.headshot}
                      alt={awayLeader.name.default}
                      width={75}
                    />
                  </div>
                </div>
                <div className="my-4 flex w-1/2 items-center justify-between pr-4">
                  <div className="flex w-full pl-8">
                    <img
                      className="rounded-full border border-slate-500"
                      src={homeLeader.headshot}
                      alt={homeLeader.name.default}
                      width={75}
                    />
                    <div className="ml-8 flex flex-col">
                      <span>{homeLeader.firstName.default}</span>
                      <span className="text-xl font-bold">
                        {homeLeader.lastName.default}
                      </span>
                      <span className="text-sm">
                        #{homeLeader.sweaterNumber} &#8226;{" "}
                        {homeLeader.positionCode}
                      </span>
                    </div>
                  </div>
                  <div className="flex w-12 flex-col items-center">
                    <span className="text-3xl font-extrabold">
                      {homeLeader.value}
                    </span>
                    <span>{STATCODES[category]}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
