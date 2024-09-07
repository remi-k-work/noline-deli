// react
import { Dispatch, SetStateAction } from "react";

// other libraries
import { useTanTableInstanceContext } from "../../../stores/TanTableInstance";

// components
import { DropdownMenuItem, DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger } from "@/components/ui/dropdown-menu";

// types
interface ByShippingProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function ByShipping({ setOpen }: ByShippingProps) {
  const {
    browseBarData: { ordersByShipping },
  } = useTanTableInstanceContext();

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>By Shipping</DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          {ordersByShipping.map(({ shipping, orders }) => (
            <DropdownMenuItem
              key={shipping}
              onClick={() => {
                setOpen(false);
              }}
              className="flex items-center justify-between gap-4"
            >
              <p className="flex-1">{shipping}</p>
              <span className="badge badge-info flex-none">{orders}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}
