// react
import { Dispatch, SetStateAction } from "react";

// other libraries
import { cn } from "@/lib/utils";
import { useTanTableInstanceContext } from "../../../stores/tan-table-instance";

// components
import { DropdownMenuItem, DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger } from "@/components/ui/dropdown-menu";

// types
interface ByStatusProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function ByStatus({ setOpen }: ByStatusProps) {
  const {
    browseBarData: { ordersByStatus },
    tableState: { currentStatus },
    tableActions: { browsedByStatus },
  } = useTanTableInstanceContext();

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <span className={cn({ "font-bold": currentStatus })}>By Status</span>
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          {ordersByStatus.map(({ status, orders }) => (
            <DropdownMenuItem
              key={status}
              className={cn("flex items-center justify-between gap-4", { "font-bold": currentStatus === status })}
              onClick={() => {
                browsedByStatus(status);
                setOpen(false);
              }}
            >
              <p className="flex-1">{status}</p>
              <span className="badge badge-info flex-none">{orders}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}
