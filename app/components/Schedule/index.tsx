import { useNavigate, useSubmit } from "@remix-run/react";
import { useEffect, useState } from "react";
import { ScheduleGamesWithIds } from "types/schedule";

import {
  cn,
  convertTime,
  getRandomKey,
  isGameActive,
  isGameComplete,
  isPreGame,
} from "~/utils";

import { getMonthData } from "./utils";

type ScheduleProps = {
  teamAbbrev: string;
  games: ScheduleGamesWithIds;
};

export default function Schedule({ teamAbbrev, games }: ScheduleProps) {
  const navigate = useNavigate();
  const submit = useSubmit();

  const defaultDate = new Date();
  const defaultMonth = defaultDate.getUTCMonth();
  const defaultYear = defaultDate.getFullYear();

  const [selectedMonth, setSelectedMonth] = useState(defaultMonth);
  const [selectedYear, setSelectedYear] = useState(defaultYear);
  const [selectedMonthData, setSelectedMonthData] = useState(
    getMonthData(selectedMonth, selectedYear),
  );

  useEffect(() => {
    setSelectedMonthData(getMonthData(selectedMonth, selectedYear));
  }, [selectedMonth, selectedYear]);

  return (
    <div>
      <table className="w-full bg-white text-black md:h-full">
        <thead>
          <tr>
            <th
              colSpan={1}
              className="cursor-pointer"
              onClick={() => {
                const selectedYearToPass = selectedYear;
                let monthToSubtract = selectedMonth - 1;

                if (monthToSubtract === 0) {
                  monthToSubtract = 12;
                  setSelectedYear(selectedYearToPass - 1);
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
              className="cursor-pointer"
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
          <tr>
            <th>S</th>
            <th>M</th>
            <th>T</th>
            <th>W</th>
            <th>T</th>
            <th>F</th>
            <th>S</th>
          </tr>
        </thead>
        <tbody className="relative">
          {selectedMonthData?.weeks.map((week) => {
            return (
              <tr key={getRandomKey()}>
                {week.map((day) => {
                  const game = games?.[day?.dateShort];

                  console.log(game);

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
                        "group h-20 w-40 cursor-pointer border border-t p-1 text-center md:h-10 md:w-20",
                        {
                          "bg-blue-950 text-white hover:bg-blue-900":
                            opponent?.isAway,
                          "bg-white hover:bg-gray-100": opponent?.isHome,
                          "pointer-events-none bg-gray-100": !opponent,
                        },
                      )}
                      key={getRandomKey()}
                      data-date={day?.dateShort}
                      onClick={() => {
                        navigate(`/game/${game?.id}`);
                      }}
                    >
                      <div className="flex h-full flex-col">
                        <div className="pl-2 text-left">{day?.dayNumber}</div>
                        <div
                          className={cn(
                            "mb-3 flex w-full flex-1 items-center justify-center",
                          )}
                        >
                          {opponent ? (
                            <div className="flex flex-col">
                              <img
                                src={opponent?.logo}
                                alt={opponent?.abbrev}
                                className={cn(
                                  "mx-auto h-10 w-10 rounded-full p-2 md:h-14 md:w-14",
                                  {
                                    "bg-gray-700 group-hover:bg-gray-600":
                                      opponent.isAway,
                                    "border border-slate-600": opponent.isAway,
                                    "bg-slate-300": opponent.isHome,
                                  },
                                )}
                              />
                              <div className="mt-1 text-xs font-semibold md:text-sm">
                                {display}
                                {day?.dateShort}
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
