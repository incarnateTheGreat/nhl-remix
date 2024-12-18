import { Link, useRouteLoaderData } from "@remix-run/react";

import { TeamScheduleData } from "~/routes/team.schedule.($teamAbbrev).($year).($month)";
import {
  cn,
  convertTime,
  getRandomKey,
  getTodaysDate,
  isGameActive,
  isGameComplete,
  isPreGame,
} from "~/utils";

import { GetMonthDataType, MonthDataType } from "../utils";

type TableCellProps = {
  day: MonthDataType;
};

const TableCell = ({ day }: TableCellProps) => {
  return (
    <div className="flex justify-between">
      <div
        className={cn(
          "flex h-4 w-4 items-center justify-center text-left text-[0.55rem] md:h-6 md:w-6 md:text-[0.70rem] md:text-xs",
          {
            "self-start rounded-full bg-blue-600 p-2 font-bold text-white":
              getTodaysDate() === day?.dateShort,
          },
        )}
      >
        {day?.dayNumber}
      </div>
    </div>
  );
};

type TableBodyProps = {
  selectedMonthData: GetMonthDataType;
};

export default function TableBody({ selectedMonthData }: TableBodyProps) {
  const { teamAbbrev, teamSchedule } = useRouteLoaderData(
    "routes/team.schedule.($teamAbbrev).($year).($month)",
  ) as TeamScheduleData;

  return (
    <tbody className="relative">
      {selectedMonthData?.weeks.map((week) => {
        return (
          <tr key={getRandomKey()}>
            {week.map((day) => {
              const game = teamSchedule?.gamesWithIds?.[day?.dateShort];

              let teamSelect;
              let opponent;
              let display;
              let isLive = false;
              const outcome = game?.gameOutcome?.lastPeriodType;

              if (game) {
                if (game.awayTeam.abbrev === teamAbbrev) {
                  teamSelect = game.awayTeam;
                  opponent = game.homeTeam;
                } else {
                  teamSelect = game.homeTeam;
                  opponent = game.awayTeam;
                }

                if (game.awayTeam.abbrev === teamAbbrev) {
                  opponent = game.homeTeam;
                  opponent["isHome"] = true;
                  opponent["isAway"] = false;
                } else {
                  opponent = game.awayTeam;
                  opponent["isHome"] = false;
                  opponent["isAway"] = true;
                }

                if (isPreGame(game.gameState)) {
                  display = convertTime(game.startTimeUTC);
                } else if (isGameActive(game.gameState)) {
                  display = `${game.awayTeam.abbrev} ${game.awayTeam.score} - ${game.homeTeam.score} ${game.homeTeam.abbrev}`;
                  isLive = true;
                } else if (isGameComplete(game.gameState)) {
                  const awayScore = game.awayTeam.score;
                  const homeScore = game.homeTeam.score;

                  let result;

                  if (teamSelect.score > opponent.score) {
                    result = "W";
                  } else if (opponent.score > teamSelect.score) {
                    result = "L";
                  } else if (teamSelect.score === opponent.score) {
                    result = "T";
                  }

                  const scoreline =
                    homeScore > awayScore
                      ? `${homeScore}-${awayScore}`
                      : `${awayScore}-${homeScore}`;

                  display = `${result} ${scoreline} ${outcome === "OT" || outcome === "SO" ? `(${outcome})` : ""}`;
                }
              }

              return (
                <td
                  role="gridcell"
                  className={cn(
                    "group h-10 w-24 cursor-pointer border text-center md:w-20",
                    {
                      "bg-blue-950 text-white hover:bg-blue-900":
                        opponent?.isAway,
                      "bg-white hover:bg-gray-200": opponent?.isHome,
                      "pointer-events-none bg-gray-100": !opponent,
                    },
                  )}
                  key={getRandomKey()}
                  data-date={day?.dateShort}
                >
                  {!opponent ? (
                    <div className="h-16 min-h-24 md:h-full">
                      <TableCell day={day} />
                    </div>
                  ) : null}

                  {opponent ? (
                    <Link
                      prefetch="intent"
                      to={`/game/${game?.id}`}
                      className="flex h-full flex-col md:w-full md:pt-0"
                    >
                      <div className="ml-1 mr-1.5 mt-1 flex h-full justify-between">
                        <TableCell day={day} />
                        {isLive ? (
                          <div className="text-[0.60rem] font-semibold md:text-sm">
                            LIVE
                          </div>
                        ) : null}
                      </div>
                      <div
                        className={cn(
                          "mb-3 mt-3 flex w-full flex-1 items-center justify-center",
                        )}
                      >
                        {opponent ? (
                          <div className="flex w-full flex-col px-2 md:justify-center">
                            <img
                              src={opponent?.logo}
                              alt={opponent?.abbrev}
                              className={cn(
                                "mx-auto hidden h-8 w-8 rounded-full p-1 md:block md:h-14 md:w-14",
                                {
                                  "bg-gray-700 group-hover:bg-gray-600":
                                    opponent.isAway,
                                  "border border-slate-600": opponent.isAway,
                                  "bg-slate-300": opponent.isHome,
                                },
                              )}
                            />
                            <div className="text-[0.70rem] md:hidden">
                              {opponent.abbrev}
                            </div>
                            <div className="mt-0 hidden text-[0.55rem] font-semibold md:mt-2 md:block md:text-sm">
                              {display}
                            </div>
                          </div>
                        ) : (
                          <>&nbsp;</>
                        )}
                      </div>
                    </Link>
                  ) : null}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
}
