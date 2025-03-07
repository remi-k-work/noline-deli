// react
import { Dispatch, SetStateAction } from "react";

// other libraries
import { DateRange } from "react-day-picker";

// components
import { Button } from "@/components/ui/custom/button";
import ResponsiveDialogTrigger from "@/components/ResponsiveDialogTrigger";
import CustomDate from "./CustomDate";

// assets
import { CalendarDateRangeIcon } from "@heroicons/react/24/solid";

// types
interface CustomDateTriggerProps {
  dateRange?: DateRange;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onRangePicked: (dateRange: DateRange) => void;
}

export default function CustomDateTrigger({ dateRange, setOpen, onRangePicked }: CustomDateTriggerProps) {
  return (
    <ResponsiveDialogTrigger
      asChild
      trigger={
        <Button type="button" variant="outline">
          <CalendarDateRangeIcon className="mr-2 h-5 w-5" />
          Custom Date...
        </Button>
      }
      title={
        <>
          <CalendarDateRangeIcon width={32} height={32} />
          Custom Date
        </>
      }
      description="Calendar to pick a custom date range"
      content={<CustomDate dateRange={dateRange} setOpen={setOpen} onRangePicked={onRangePicked} />}
    />
  );
}
