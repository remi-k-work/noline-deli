/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */

// other libraries
import { FilterFn } from "@tanstack/react-table";
import { RangeOption } from "./rangeOptions";
import { DateRange } from "react-day-picker";
import { endOfDay, startOfDay } from "date-fns";

const dateBetweenFilterFn: FilterFn<any> = (row, columnId, value: RangeOption | DateRange) => {
  const date = row.getValue(columnId);
  if (!(date instanceof Date)) {
    console.error(`Value of column "${columnId}" is expected to be a date, but got ${date}`);
    return false;
  }

  let start: Date | undefined;
  let end: Date | undefined;

  // To distinguish between RangeOption and DateRange types, use the "in" operator narrowing
  if ("label" in value) ({ startDate: start, endDate: end } = value);
  else ({ from: start, to: end } = value);

  if (!(start instanceof Date || start === undefined) || !(end instanceof Date || end === undefined)) {
    console.error(`Filter value of column "${columnId}" is expected to be an array of two dates, but got ${value}`);
    return false;
  }

  // Has the same day been chosen as the start and end dates?
  if (start && end && start.getTime() === end.getTime()) {
    // Yes, divide the day into 24 hours (from beginning to end)
    start = startOfDay(start);
    end = endOfDay(end);
  }

  // If one filter defined and date is undefined, filter it
  if ((start || end) && !date) {
    return false;
  }

  if (start && !end) {
    return date.getTime() >= start.getTime();
  } else if (!start && end) {
    return date.getTime() <= end.getTime();
  } else if (start && end) {
    return date.getTime() >= start.getTime() && date.getTime() <= end.getTime();
  }

  return true;
};
dateBetweenFilterFn.autoRemove;

export { dateBetweenFilterFn };
