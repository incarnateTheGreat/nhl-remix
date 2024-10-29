import { useRouteLoaderData } from "@remix-run/react";
import { Game } from "types/types";

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
      <h2 className="heading">Players to Watch</h2>
      <div className="flex justify-between">
        <img src={getLogo(awayTeam.abbrev)} alt={awayTeam.abbrev} width={75} />
        <img src={getLogo(homeTeam.abbrev)} alt={homeTeam.abbrev} width={75} />
      </div>
      {/* <div>
        {teamLeadersL5.map((stat) => {
          const { category, awayLeader, homeLeader } = stat;

          return (
            <div key={category} className="flex flex-col">
              <div className="flex justify-start lg:justify-center">
                <span className="uppercase">{category}</span>
              </div>
              <div className="flex flex-col lg:flex-row">
                <div className="my-4 flex items-center justify-between lg:w-1/2 lg:pl-4">
                  <div className="order-3 flex w-12 flex-col items-center lg:order-none">
                    <span className="text-3xl font-extrabold">
                      {awayLeader.value}
                    </span>
                    <span>{STATCODES[category]}</span>
                  </div>
                  <div className="order-2 flex w-full border-none border-yellow-600 pr-8 lg:order-none lg:justify-end lg:border-r">
                    <div className="order-2 mr-8 flex flex-col lg:order-none">
                      <span className="lg:text-right">
                        {awayLeader.firstName.default}
                      </span>
                      <span className="text-xl font-bold">
                        {awayLeader.lastName.default}
                      </span>
                      <span className="text-sm lg:text-right">
                        #{awayLeader.sweaterNumber} &#8226;{" "}
                        {awayLeader.positionCode}
                      </span>
                    </div>
                    <img
                      className="default_border order-1 mr-4 rounded-full lg:order-none lg:mr-0"
                      src={awayLeader.headshot}
                      alt={awayLeader.name.default}
                      width={75}
                    />
                  </div>
                </div>
                <div className="my-4 flex items-center justify-between lg:w-1/2 lg:pr-4">
                  <div className="flex w-full lg:pl-8">
                    <img
                      className="default_border rounded-full"
                      src={homeLeader.headshot}
                      alt={homeLeader.name.default}
                      width={75}
                    />
                    <div className="ml-4 flex flex-col lg:ml-8">
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
                  <div className="flex w-12 flex-col text-center">
                    <span className="w-12 text-3xl font-extrabold">
                      {homeLeader.value}
                    </span>
                    <span>{STATCODES[category]}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div> */}
    </div>
  );
}
