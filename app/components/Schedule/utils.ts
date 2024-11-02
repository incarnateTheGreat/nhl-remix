type MonthDataType = {
  date: Date;
  index: number;
  dayNumOfWeek: number;
  dayNumber: number;
  dateShort: string;
};

type GetAllDaysInMonthType = {
  dateStr: string;
  monthData: MonthDataType[];
};

const getAllDaysInMonth = (
  month: number,
  year: number
): GetAllDaysInMonthType => {
  const monthData = Array.from(
    { length: new Date(year, month + 1, 0).getDate() }, // Get the total number of days in the month selected.
    (_, index) => {
      const date = new Date(year, month, index + 1);

      const dayStr = date.toLocaleString("en-US", {
        day: "2-digit",
      });

      const monthStr = date.toLocaleString("en-US", {
        month: "numeric",
      });

      const yearStr = date.getUTCFullYear();

      return {
        date,
        index,
        dayNumOfWeek: date.getDay() + 1,
        dayNumber: index + 1,
        dateShort: `${yearStr}-${monthStr}-${dayStr}`,
      };
    }
  ) as MonthDataType[];

  const date = new Date(year, month);

  const dateStr = date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return {
    dateStr,
    monthData,
  };
};

const getMonthData = (month: number, year: number) => {
  const { monthData, dateStr } = getAllDaysInMonth(month, year);

  // Get the first day number of the week and use this to get the number of blank dates at the start of the calendar.
  // eg. "dayNumOfWeek" is 5, which means there will be 4 blank dates ahead to populate the first week of the calendar.
  const prePrendedElements = monthData[0].dayNumOfWeek - 1;

  const newData = [...new Array(prePrendedElements), ...monthData];

  const weeks: MonthDataType[][] = [];
  let weekToAdd: MonthDataType[] = [];

  // Populate "weeks" array with "weekToAdd" childten, each with 7 elements representing the days of the week.
  for (let i = 0; i < newData.length; i++) {
    weekToAdd.push(newData[i]);

    if (weekToAdd.length === 7 || newData.length === i + 1) {
      weeks.push(weekToAdd);
      weekToAdd = [];
    }
  }

  return {
    dateStr,
    weeks,
  };
};

export { getAllDaysInMonth, getMonthData };
