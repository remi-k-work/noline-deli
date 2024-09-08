// react
import { Dispatch, SetStateAction } from "react";

// other libraries
import { cn } from "@/lib/utils";
import { useTanTableInstanceContext } from "../../../stores/TanTableInstance";

// components
import { DropdownMenuItem, DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger } from "@/components/ui/dropdown-menu";

// types
interface ByDateProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function ByDate({ setOpen }: ByDateProps) {
  const {
    browseBarData: { ordersByDate },
    currentDate,
    browsedByDate,
  } = useTanTableInstanceContext();

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <span className={cn({ "font-bold": currentDate })}>By Date</span>
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          {ordersByDate.map(({ rangeLabel, startDate, endDate, orders }) => (
            <DropdownMenuItem
              key={rangeLabel}
              className={cn("flex items-center justify-between gap-4", { "font-bold": currentDate?.label === rangeLabel })}
              onClick={() => {
                browsedByDate({ label: rangeLabel, startDate, endDate });
                setOpen(false);
              }}
            >
              <p className="flex-1">{rangeLabel}</p>
              <span className="badge badge-info flex-none">{orders}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}
