import { useRouteLoaderData } from "@remix-run/react";

import { getTeamColour } from "~/components/GameStats/utils";
import StatsBar from "~/routes/game.$gameId/components/StatsBar";
import { Game, TeamSeasonStatsPerTeam } from "~/types";
import { getLogo, getNumberWithOrdinal } from "~/utils";

const TEAM_GAME_STATS_TEST = [
  { "Power-Play %": ["ppPctg", "ppPctgRank"] },
  { "Penalty Kill %": ["pkPctg", "pkPctgRank"] },
  { "Faceoff %": ["faceoffWinningPctg", "faceoffWinningPctgRank"] },
  { "GF/GP": ["goalsForPerGamePlayed", "goalsForPerGamePlayedRank"] },
  { "GA/GP": ["goalsAgainstPerGamePlayed", "goalsAgainstPerGamePlayedRank"] },
];

export default function TeamStats() {
  const gameDataToRender = useRouteLoaderData("routes/game.$gameId") as Game;

  const {
    awayTeam,
    homeTeam,
    matchup: { teamSeasonStats },
  } = gameDataToRender;

  const { homeColourStr, awayColourStr } = getTeamColour({
    awayTeamAbbrev: awayTeam.abbrev,
    homeTeamAbbrev: homeTeam.abbrev,
  });

  const awayBorderStyle = `border-r-[10px] border-t-[10px] border-r-transparent border-t-${awayColourStr}`;
  const homeBorderStyle = `border-b-[10px] border-l-[10px] border-l-transparent border-b-${homeColourStr}`;

  return (
    <div>
      <div className="flex justify-between">
        <img src={getLogo(awayTeam.abbrev)} alt={awayTeam.abbrev} width={50} />
        <h3 className="font-bold">Team Stats</h3>
        <img src={getLogo(homeTeam.abbrev)} alt={homeTeam.abbrev} width={50} />
      </div>
      {TEAM_GAME_STATS_TEST.map((stat) => {
        const [label] = Object.keys(stat);

        const [percentage, rank] = Object.values(stat).flatMap(
          (e) => e as string,
        );

        const awayTeamPercentage =
          teamSeasonStats.awayTeam[percentage as keyof TeamSeasonStatsPerTeam];
        const homeTeamPercentage =
          teamSeasonStats.homeTeam[percentage as keyof TeamSeasonStatsPerTeam];

        const awayTeamRank =
          teamSeasonStats.awayTeam[rank as keyof TeamSeasonStatsPerTeam];
        const homeTeamRank =
          teamSeasonStats.homeTeam[rank as keyof TeamSeasonStatsPerTeam];

        const awayValueToDisplay = `${(awayTeamPercentage * 100).toFixed(1)}%`;
        const homeValueToDisplay = `${(homeTeamPercentage * 100).toFixed(1)}%`;

        const total = awayTeamPercentage + homeTeamPercentage;
        const awayBar = awayTeamPercentage / total;
        const homeBar = homeTeamPercentage / total;

        const subText = {
          awayValue: getNumberWithOrdinal(awayTeamRank),
          homeValue: getNumberWithOrdinal(homeTeamRank),
        };

        const dataToPass = {
          label,
          awayValueToDisplay,
          homeValueToDisplay,
          awayBar,
          homeBar,
          awayBorderStyle,
          homeBorderStyle,
          subText,
        };

        return <StatsBar key={label} {...dataToPass} />;
      })}
    </div>
  );
}
