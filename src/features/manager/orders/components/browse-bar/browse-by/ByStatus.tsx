// react
import { Dispatch, SetStateAction } from "react";

// other libraries
import { useTanTableInstanceContext } from "../../../stores/TanTableInstance";

// components
import { DropdownMenuItem, DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger } from "@/components/ui/dropdown-menu";

// types
interface ByStatusProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function ByStatus({ setOpen }: ByStatusProps) {
  const {
    browseBarData: { ordersByStatus },
  } = useTanTableInstanceContext();

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>By Shipping</DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          {ordersByStatus.map(({ status, orders }) => (
            <DropdownMenuItem
              key={status}
              onClick={() => {
                setOpen(false);
              }}
              className="flex items-center justify-between gap-4"
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
