// other libraries
import { FilterFn } from "@tanstack/react-table";
import { RangeOption } from "./rangeOptions";

const dateBetweenFilterFn: FilterFn<any> = (row, columnId, value: RangeOption) => {
  const date = row.getValue(columnId);
  if (!(date instanceof Date)) {
    console.error(`Value of column "${columnId}" is expected to be a date, but got ${date}`);
    return false;
  }

  const { startDate: start, endDate: end } = value;
  if (!(start instanceof Date || start === undefined) || !(end instanceof Date || end === undefined)) {
    console.error(`Filter value of column "${columnId}" is expected to be an array of two dates, but got ${value}`);
    return false;
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
