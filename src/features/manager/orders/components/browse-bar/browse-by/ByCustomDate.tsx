// react
import { Dispatch, SetStateAction } from "react";

// other libraries
import { cn } from "@/lib/utils";
import { useTanTableInstanceContext } from "../../../stores/TanTableInstance";

// components
import { DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger } from "@/components/ui/dropdown-menu";
import { Calendar } from "@/components/ui/calendar";

// types
interface ByCustomDateProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function ByCustomDate({ setOpen }: ByCustomDateProps) {
  const {
    browseBarData: { ordersByDate },
    currentDate,
    browsedByDate,
  } = useTanTableInstanceContext();

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <span className={cn({ "font-bold": currentDate })}>By Custom Date</span>
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <Calendar
            mode="range"
            disabled={{ after: new Date() }}
            // selected={dateRange}
            // defaultMonth={dateRange?.from}
            // onSelect={setDateRange}
            numberOfMonths={2}
          />
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}
