import { useRouteLoaderData, useSubmit } from "@remix-run/react";
import { useEffect, useState } from "react";

import { TeamScheduleData } from "~/routes/team.schedule.($teamAbbrev).($year).($month)";
import { cn } from "~/utils";

import MonthYearSelector from "../MonthYearSelector";
import Header from "./components/Header";
import TableBody from "./components/TableBody";
import { getMonthData } from "./utils";

export default function Schedule() {
  const { month, year } = useRouteLoaderData(
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
      <Header />

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
                <MonthYearSelector
                  setShowMonthYearSelector={setShowMonthYearSelector}
                  month={selectedMonth}
                  year={selectedYear}
                />
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
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <TableBody selectedMonthData={selectedMonthData} />
      </table>
    </div>
  );
}
