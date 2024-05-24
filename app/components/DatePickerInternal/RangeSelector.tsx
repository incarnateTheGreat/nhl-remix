import { useState } from "react";
import DatePicker from "react-datepicker";

import { GameWeek } from "~/types";

type RangeSelectorProps = {
  gameWeek: GameWeek[];
};

// type ValuePiece = Date | null;

// type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function RangeSelector({ gameWeek }: RangeSelectorProps) {
  const [startDate, setStartDate] = useState(new Date());

  //   const [lastDayMonth, lastDayNumber] =
  //     gameWeek[gameWeek.length - 1].label.split(" ");

  //   let str = "";

  //   if (firstDayMonth === lastDayMonth) {
  //     str = `${firstDayMonth} ${firstDayNumber} - ${lastDayNumber}`;
  //   } else {
  //     str = `${firstDayMonth} ${firstDayNumber} - ${lastDayMonth} ${lastDayNumber}`;
  //   }

  return (
    <div className="self-start rounded border border-[#e3e3e3] px-4 py-2 text-sm font-semibold">
      {/* {str} */}
      {/* <DatePicker onChange={onChange} value={value} /> */}
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />
    </div>
  );
}
