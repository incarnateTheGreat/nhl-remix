import { Link, useRouteLoaderData, useSubmit } from "@remix-run/react";
import { useEffect, useState } from "react";

import { TeamScheduleData } from "~/routes/team.schedule.($teamAbbrev).($year).($month)";
import {
  cn,
  convertTime,
  getLogo,
  getRandomKey,
  getTodaysDate,
  isGameActive,
  isGameComplete,
  isPreGame,
} from "~/utils";

import MonthYearSelector from "../MonthYearSelector";
import { getMonthData } from "./utils";

export default function Schedule() {
  const { month, year, teamAbbrev, teamSchedule, teamFullName } =
    useRouteLoaderData(
      "routes/team.schedule.($teamAbbrev).($year).($month)",
    ) as TeamScheduleData;

  const submit = useSubmit();

  const [selectedMonth, setSelectedMonth] = useState(month);
  const [selectedYear, setSelectedYear] = useState(year);
  const [selectedMonthData, setSelectedMonthData] = useState(
    getMonthData(selectedMonth, selectedYear),
  );
  const [showMontYearSelector, setShowMonthYearSelector] = useState(false);

  const isStartofSeason = selectedMonth - 1 === 8;
  const isEndofSeason = selectedMonth - 1 === 5;

  useEffect(() => {
    setSelectedMonthData(getMonthData(selectedMonth, selectedYear));
  }, [selectedMonth, selectedYear]);

  return (
    <div className="relative overflow-x-scroll">
      <div className="flex items-center border-b border-dashed pb-4 pl-4 pt-4">
        <img
          src={getLogo(teamAbbrev)}
          alt={`${teamAbbrev} Logo}`}
          className="w-16"
        />
        <h1 className="pl-2 text-2xl font-black tracking-tight md:text-4xl">
          {teamFullName}
        </h1>
      </div>

      <table className="w-full bg-white text-black transition-all md:h-full">
        <thead>
          <tr>
            <th colSpan={1}>
              <button
                className={cn(
                  "h-full w-full cursor-pointer py-4 hover:bg-slate-200",
                  {
                    hidden: isStartofSeason,
                  },
                )}
                onClick={() => {
                  let selectedYearToPass = selectedYear;
                  let monthToSubtract = selectedMonth - 1;

                  if (monthToSubtract === 0) {
                    monthToSubtract = 12;
                    selectedYearToPass = selectedYearToPass - 1;
                    setSelectedYear(selectedYearToPass);
                  }

                  setSelectedMonth(monthToSubtract);

                  submit(
                    {
                      selectedYear: selectedYearToPass,
                      selectedMonth: monthToSubtract,
                    },
                    {
                      encType: "multipart/form-data",
                      method: "post",
                    },
                  );
                }}
              >
                &#9664;
              </button>
            </th>
            <th colSpan={5} className="relative cursor-pointer">
              <button
                className="h-full w-full cursor-pointer py-4 hover:bg-slate-200"
                onClick={() => setShowMonthYearSelector(!showMontYearSelector)}
              >
                {selectedMonthData.dateStr}
              </button>
              {showMontYearSelector ? (
                <div className="flex justify-center">
                  <MonthYearSelector
                    setShowMonthYearSelector={setShowMonthYearSelector}
                    month={selectedMonth}
                    year={selectedYear}
                  />
                </div>
              ) : null}
            </th>
            <th colSpan={1}>
              <button
                className={cn(
                  "h-full w-full cursor-pointer py-4 hover:bg-slate-200",
                  {
                    hidden: isEndofSeason,
                  },
                )}
                onClick={() => {
                  let monthToAdd = selectedMonth + 1;
                  let selectedYearToPass = selectedYear;

                  if (monthToAdd > 12) {
                    monthToAdd = 1;
                    selectedYearToPass += 1;
                    setSelectedYear(selectedYearToPass);
                  }

                  setSelectedMonth(monthToAdd);

                  submit(
                    {
                      selectedYear: selectedYearToPass,
                      selectedMonth: monthToAdd,
                    },
                    {
                      encType: "multipart/form-data",
                      method: "post",
                    },
                  );
                }}
              >
                &#9654;
              </button>
            </th>
          </tr>
          <tr className="text-xs md:text-sm">
            <th>Sunday</th>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wedneday</th>
            <th>Thursday</th>
            <th>Friday</th>
            <th>Saturday</th>
          </tr>
        </thead>
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
                        "group w-24 cursor-pointer border text-center md:h-10 md:w-20 md:p-1",
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
                      <Link
                        prefetch="intent"
                        to={`/game/${game?.id}`}
                        className="flex h-16 w-16 flex-col p-1 md:h-32 md:w-full md:px-2 md:pt-0"
                      >
                        <div className="flex justify-between">
                          <div
                            className={cn(
                              "flex h-4 w-4 items-center justify-center pl-2 text-left text-[0.55rem] md:h-6 md:w-6 md:text-[0.70rem] md:text-xs",
                              {
                                "self-start rounded-full bg-blue-600 p-2 font-bold text-white":
                                  getTodaysDate() === day?.dateShort,
                              },
                            )}
                          >
                            {day?.dayNumber}
                          </div>
                          {isLive ? (
                            <div className="text-xs font-semibold md:text-sm">
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
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
