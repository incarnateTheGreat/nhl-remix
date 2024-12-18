import { TeamSeasonStatsPerTeam } from "types/types";

import { getTeamColour } from "~/components/GameStats/utils";
import StatsBar from "~/routes/game.$gameId/components/StatsBar";
import { useLiveLoader } from "~/sse/use-live-loader";
import { getNumberWithOrdinal } from "~/utils";

const TEAM_GAME_STATS_TEST = [
  { "Power-Play %": ["ppPctg", "ppPctgRank"] },
  { "Penalty Kill %": ["pkPctg", "pkPctgRank"] },
  { "Faceoff %": ["faceoffWinningPctg", "faceoffWinningPctgRank"] },
  { "GF/GP": ["goalsForPerGamePlayed", "goalsForPerGamePlayedRank"] },
  { "GA/GP": ["goalsAgainstPerGamePlayed", "goalsAgainstPerGamePlayedRank"] },
];

export default function TeamStats() {
  const gameDataToRender = useLiveLoader();

  const { awayTeam, homeTeam, teamSeasonStats } = gameDataToRender;

  const { homeColourStr, awayColourStr } = getTeamColour({
    awayTeamAbbrev: awayTeam.abbrev,
    homeTeamAbbrev: homeTeam.abbrev,
  });

  const awayBorderStyle = `border-r-[10px] border-t-[10px] border-r-transparent border-t-${awayColourStr}`;
  const homeBorderStyle = `border-b-[10px] border-l-[10px] border-l-transparent border-b-${homeColourStr}`;

  return (
    <div>
      <div className="mb-2 flex justify-between">
        <img src={awayTeam.logo} alt={awayTeam.abbrev} width={50} />
        <h3 className="font-bold">Team Stats</h3>
        <img src={homeTeam.logo} alt={homeTeam.abbrev} width={50} />
      </div>
      {TEAM_GAME_STATS_TEST.map((stat) => {
        const [label] = Object.keys(stat);

        const [percentage, rank] = Object.values(stat).flatMap(
          (e) => e as string,
        );

        const awayTeamPercentage =
          teamSeasonStats?.awayTeam?.[
            percentage as keyof TeamSeasonStatsPerTeam
          ] ?? null;
        const homeTeamPercentage =
          teamSeasonStats?.homeTeam?.[
            percentage as keyof TeamSeasonStatsPerTeam
          ] ?? null;

        const awayTeamRank =
          teamSeasonStats?.awayTeam?.[rank as keyof TeamSeasonStatsPerTeam] ??
          null;
        const homeTeamRank =
          teamSeasonStats?.homeTeam?.[rank as keyof TeamSeasonStatsPerTeam] ??
          null;

        const awayValueToDisplay =
          percentage === "goalsForPerGamePlayed" ||
          percentage === "goalsAgainstPerGamePlayed"
            ? awayTeamPercentage
            : `${(awayTeamPercentage * 100).toFixed(1)}%`;
        const homeValueToDisplay =
          percentage === "goalsForPerGamePlayed" ||
          percentage === "goalsAgainstPerGamePlayed"
            ? homeTeamPercentage
            : `${(homeTeamPercentage * 100).toFixed(1)}%`;

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
