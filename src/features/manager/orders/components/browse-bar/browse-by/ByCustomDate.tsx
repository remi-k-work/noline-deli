// react
import { Dispatch, SetStateAction, useState } from "react";

// other libraries
import { cn } from "@/lib/utils";
import { useTanTableInstanceContext } from "../../../stores/tan-table-instance";
import { DateRange } from "react-day-picker";

// components
import { DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger } from "@/components/ui/dropdown-menu";
import CustomDateTrigger from "@/features/manager/components/CustomDateTrigger";

// types
interface ByCustomDateProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function ByCustomDate({ setOpen }: ByCustomDateProps) {
  const {
    tableState: { currentCustomDate },
    tableActions: { browsedByCustomDate },
  } = useTanTableInstanceContext();

  // Custom date range option selected from the calendar
  const [dateRange, setDateRange] = useState<DateRange | undefined>(currentCustomDate && !("label" in currentCustomDate) ? currentCustomDate : undefined);

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <span className={cn({ "font-bold": currentCustomDate && !("label" in currentCustomDate) })}>By Custom Date</span>
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <CustomDateTrigger
            dateRange={dateRange}
            setOpen={setOpen}
            onRangePicked={(dateRange) => {
              setDateRange(dateRange);
              browsedByCustomDate(dateRange);
            }}
          />
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}
