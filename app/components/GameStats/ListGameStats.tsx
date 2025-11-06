import { useCallback } from "react";

import StatsBar from "~/routes/game.$gameId/components/StatsBar";
import { useLiveLoader } from "~/sse/use-live-loader";

import { getTeamColour } from "./utils";

const LIST_GAME_STATS: { [k: string]: string } = {
  sog: "Shots on Goal",
  faceoffWinningPctg: "Faceoff %",
  faceoffWins: "Faceoff Wins",
  powerPlayPctg: "Power-Play %",
  pim: "Penalty Minutes",
  hits: "Hits",
  blockedShots: "Blocked Shots",
  giveaways: "Giveaways",
  takeaways: "Takeaways",
};

export default function ListGaneStats() {
  const gameDataToRender = useLiveLoader();

  const { awayTeam, homeTeam, teamGameStats } = gameDataToRender;

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

  const faceoffWins = filteredTeamGameStats().find(
    (filter) => filter.category === "faceoffWins",
  );

  return (
    <div className="mt-4">
      {filteredTeamGameStats().map((gameStat) => {
        const { category } = gameStat;
        const { awayValue, homeValue } = gameStat;

        if (category === "faceoffWins") {
          return;
        }

        let awayValueToDisplay;
        let homeValueToDisplay;

        const sum = awayValue + homeValue;
        let awayBar, homeBar, subText;

        if (sum === 0) {
          awayBar = 50;
          homeBar = 50;
        } else {
          awayBar = awayValue / sum;
          homeBar = homeValue / sum;
        }

        if (category === "faceoffWinningPctg") {
          awayValueToDisplay = `${(awayValue * 100).toFixed(1)}% (${faceoffWins?.awayValue})`;
          homeValueToDisplay = `${(homeValue * 100).toFixed(1)}% (${faceoffWins?.homeValue})`;
        } else if (category === "powerPlayPctg") {
          const powerPlayPctg = teamGameStats.find(
            (stat) => stat.category === "powerPlayPctg",
          );

          if (powerPlayPctg) {
            awayValueToDisplay = `${(powerPlayPctg.awayValue * 100).toFixed(1)}%`;
            homeValueToDisplay = `${(powerPlayPctg.homeValue * 100).toFixed(1)}%`;
          }
        } else {
          awayValueToDisplay = awayValue;
          homeValueToDisplay = homeValue;
        }

        if (category === "powerPlayPctg") {
          subText = {
            awayValue: powerPlayFractionValues?.awayValue,
            homeValue: powerPlayFractionValues?.homeValue,
          };
        }

        const dataToPass = {
          category,
          label: LIST_GAME_STATS[category],
          awayValueToDisplay,
          homeValueToDisplay,
          awayBar,
          homeBar,
          awayBorderStyle,
          homeBorderStyle,
          subText,
        };

        return <StatsBar key={category} {...dataToPass} />;
      })}
    </div>
  );
}
