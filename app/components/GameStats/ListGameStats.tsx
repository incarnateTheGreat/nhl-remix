import { useCallback } from "react";
import { useRouteLoaderData } from "@remix-run/react";

import { getTeamColour } from "./utils";

import { Game } from "~/types";
import { cn } from "~/utils";

const TEAM_GAME_STATS: { [k: string]: string } = {
  sog: "Shots on Goal",
  faceoffWinningPctg: "Faceoff %",
  powerPlayPctg: "Power-Play %",
  pim: "Penalty Minutes",
  hits: "Hits",
  blockedShots: "Blocked Shots",
  giveaways: "Giveaways",
  takeaways: "Takeaways",
};

export default function ListGaneStats() {
  const gameDataToRender = useRouteLoaderData("routes/game.$gameId") as Game;

  const {
    awayTeam,
    homeTeam,
    summary: { teamGameStats },
  } = gameDataToRender;

  const filteredTeamGameStats = useCallback(() => {
    return teamGameStats.filter((gameStat) => {
      return gameStat.category !== "powerPlay";
    });
  }, [teamGameStats]);

  const powerPlayFractionValues = teamGameStats.find(
    (gameStat) => gameStat.category === "powerPlay",
  );

  const { homeColourStr, awayColourStr } = getTeamColour({
    awayTeamAbbrev: awayTeam.abbrev,
    homeTeamAbbrev: homeTeam.abbrev,
  });

  const awayBorderStyle = `border-r-[10px] border-t-[10px] border-r-transparent border-t-${awayColourStr}`;
  const homeBorderStyle = `border-b-[10px] border-l-[10px] border-l-transparent border-b-${homeColourStr} `;

  return (
    <div className="mt-4">
      {filteredTeamGameStats().map((gameStat) => {
        const { category } = gameStat;
        const { awayValue, homeValue } = gameStat;

        let awayValueToDisplay, homeValueToDisplay;

        const sum = awayValue + homeValue;
        let awayBar, homeBar;

        if (sum === 0) {
          awayBar = 50;
          homeBar = 50;
        } else {
          awayBar = awayValue / sum;
          homeBar = homeValue / sum;
        }

        if (category === "faceoffWinningPctg") {
          awayValueToDisplay = `${(awayValue * 100).toFixed(1)}%`;
          homeValueToDisplay = `${(homeValue * 100).toFixed(1)}%`;
        } else if (category === "powerPlayPctg") {
          const powerPlayPctg = teamGameStats.find(
            (stat) => stat.category === "powerPlayPctg",
          );

          if (powerPlayPctg) {
            awayValueToDisplay = `${powerPlayPctg.awayValue * 100}%`;
            homeValueToDisplay = `${powerPlayPctg.homeValue * 100}%`;
          }
        } else {
          awayValueToDisplay = awayValue;
          homeValueToDisplay = homeValue;
        }

        return (
          <div key={category} className=" mb-4 last:mb-0">
            <div className="flex justify-between">
              <span className="text-xl font-bold">{awayValueToDisplay}</span>
              <span>{TEAM_GAME_STATS[category]}</span>
              <span className="text-xl font-bold">{homeValueToDisplay}</span>
            </div>
            <div className="flex gap-2">
              <div
                className={cn("flex", {
                  hidden: awayBar === 0,
                })}
                style={{
                  flexGrow: awayBar,
                }}
              >
                <div
                  className={cn("h-2 w-full", {
                    [awayBorderStyle]: awayBar,
                  })}
                />
              </div>
              <div
                className="flex"
                style={{
                  flexGrow: homeBar,
                }}
              >
                <div
                  className={cn("h-2 w-full", {
                    [homeBorderStyle]: homeBar,
                  })}
                />
              </div>
            </div>
            {category === "powerPlayPctg" ? (
              <div className="flex justify-between text-sm text-gray-500">
                <span>{powerPlayFractionValues?.awayValue}</span>
                <span>{powerPlayFractionValues?.homeValue}</span>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
