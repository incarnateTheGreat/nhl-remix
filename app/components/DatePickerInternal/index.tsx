// import { DatePicker, DatePickerInput } from "@carbon/react";
import { Link } from "@remix-run/react";
// import "carbon-components/css/carbon-components.css";
import { GameWeek } from "types/types";

import { cn } from "~/utils";

type DatePickerProps = {
  dateToFilter: string;
  gameWeek: GameWeek[];
};

export default function DatePickerInternal({
  dateToFilter,
  gameWeek,
}: DatePickerProps) {
  return (
    <div className="mb-4 flex flex-col">
      {/* <RangeSelector gameWeek={gameWeek} />
       */}

      {/* <DatePicker datePickerType="simple">
        <DatePickerInput placeholder="mm/dd/yyyy" id="id" labelText="Range" />
      </DatePicker> */}
      {/* <DatePicker datePickerType="single">
        <DatePickerInput
          placeholder="mm/dd/yyyy"
          labelText="Date Picker label"
          id="date-picker-single"
        />
      </DatePicker> */}

      <div className="mt-4 flex overflow-x-auto">
        {gameWeek.map((dateObj) => {
          const { label, date } = dateObj;

          return (
            <Link
              key={date}
              to={`/${date}`}
              className={cn("navLink mr-1.5", {
                selected: date === dateToFilter,
              })}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
