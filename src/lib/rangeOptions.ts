// other libraries
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

export const RANGE_OPTIONS: RangeOptions = {
  LAST_24_HOURS: {
    label: "Last 24 Hours",
    startDate: subHours(new Date(), 24),
    endDate: new Date(),
  },
  LAST_7_DAYS: {
    label: "Last 7 Days",
    startDate: subDays(new Date(), 7),
    endDate: new Date(),
  },
  LAST_MONTH: {
    label: "Last Month",
    startDate: subMonths(new Date(), 1),
    endDate: new Date(),
  },
  LAST_3_MONTHS: {
    label: "Last 3 Months",
    startDate: subMonths(new Date(), 3),
    endDate: new Date(),
  },
  LAST_YEAR: {
    label: "Last Year",
    startDate: subYears(new Date(), 1),
    endDate: new Date(),
  },
};

// Create a properly scaled time axis with the appropriate tick unit for a given time range
export function createTimeAxis(rangeOption?: RangeOption, startDate?: Date, endDate?: Date) {
  // Select either the predefined range or a custom time range
  rangeOption && ({ startDate, endDate } = rangeOption);
  if (!startDate || !endDate) return {};

  // "Last 24 Hours" selected range or a custom range inside that boundary
  if (differenceInHours(endDate, startDate) <= 24) {
    return {
      timeAxis: eachHourOfInterval(interval(startDate, endDate)),
      isSame: isSameHour,
      format: new Intl.DateTimeFormat("en", { hour: "numeric", hourCycle: "h12", timeZone: "UTC" }).format,
    };
  }

  // "Last 7 Days" selected range or a custom range inside that boundary
  if (differenceInDays(endDate, startDate) <= 7) {
    return {
      timeAxis: eachDayOfInterval(interval(startDate, endDate)),
      isSame: isSameDay,
      format: new Intl.DateTimeFormat("en", { weekday: "short", timeZone: "UTC" }).format,
    };
  }

  // "Last Month" selected range or a custom range inside that boundary
  if (differenceInMonths(endDate, startDate) <= 1) {
    return {
      timeAxis: eachDayOfInterval(interval(startDate, endDate)),
      isSame: isSameDay,
      format: new Intl.DateTimeFormat("en", { month: "short", day: "numeric", timeZone: "UTC" }).format,
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

        return `${new Intl.DateTimeFormat("en", { month: "short", day: "numeric", timeZone: "UTC" }).format(start)} - ${new Intl.DateTimeFormat("en", { month: "short", day: "numeric", timeZone: "UTC" }).format(end)}`;
      },
    };
  }

  // "Last Year" selected range or a custom range inside that boundary
  if (differenceInYears(endDate, startDate) <= 1) {
    return {
      timeAxis: eachMonthOfInterval(interval(startDate, endDate)),
      isSame: isSameMonth,
      format: new Intl.DateTimeFormat("en", { month: "short", timeZone: "UTC" }).format,
    };
  }

  // Anything beyond the one-year boundary
  return {
    timeAxis: eachYearOfInterval(interval(startDate, endDate)),
    isSame: isSameYear,
    format: new Intl.DateTimeFormat("en", { year: "numeric", timeZone: "UTC" }).format,
  };
}
