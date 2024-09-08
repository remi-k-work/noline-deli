// other libraries
import { isValid, startOfDay, subDays } from "date-fns";
import { formatDate } from "./formatters";

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
    startDate: startOfDay(subDays(new Date(), 1)),
    endDate: new Date(),
  },
  LAST_7_DAYS: {
    label: "Last 7 Days",
    startDate: startOfDay(subDays(new Date(), 6)),
    endDate: new Date(),
  },
  LAST_MONTH: {
    label: "Last Month",
    startDate: startOfDay(subDays(new Date(), 29)),
    endDate: new Date(),
  },
  LAST_3_MONTHS: {
    label: "Last 3 Months",
    startDate: startOfDay(subDays(new Date(), 89)),
    endDate: new Date(),
  },
  LAST_YEAR: {
    label: "Last Year",
    startDate: startOfDay(subDays(new Date(), 364)),
    endDate: new Date(),
  },
};

export function getRangeOption(range?: string, from?: string, to?: string) {
  if (!range) {
    const startDate = new Date(from ?? "");
    const endDate = new Date(to ?? "");
    if (!isValid(startDate) || !isValid(endDate)) return;

    return { label: `${formatDate(startDate)} - ${formatDate(endDate)}`, startDate, endDate };
  }

  return RANGE_OPTIONS[range as keyof typeof RANGE_OPTIONS];
}
