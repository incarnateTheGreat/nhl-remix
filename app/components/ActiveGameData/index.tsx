import Linescore from "../Linescore";
import Penalties from "../Penalties";
import Scoring from "../Scoring";
import ShotsOnGoal from "../ShotsOnGoal";
import Tabs from "../Tabs";

import { Summary, Team } from "~/types";

type ActiveGameDataProps = {
  awayTeam: Team;
  homeTeam: Team;
  summary: Summary;
};

const tabData = [
  {
    id: 0,
    title: "One",
    component: () => {
      return <div className="p-2">Component one</div>;
    },
  },
  {
    id: 1,
    title: "Two",
    component: () => {
      return <div className="p-2">Component two</div>;
    },
  },
  {
    id: 2,
    title: "Three",
    component: () => {
      return <div className="p-2">Component three</div>;
    },
  },
];

export default function ActiveGameData({
  awayTeam,
  homeTeam,
  summary,
}: ActiveGameDataProps) {
  const {
    scoring,
    penalties,
    linescore: { byPeriod, totals },
    shotsByPeriod,
    teamGameStats,
  } = summary;

  return (
    <div className="mt-2 flex flex-col lg:flex-row">
      <div className="flex-1">
        <div>
          <Tabs data={tabData} />
        </div>
        <Scoring
          awayTeamAbbrev={awayTeam.abbrev}
          homeTeamAbbrev={homeTeam.abbrev}
          scoring={scoring}
        />
        <div className="mt-1">
          <Penalties penalties={penalties} />
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
