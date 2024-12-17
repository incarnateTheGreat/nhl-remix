import { Game, GoalsType, Team } from "types/types";

import { useLiveLoader } from "~/sse/use-live-loader";

import VideoThumbnail from "../VideoThumbnail";
import Player from "./Player";
import Scenario from "./Scenario";

type GoalContainerProps = {
  goal: GoalsType;
  awayTeam: Team;
  homeTeam: Team;
};

export default function GoalContainer({
  goal,
  awayTeam,
  homeTeam,
}: GoalContainerProps) {
  const { season } = useLiveLoader() as Game;
  const { awayScore, homeScore, highlightClip } = goal;

  const currentSeason = season.toString().slice(0, 4);

  const isVideoAvailable = highlightClip && +currentSeason >= 2023;

  let scoreSituation = "";

  if (awayScore > homeScore) {
    scoreSituation = `${awayScore}-${homeScore} ${awayTeam.abbrev}`;
  } else if (homeScore > awayScore) {
    scoreSituation = `${homeScore}-${awayScore} ${homeTeam.abbrev}`;
  } else {
    scoreSituation = `${homeScore}-${awayScore} Tied`;
  }

  const logo =
    goal.teamAbbrev.default === homeTeam.abbrev ? homeTeam.logo : awayTeam.logo;

  return (
    <div
      key={goal.timeInPeriod}
      className="mb-3 flex flex-col justify-between lg:flex-row"
    >
      <Player goal={goal} logo={logo} />
      <div className="flex items-center">
        <Scenario
          scoreSituation={scoreSituation}
          timeInPeriod={goal.timeInPeriod}
          shotType={goal.shotType}
        />

        {isVideoAvailable ? <VideoThumbnail videoId={highlightClip} /> : null}
        {!highlightClip && +currentSeason >= 2023 ? (
          <span className="mx-3 flex h-8 w-8">&nbsp;</span>
        ) : null}
      </div>
    </div>
  );
}
