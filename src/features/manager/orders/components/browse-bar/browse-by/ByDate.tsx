// react
import { Dispatch, SetStateAction } from "react";

// other libraries
import { cn } from "@/lib/utils";
import { useTanTableInstanceContext } from "@/features/manager/orders/stores/tan-table-instance";

// components
import { Badge } from "@/components/ui/custom/badge";
import { DropdownMenuItem, DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger } from "@/components/ui/dropdown-menu";

// types
interface ByDateProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function ByDate({ setOpen }: ByDateProps) {
  const {
    browseBarData: { ordersByDate },
    tableState: { currentDate },
    tableActions: { browsedByDate },
  } = useTanTableInstanceContext();

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <span className={cn({ "font-bold": currentDate && "label" in currentDate })}>By Date</span>
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
              <Badge className="w-fit flex-none text-base">{orders}</Badge>
            </DropdownMenuItem>
          ))}
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}
