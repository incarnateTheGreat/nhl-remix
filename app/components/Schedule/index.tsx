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
        {selectedMonthData?.weeks.map((week) => {
          return (
            <tr key={getRandomKey()}>
              {week.map((day) => {
                const game = games?.[day?.dateShort];

                let opponent;

                if (game) {
                  opponent =
                    game.awayTeam.abbrev === teamAbbrev
                      ? game.homeTeam
                      : game.awayTeam;

                  // game.awayTeam.abbrev === teamAbbrev
                  // ? `vs. ${game.homeTeam.abbrev}`
                  // : `@ ${game.awayTeam.abbrev}`;
                }

                return (
                  <td
                    role="gridcell"
                    className={cn(
                      "cursor-pointer border text-center hover:bg-slate-200 md:h-10 md:w-20",
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
                    <div className="flex h-[6.6rem] flex-col">
                      <div className="-mt-2 pl-2 text-left">
                        {day?.dayNumber}
                      </div>
                      <div className="flex w-full flex-1 items-center justify-center">
                        {opponent ? (
                          <img
                            src={opponent?.logo}
                            alt={opponent?.abbrev}
                            className="mx-auto h-10 w-10 rounded-full bg-slate-300 p-2 md:h-20 md:w-20"
                          />
                        ) : (
                          <>&nbsp;</>
                        )}
                      </div>

                      {/* {opponent} */}
                    </div>
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
