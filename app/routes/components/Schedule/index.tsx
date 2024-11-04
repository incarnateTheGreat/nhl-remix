import { useNavigate, useRouteLoaderData, useSubmit } from "@remix-run/react";
import { useEffect, useState } from "react";

import { TeamScheduleData } from "~/routes/team.($teamAbbrev).($year).($month)";
import {
  cn,
  convertTime,
  getRandomKey,
  isGameActive,
  isGameComplete,
  isPreGame,
} from "~/utils";

import { getMonthData } from "./utils";

export default function Schedule() {
  const { month, year, teamAbbrev, teamSchedule } = useRouteLoaderData(
    "routes/team.($teamAbbrev).($year).($month)",
  ) as TeamScheduleData;

  const navigate = useNavigate();
  const submit = useSubmit();

  const [selectedMonth, setSelectedMonth] = useState(month);
  const [selectedYear, setSelectedYear] = useState(year);
  const [selectedMonthData, setSelectedMonthData] = useState(
    getMonthData(selectedMonth, selectedYear),
  );

  useEffect(() => {
    setSelectedMonthData(getMonthData(selectedMonth, selectedYear));
  }, [selectedMonth, selectedYear]);

  return (
    <div className="overflow-x-scroll">
      <table className="w-full bg-white text-black transition-all md:h-full">
        <thead>
          <tr>
            <th
              colSpan={1}
              className="cursor-pointer py-4 hover:bg-slate-200"
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
            </th>
            <th colSpan={5} className="cursor-pointer">
              {selectedMonthData.dateStr}
            </th>
            <th
              colSpan={1}
              className="cursor-pointer py-4 hover:bg-slate-200"
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
                      display = "yeah";
                    } else if (isGameComplete(game.gameState)) {
                      const awayScore = game.awayTeam.score;
                      const homeScore = game.homeTeam.score;

                      const result =
                        teamSelect.score > opponent.score ? "W" : "L";

                      const scoreline =
                        homeScore > awayScore
                          ? `${homeScore}-${awayScore}`
                          : `${awayScore}-${homeScore}`;

                      display = `${result} ${scoreline}`;
                    }
                  }

                  return (
                    <td
                      role="gridcell"
                      className={cn(
                        "group cursor-pointer border text-center md:h-10 md:w-20 md:p-1",
                        {
                          "bg-blue-950 text-white hover:bg-blue-900":
                            opponent?.isAway,
                          "bg-white hover:bg-gray-200": opponent?.isHome,
                          "pointer-events-none bg-gray-100": !opponent,
                        },
                      )}
                      key={getRandomKey()}
                      data-date={day?.dateShort}
                      onClick={() => {
                        navigate(`/game/${game?.id}`);
                      }}
                    >
                      <div className="flex h-16 flex-col md:h-32 md:w-full">
                        <div className="pl-2 text-left text-[0.70rem] md:text-xs">
                          {day?.dayNumber}
                        </div>
                        <div
                          className={cn(
                            "mb-3 flex w-full flex-1 items-center justify-center",
                          )}
                        >
                          {opponent ? (
                            <div className="flex w-full flex-col px-2 md:justify-center">
                              <img
                                src={opponent?.logo}
                                alt={opponent?.abbrev}
                                className={cn(
                                  "mx-auto hidden h-8 w-8 rounded-full p-1 md:block md:h-14 md:w-14 md:p-2",
                                  {
                                    "bg-gray-700 group-hover:bg-gray-600":
                                      opponent.isAway,
                                    "border border-slate-600": opponent.isAway,
                                    "bg-slate-300": opponent.isHome,
                                  },
                                )}
                              />
                              <div className="text-[0.70rem] md:hidden">
                                BOS
                              </div>
                              <div className="mt-0 text-[0.55rem] font-semibold md:mt-2 md:text-xs">
                                {display}
                              </div>
                            </div>
                          ) : (
                            <>&nbsp;</>
                          )}
                        </div>
                      </div>
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
