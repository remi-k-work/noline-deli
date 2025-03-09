// react
import { Dispatch, SetStateAction, useState } from "react";

// other libraries
import useMediaQuery from "@/hooks/useMediaQuery";
import { DateRange } from "react-day-picker";
import { convertLocalDateToUTCIgnoringTimezone, formatDate } from "@/lib/formatters";

// components
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/custom/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// assets
import { CalendarDateRangeIcon, HandThumbDownIcon, HandThumbUpIcon, InformationCircleIcon } from "@heroicons/react/24/solid";

// types
interface CustomDateProps {
  dateRange?: DateRange;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onRangePicked: (dateRange: DateRange) => void;
}

interface CalendarFooterProps {
  dateRange?: DateRange;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onRangePicked: (dateRange: DateRange) => void;
}

export default function CustomDate({ dateRange, setOpen, onRangePicked }: CustomDateProps) {
  const [currDateRange, setCurrDateRange] = useState<DateRange | undefined>(dateRange);

  // Small devices (landscape phones, less than 768px)
  const isSmall = useMediaQuery("(max-width: 767.98px)");

  return (
    <>
      <Calendar
        showOutsideDays
        fixedWeeks
        numberOfMonths={isSmall ? 1 : 2}
        mode="range"
        disabled={{ after: new Date() }}
        selected={currDateRange}
        defaultMonth={currDateRange?.from}
        onSelect={setCurrDateRange}
        className="m-auto w-fit"
      />
      <CalendarFooter dateRange={currDateRange} setOpen={setOpen} onRangePicked={onRangePicked} />
    </>
  );
}

function CalendarFooter({ dateRange, setOpen, onRangePicked }: CalendarFooterProps) {
  if (!dateRange) {
    return (
      <Alert>
        <InformationCircleIcon width={24} height={24} />
        <AlertTitle>Please select one or more days to specify a range</AlertTitle>
      </Alert>
    );
  }

  return (
    <Alert>
      <InformationCircleIcon width={24} height={24} />
      <AlertTitle>You selected</AlertTitle>
      <AlertDescription className="flex items-center justify-between gap-4">
        <header className="flex-3/4">
          {dateRange.from && (
            <span className="flex items-center gap-2">
              <CalendarDateRangeIcon width={24} height={24} />
              {formatDate(dateRange.from)}
            </span>
          )}
          {dateRange.to ? (
            <span className="flex items-center gap-2">
              <CalendarDateRangeIcon width={24} height={24} />
              {formatDate(dateRange.to)}
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <CalendarDateRangeIcon width={24} height={24} />
              Today
            </span>
          )}
        </header>
        <footer className="grid flex-1/4 gap-2">
          <Button
            type="button"
            size="block"
            onClick={() => {
              // Convert the local calendar date to utc to ensure consistency with our database and calculations
              onRangePicked({
                from: dateRange.from && convertLocalDateToUTCIgnoringTimezone(dateRange.from),
                to: dateRange.to && convertLocalDateToUTCIgnoringTimezone(dateRange.to),
              });
              setOpen(false);
            }}
          >
            <HandThumbUpIcon width={24} height={24} />
            Apply
          </Button>
          <Button
            type="button"
            size="block"
            variant="secondary"
            onClick={() => {
              setOpen(false);
            }}
          >
            <HandThumbDownIcon width={24} height={24} />
            Cancel
          </Button>
        </footer>
      </AlertDescription>
    </Alert>
  );
}
