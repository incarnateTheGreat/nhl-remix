import { useRouteLoaderData, useSubmit } from "@remix-run/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { MONTHS } from "~/constants";
import { TeamScheduleData } from "~/routes/team.schedule.($teamAbbrev).($year).($month)";
import { cn, getRandomKey } from "~/utils";

type MonthYearSelectorProps = {
  month: number;
  year: number;
  setShowMonthYearSelector: Dispatch<SetStateAction<boolean>>;
};

export default function MonthYearSelector({
  month,
  year,
  setShowMonthYearSelector,
}: MonthYearSelectorProps) {
  const { allSeasons } = useRouteLoaderData(
    "routes/team.schedule.($teamAbbrev).($year).($month)",
  ) as TeamScheduleData;

  const [showMonthSelector, setShowMonthSelector] = useState(true);
  const [showYearSelector, setShowYearSelector] = useState(false);

  const [selectedMonth, setSelectedMonth] = useState(month);
  const [selectedYear, setSelectedYear] = useState(year);

  const submit = useSubmit();

  const closePopupOnKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setShowMonthSelector(false);
    }
  };

  const closePopupOnClickAway = (e: MouseEvent) => {
    const monthYearSelector = document.getElementById("monthYearSelector");

    if (monthYearSelector) {
      const withinBoundaries = e.composedPath().includes(monthYearSelector);

      if (!withinBoundaries) {
        setShowMonthYearSelector(false);
      }
    }
  };

  const handleMonth = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const elem = e.target as HTMLButtonElement;
    let month;

    if (elem.textContent) {
      month = new Date(`${selectedYear}-${elem.textContent}`).getMonth() + 1;
      setSelectedMonth(month);
      setShowMonthSelector(false);

      submit(
        {
          selectedYear,
          selectedMonth: month,
        },
        {
          encType: "multipart/form-data",
          method: "post",
        },
      );
    }
  };

  const handleHistoricYear = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const elem = e.target as HTMLButtonElement;
    let year;

    if (elem.textContent) {
      year = +elem.textContent;
      setSelectedYear(year);
      setShowYearSelector(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", closePopupOnKeyDown);
    document.addEventListener("click", closePopupOnClickAway);

    return () => {
      document.removeEventListener("keydown", closePopupOnKeyDown);
      document.removeEventListener("click", closePopupOnClickAway);
    };
  }, [showMonthSelector]);

  return (
    <div id="monthYearSelector">
      {showMonthSelector ? (
        <div className="absolute z-10 w-full bg-white">
          <button
            className="flex justify-self-center"
            onClick={() => {
              setShowYearSelector(!showYearSelector);
            }}
          >
            {selectedYear}
          </button>
          <div className="grid w-full grid-cols-3 font-semibold text-blue-500">
            {MONTHS.map((month) => {
              const monthNum =
                new Date(`${selectedYear}-${month}`).getMonth() + 1;

              return (
                <button
                  key={getRandomKey()}
                  className={cn(
                    "flex cursor-pointer items-center justify-center hover:bg-blue-500 hover:text-white",
                    {
                      "bg-blue-500 text-white": monthNum === selectedMonth,
                    },
                  )}
                  onClick={handleMonth}
                >
                  {month}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      {showYearSelector ? (
        <div className="absolute z-10 w-full bg-white">
          <div className="grid w-full grid-cols-3 font-semibold text-blue-500">
            {allSeasons.map((season) => {
              return (
                <button
                  key={getRandomKey()}
                  className={cn(
                    "flex cursor-pointer items-center justify-center hover:bg-blue-500 hover:text-white",
                    {
                      "bg-blue-500 text-white": +season === selectedYear,
                    },
                  )}
                  onClick={handleHistoricYear}
                >
                  {season}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
