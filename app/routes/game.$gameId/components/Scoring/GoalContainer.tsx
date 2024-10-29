import React from "react";
import { GoalsType, Team } from "types/types";

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
  const { awayScore, homeScore, highlightClip } = goal;

  let scoreSituation = "";

  if (awayScore > homeScore) {
    scoreSituation = `${awayScore}-${homeScore} ${awayTeam.abbrev}`;
  } else if (homeScore > awayScore) {
    scoreSituation = `${homeScore}-${awayScore} ${homeTeam.abbrev}`;
  } else {
    scoreSituation = `${homeScore}-${awayScore} Tied`;
  }

  return (
    <div
      key={goal.timeInPeriod}
      className="mb-3 flex flex-col justify-between lg:flex-row"
    >
      <Player goal={goal} />
      <div className="flex items-center">
        <Scenario
          scoreSituation={scoreSituation}
          timeInPeriod={goal.timeInPeriod}
          shotType={goal.shotType}
        />
        {highlightClip ? (
          <VideoThumbnail videoId={highlightClip} />
        ) : (
          <span className="mx-3 flex h-8 w-8">&nbsp;</span>
        )}
      </div>
    </div>
  );
}
