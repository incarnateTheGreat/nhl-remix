import Boxscore from "../Boxscore";
import Linescore from "../Linescore";
import Penalties from "../Penalties";
import Scoring from "../Scoring";
import ShotsOnGoal from "../ShotsOnGoal";
import Tabs from "../Tabs";

import { PlayerByGameStats, Summary, Team } from "~/types";

type ActiveGameDataProps = {
  awayTeam: Team;
  homeTeam: Team;
  summary: Summary;
  playerByGameStats: PlayerByGameStats;
};

const tabData = [
  {
    id: 0,
    title: "Stats",
    component: () => <div />,
  },
  {
    id: 1,
    title: "Boxscore",
    component: () => <div />,
  },
];

export default function ActiveGameData({
  awayTeam,
  homeTeam,
  summary,
  playerByGameStats,
}: ActiveGameDataProps) {
  const {
    scoring,
    penalties,
    linescore: { byPeriod, totals },
    shotsByPeriod,
    teamGameStats,
  } = summary;

  tabData[0].component = () => (
    <div className="p-2">
      <Scoring
        awayTeamAbbrev={awayTeam.abbrev}
        homeTeamAbbrev={homeTeam.abbrev}
        scoring={scoring}
      />
      <div className="mt-1">
        <Penalties penalties={penalties} />
      </div>
    </div>
  );

  tabData[1].component = () => {
    return (
      <div className="mt-4">
        <Boxscore
          awayTeamName={awayTeam.name.default}
          homeTeamName={homeTeam.name.default}
          data={playerByGameStats}
        />
      </div>
    );
  };

  return (
    <div className="mt-2 flex flex-col lg:flex-row">
      <div className="flex-1">
        <div>
          <Tabs data={tabData} />
        </div>
      </div>

      <div className="mt-1 lg:ml-2 lg:mt-0">
        <Linescore
          byPeriod={byPeriod}
          totals={totals}
          awayTeamLogo={awayTeam.logo}
          awayTeamAbbrev={awayTeam.abbrev}
          homeTeamLogo={homeTeam.logo}
          homeTeamAbbrev={homeTeam.abbrev}
        />

        <div className="mt-1">
          <ShotsOnGoal
            awayTeamAbbrev={awayTeam.abbrev}
            homeTeamAbbrev={homeTeam.abbrev}
            shotsByPeriod={shotsByPeriod}
            teamGameStats={teamGameStats}
          />
        </div>
      </div>
    </div>
  );
}
