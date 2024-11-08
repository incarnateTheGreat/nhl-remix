import { useNavigate, useRouteLoaderData, useSubmit } from "@remix-run/react";
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
  const { allSeasons, teamAbbrev } = useRouteLoaderData(
    "routes/team.schedule.($teamAbbrev).($year).($month)",
  ) as TeamScheduleData;

  const [showMonthSelector, setShowMonthSelector] = useState(true);
  const [showYearSelector, setShowYearSelector] = useState(false);

  const [selectedMonth, setSelectedMonth] = useState(month);
  const [selectedYear, setSelectedYear] = useState(year);

  const submit = useSubmit();

  const navigate = useNavigate();

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

  const handleYear = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const elem = e.target as HTMLButtonElement;
    let year;

    if (elem.textContent) {
      year = +elem.textContent;
      setSelectedYear(year);
      setShowYearSelector(false);
      setShowMonthSelector(true);
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
    <div
      id="monthYearSelector"
      className="border-red-green absolute z-20 flex h-1/2 w-full flex-col items-center border"
    >
      <div className="absolute z-10 flex w-2/3 flex-col rounded bg-white shadow-lg md:w-1/3">
        {showMonthSelector ? (
          <div className="relative z-10 bg-white shadow-lg">
            <div className="flex justify-center bg-gray-100">
              <button
                className="flex justify-self-center bg-gray-100 font-semibold text-blue-500 hover:text-black hover:underline"
                onClick={() => {
                  setShowYearSelector(!showYearSelector);
                  setShowMonthSelector(false);
                }}
              >
                {selectedYear}
              </button>
            </div>
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
          <div className="relative z-10 bg-white shadow-lg">
            <div className="grid h-56 w-full grid-cols-3 grid-rows-3 overflow-y-scroll font-semibold text-blue-500">
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
                    onClick={handleYear}
                  >
                    {season}
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}

        <div className="flex justify-center bg-gray-100">
          <button
            className="flex justify-self-center bg-gray-100 font-semibold text-blue-500 hover:text-black hover:underline"
            onClick={() => {
              navigate(`/team/schedule/${teamAbbrev}`);
            }}
          >
            Today
          </button>
        </div>
      </div>
    </div>
  );
}
