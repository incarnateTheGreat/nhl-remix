import { useRouteLoaderData } from "@remix-run/react";
import { Game, Last10RecordTeam, Team } from "types/types";

import { cn, getRandomKey } from "~/utils";

function isWin(result: string) {
  return result.includes("W");
}

function handleResultStr(result: string) {
  let resultStr = result;

  if (result.includes("SO")) {
    resultStr = resultStr.replace("SO", "S/O ");
  } else if (result.includes("OT")) {
    resultStr = resultStr.replace("OT", "OT ");
  }

  return resultStr;
}

export default function Last10Games() {
  const gameRenderData = useRouteLoaderData("routes/game.$gameId") as Game;

  const { last10Record } = gameRenderData;

  return (
    <>
      {Object.entries(last10Record)?.map((team) => {
        const [teamName, recordData] = team as [string, Last10RecordTeam];

        const teamToDisplay = gameRenderData[teamName as keyof Game] as Team;

        return (
          <div key={getRandomKey()}>
            <div className="flex justify-between">
              <span className="font-bold">{teamToDisplay.name.default}</span>
              <span>{recordData.record}</span>
            </div>
            <div className="mt-2 grid grid-cols-5 gap-x-4 gap-y-1">
              {recordData.pastGameResults.map((game) => {
                const { opponentAbbrev, gameResult } = game;

                return (
                  <>
                    <div className="flex flex-col text-center text-sm">
                      <span
                        className={cn("rounded bg-gray-300", {
                          "bg-green-700 font-semibold text-white":
                            isWin(gameResult),
                        })}
                      >
                        {opponentAbbrev}
                      </span>
                      <span className="mt-0.5 text-xs text-gray-800">
                        {handleResultStr(gameResult)}
                      </span>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
}
