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
        <InformationCircleIcon className="h-4 w-4" />
        <AlertTitle className="max-w-none">Please select one or more days to specify a range</AlertTitle>
      </Alert>
    );
  }

  return (
    <Alert>
      <InformationCircleIcon className="h-4 w-4" />
      <AlertTitle className="max-w-none">You selected</AlertTitle>
      <AlertDescription className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-5">
        {dateRange.from && (
          <span className="flex items-center gap-2">
            <CalendarDateRangeIcon className="h-5 w-5" />
            {formatDate(dateRange.from)}
          </span>
        )}
        {dateRange.to ? (
          <span className="flex items-center gap-2">
            <CalendarDateRangeIcon className="h-5 w-5" />
            {formatDate(dateRange.to)}
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <CalendarDateRangeIcon className="h-5 w-5" />
            Today
          </span>
        )}
      </AlertDescription>
      <footer className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-5">
        <Button
          type="button"
          onClick={() => {
            // Convert the local calendar date to utc to ensure consistency with our database and calculations
            onRangePicked({
              from: dateRange.from && convertLocalDateToUTCIgnoringTimezone(dateRange.from),
              to: dateRange.to && convertLocalDateToUTCIgnoringTimezone(dateRange.to),
            });
            setOpen(false);
          }}
        >
          <HandThumbUpIcon className="mr-2 h-5 w-5" />
          Apply
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            setOpen(false);
          }}
        >
          <HandThumbDownIcon className="mr-2 h-5 w-5" />
          Cancel
        </Button>
      </footer>
    </Alert>
  );
}
