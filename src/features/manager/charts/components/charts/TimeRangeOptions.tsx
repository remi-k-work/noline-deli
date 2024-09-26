"use client";

// react
import { useState } from "react";

// next
import { useRouter } from "next/navigation";

// other libraries
import useSearchParamsState from "../../../hooks/useSearchParamsState";
import { RANGE_OPTIONS } from "@/lib/rangeOptions";
import { DateRange } from "react-day-picker";

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
  const searchParamsState = useSearchParamsState();
  const { replace } = useRouter();

  // The controlled open state of the select
  const [open, setOpen] = useState(false);

  // Custom date range option selected from the calendar
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  // Use the predefined range key value to extract the relevant range option
  const rangeOption = searchParamsState.rangeOptionFromKey(rangeKey);

  return (
    <>
      <small className="mb-2 block text-[var(--text-2)]">
        <span className="flex items-center justify-between gap-2">
          <CalendarDateRangeIcon className="h-5 w-5" />
          {rangeOption ? rangeOption.startDate.toDateString() : startDate.toDateString()}
        </span>
        <span className="flex items-center justify-between gap-2">
          <CalendarDateRangeIcon className="h-5 w-5" />
          {rangeOption ? rangeOption.endDate.toDateString() : endDate.toDateString()}
        </span>
      </small>
      <Select
        open={open}
        onOpenChange={setOpen}
        name={"rangeOptions"}
        value={rangeKey ?? "All Time"}
        onValueChange={(value) =>
          replace(
            chartType === "obd"
              ? searchParamsState.chartObdRangeChanged(value)
              : chartType === "rbi"
                ? searchParamsState.chartRbiRangeChanged(value)
                : searchParamsState.chartCbdRangeChanged(value),
            { scroll: false },
          )
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
              replace(
                chartType === "obd"
                  ? searchParamsState.chartObdCustomRangeProvided(dateRange)
                  : chartType === "rbi"
                    ? searchParamsState.chartRbiCustomRangeProvided(dateRange)
                    : searchParamsState.chartCbdCustomRangeProvided(dateRange),
                { scroll: false },
              );
            }}
          />
        </SelectContent>
      </Select>
    </>
  );
}
