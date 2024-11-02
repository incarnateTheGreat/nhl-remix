import { useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import { ScheduleGamesWithIds } from "types/schedule";

import { cn, getRandomKey } from "~/utils";

import { getMonthData } from "./utils";

type ScheduleProps = {
  date?: string;
  teamAbbrev: string;
  games: ScheduleGamesWithIds;
};

export default function Schedule({ date, teamAbbrev, games }: ScheduleProps) {
  const navigate = useNavigate();

  const defaultDate = new Date(date);
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
      <table className="h-full w-full bg-white text-black">
        <thead>
          <tr>
            <th
              colSpan={1}
              className="cursor-pointer"
              onClick={() => {
                let monthToSubtract = selectedMonth - 1;

                if (monthToSubtract === 0) {
                  monthToSubtract = 12;
                  setSelectedYear(selectedYear - 1);
                }

                setSelectedMonth(monthToSubtract);
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

                if (monthToAdd > 12) {
                  monthToAdd = 1;
                  setSelectedYear(selectedYear + 1);
                }

                setSelectedMonth(monthToAdd);
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
          <div className="absolute hidden h-full w-full bg-white">
            <div className="grid w-full grid-cols-3 font-semibold text-blue-500">
              <span className="flex cursor-pointer items-center justify-center hover:bg-blue-500 hover:text-white">
                2022
              </span>
              <span className="flex cursor-pointer items-center justify-center hover:bg-blue-500 hover:text-white">
                2023
              </span>
              <span className="flex cursor-pointer items-center justify-center hover:bg-blue-500 hover:text-white">
                2024
              </span>
            </div>
          </div>

          {selectedMonthData?.weeks.map((week) => {
            return (
              <tr key={getRandomKey()}>
                {week.map((day) => {
                  const game = games?.[day?.dateShort];

                  let opponent;

                  if (game) {
                    opponent =
                      game.awayTeam.abbrev === teamAbbrev
                        ? `vs. ${game.homeTeam.abbrev}`
                        : `@ ${game.awayTeam.abbrev}`;
                  }

                  return (
                    <td
                      role="gridcell"
                      className={cn(
                        "h-28 w-20 cursor-pointer border p-1 text-center hover:bg-slate-200",
                        {
                          "bg-slate-700 text-white": date === day?.dateShort,
                        },
                      )}
                      key={getRandomKey()}
                      data-date={day?.dateShort}
                      onClick={(e) => {
                        navigate(`/${e.currentTarget.dataset.date}`);
                      }}
                    >
                      {opponent}
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
