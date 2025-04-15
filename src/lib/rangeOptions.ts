// other libraries
import { convertLocalDateToUTCIgnoringTimezone } from "./formatters";
import {
  differenceInDays,
  differenceInHours,
  differenceInMonths,
  differenceInYears,
  eachDayOfInterval,
  eachHourOfInterval,
  eachMonthOfInterval,
  eachWeekOfInterval,
  eachYearOfInterval,
  endOfWeek,
  interval,
  isSameDay,
  isSameHour,
  isSameMonth,
  isSameWeek,
  isSameYear,
  max,
  min,
  startOfWeek,
  subDays,
  subHours,
  subMonths,
  subYears,
} from "date-fns";

// types
export interface RangeOption {
  label: string;
  startDate: Date;
  endDate: Date;
}

interface RangeOptions {
  [index: string]: RangeOption;
}

// Keep dates in utc for consistency and calculations, as "new Date()" constructor is timezone-aware
// The returned date and time values are adjusted to the user/server local time zone (we do not want that)
export const RANGE_OPTIONS: RangeOptions = {
  LAST_24_HOURS: {
    label: "Last 24 Hours",
    startDate: convertLocalDateToUTCIgnoringTimezone(subHours(new Date(), 24)),
    endDate: convertLocalDateToUTCIgnoringTimezone(new Date()),
  },
  LAST_7_DAYS: {
    label: "Last 7 Days",
    startDate: convertLocalDateToUTCIgnoringTimezone(subDays(new Date(), 7)),
    endDate: convertLocalDateToUTCIgnoringTimezone(new Date()),
  },
  LAST_MONTH: {
    label: "Last Month",
    startDate: convertLocalDateToUTCIgnoringTimezone(subMonths(new Date(), 1)),
    endDate: convertLocalDateToUTCIgnoringTimezone(new Date()),
  },
  LAST_3_MONTHS: {
    label: "Last 3 Months",
    startDate: convertLocalDateToUTCIgnoringTimezone(subMonths(new Date(), 3)),
    endDate: convertLocalDateToUTCIgnoringTimezone(new Date()),
  },
  LAST_YEAR: {
    label: "Last Year",
    startDate: convertLocalDateToUTCIgnoringTimezone(subYears(new Date(), 1)),
    endDate: convertLocalDateToUTCIgnoringTimezone(new Date()),
  },
};

// Create a properly scaled time axis with the appropriate tick unit for a given time range
export function createTimeAxis(rangeOption?: RangeOption, startDate?: Date, endDate?: Date) {
  // Select either the predefined range or a custom time range
  if (rangeOption) ({ startDate, endDate } = rangeOption);
  if (!startDate || !endDate) return {};

  // "Last 24 Hours" selected range or a custom range inside that boundary
  if (differenceInHours(endDate, startDate) <= 24) {
    return {
      timeAxis: eachHourOfInterval(interval(startDate, endDate)),
      isSame: isSameHour,
      format: new Intl.DateTimeFormat("en", { hour: "numeric", hourCycle: "h12" }).format,
    };
  }

  // "Last 7 Days" selected range or a custom range inside that boundary
  if (differenceInDays(endDate, startDate) <= 7) {
    return {
      timeAxis: eachDayOfInterval(interval(startDate, endDate)),
      isSame: isSameDay,
      format: new Intl.DateTimeFormat("en", { weekday: "short" }).format,
    };
  }

  // "Last Month" selected range or a custom range inside that boundary
  if (differenceInMonths(endDate, startDate) <= 1) {
    return {
      timeAxis: eachDayOfInterval(interval(startDate, endDate)),
      isSame: isSameDay,
      format: new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format,
    };
  }

  // "Last 3 Months" selected range or a custom range inside that boundary
  if (differenceInMonths(endDate, startDate) <= 3) {
    return {
      timeAxis: eachWeekOfInterval(interval(startDate, endDate)),
      isSame: isSameWeek,
      format: (date: Date) => {
        const start = max([startOfWeek(date), startDate]);
        const end = min([endOfWeek(date), endDate]);

        return `${new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(start)} - ${new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(end)}`;
      },
    };
  }

  // "Last Year" selected range or a custom range inside that boundary
  if (differenceInYears(endDate, startDate) <= 1) {
    return {
      timeAxis: eachMonthOfInterval(interval(startDate, endDate)),
      isSame: isSameMonth,
      format: new Intl.DateTimeFormat("en", { month: "short" }).format,
    };
  }

  // Anything beyond the one-year boundary
  return {
    timeAxis: eachYearOfInterval(interval(startDate, endDate)),
    isSame: isSameYear,
    format: new Intl.DateTimeFormat("en", { year: "numeric" }).format,
  };
}
