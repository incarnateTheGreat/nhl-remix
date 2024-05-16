import { useLoaderData } from "@remix-run/react";

import Linescore from "~/components/Linescore";
import ScoreHeader from "~/components/ScoreHeader";
import Scoring from "~/components/Scoring";
import ShotsOnGoal from "~/components/ShotsOnGoal";
import type { Game } from "~/types";
import { isGameActive, isGameComplete } from "~/utils";

type LoaderProps = {
  params: {
    gameId: string;
  };
};

export const loader = async ({ params }: LoaderProps) => {
  const gameData = await fetch(
    `https://api-web.nhle.com/v1/gamecenter/${params.gameId}/landing`,
  );

  return gameData.json();
};

export default function Game() {
  const gameDataToRender = useLoaderData<Game>();

  const {
    awayTeam,
    homeTeam,
    clock,
    periodDescriptor,
    gameState,
    startTimeUTC,
  } = gameDataToRender;

  return (
    <div className="mx-auto flex w-full flex-col border p-2 lg:w-10/12">
      <ScoreHeader
        awayTeam={awayTeam}
        homeTeam={homeTeam}
        clock={clock}
        periodDescriptor={periodDescriptor}
        gameState={gameState}
        startTimeUTC={startTimeUTC}
      />

      {isGameActive(gameState) || isGameComplete(gameState) ? (
        <div className="mt-2 flex">
          <div className="mr-2">
            <Linescore
              byPeriod={gameDataToRender.summary.linescore.byPeriod}
              totals={gameDataToRender.summary.linescore.totals}
              awayTeamLogo={awayTeam.logo}
              awayTeamAbbrev={awayTeam.abbrev}
              homeTeamLogo={homeTeam.logo}
              homeTeamAbbrev={homeTeam.abbrev}
            />

            <div className="mt-1">
              <ShotsOnGoal
                awayTeamAbbrev={awayTeam.abbrev}
                homeTeamAbbrev={homeTeam.abbrev}
                shotsByPeriod={gameDataToRender.summary.shotsByPeriod}
                teamGameStats={gameDataToRender.summary.teamGameStats}
              />
            </div>
          </div>

          <Scoring
            awayTeamAbbrev={awayTeam.abbrev}
            homeTeamAbbrev={homeTeam.abbrev}
            scoring={gameDataToRender.summary.scoring}
          />
        </div>
      ) : null}
    </div>
  );
}
