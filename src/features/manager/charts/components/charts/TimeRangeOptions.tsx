"use client";

// react
import { useState } from "react";

// other libraries
import useSearchParamsState from "../../../hooks/useSearchParamsState";
import { RANGE_OPTIONS } from "@/lib/rangeOptions";
import { DateRange } from "react-day-picker";
import { formatDate } from "@/lib/formatters";

// components
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CustomDateTrigger from "@/features/manager/components/CustomDateTrigger";

// assets
import { CalendarDateRangeIcon } from "@heroicons/react/24/solid";

// types
interface TimeRangeOptionsProps {
  chartType: "obd" | "rbi" | "cbd";
  rangeKey?: string;
  startDate: Date;
  endDate: Date;
}

export default function TimeRangeOptions({ chartType, rangeKey, startDate, endDate }: TimeRangeOptionsProps) {
  const {
    rangeOptionFromKey,
    chartObdRangeChanged,
    chartRbiRangeChanged,
    chartCbdRangeChanged,
    chartObdCustomRangeProvided,
    chartRbiCustomRangeProvided,
    chartCbdCustomRangeProvided,
  } = useSearchParamsState();

  // The controlled open state of the select
  const [open, setOpen] = useState(false);

  // Custom date range option selected from the calendar
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  // Use the predefined range key value to extract the relevant range option
  const rangeOption = rangeOptionFromKey(rangeKey);

  return (
    <>
      <small className="mb-2 block text-[var(--text-2)]">
        <span className="flex items-center justify-between gap-2">
          <CalendarDateRangeIcon className="h-5 w-5" />
          {rangeOption ? formatDate(rangeOption.startDate) : formatDate(startDate)}
        </span>
        <span className="flex items-center justify-between gap-2">
          <CalendarDateRangeIcon className="h-5 w-5" />
          {rangeOption ? formatDate(rangeOption.endDate) : formatDate(endDate)}
        </span>
      </small>
      <Select
        open={open}
        onOpenChange={setOpen}
        name={"rangeOptions"}
        value={rangeKey ?? "All Time"}
        onValueChange={(value) =>
          chartType === "obd" ? chartObdRangeChanged(value) : chartType === "rbi" ? chartRbiRangeChanged(value) : chartCbdRangeChanged(value)
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Choose Range" aria-label={rangeKey}>
            {rangeOption ? rangeOption.label : "All Time"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All Time">All Time</SelectItem>
          {Object.entries(RANGE_OPTIONS).map(([rangeKey, rangeOption]) => (
            <SelectItem key={rangeKey} value={rangeKey}>
              {rangeOption.label}
            </SelectItem>
          ))}
          <CustomDateTrigger
            dateRange={dateRange}
            setOpen={setOpen}
            onRangePicked={(dateRange) => {
              setDateRange(dateRange);
              if (chartType === "obd") {
                chartObdCustomRangeProvided(dateRange);
              } else if (chartType === "rbi") {
                chartRbiCustomRangeProvided(dateRange);
              } else {
                chartCbdCustomRangeProvided(dateRange);
              }
            }}
          />
        </SelectContent>
      </Select>
    </>
  );
}
