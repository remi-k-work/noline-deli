"use client";

// next
import { useRouter } from "next/navigation";

// other libraries
import useSearchParamsState from "../../../hooks/useSearchParamsState";
import { RANGE_OPTIONS } from "@/lib/rangeOptions";

// components
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// types
interface TimeRangeOptionsProps {
  chartType: "obd" | "rbi" | "cbd";
  rangeKey?: string;
}

export default function TimeRangeOptions({ chartType, rangeKey }: TimeRangeOptionsProps) {
  const searchParamsState = useSearchParamsState();
  const { replace } = useRouter();

  return (
    <Select
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
        <SelectValue placeholder="Choose Range" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="All Time">All Time</SelectItem>
        {Object.entries(RANGE_OPTIONS).map(([key, rangeOption]) => (
          <SelectItem key={key} value={key}>
            {rangeOption.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
