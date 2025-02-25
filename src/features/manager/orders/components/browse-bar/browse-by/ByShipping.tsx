// react
import { Dispatch, SetStateAction } from "react";

// other libraries
import { cn } from "@/lib/utils";
import { useTanTableInstanceContext } from "@/features/manager/orders/stores/tan-table-instance";

// components
import { Badge } from "@/components/ui/badge";
import { DropdownMenuItem, DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger } from "@/components/ui/dropdown-menu";

// types
interface ByShippingProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function ByShipping({ setOpen }: ByShippingProps) {
  const {
    browseBarData: { ordersByShipping },
    tableState: { currentShippingMethod },
    tableActions: { browsedByShipping },
  } = useTanTableInstanceContext();

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <span className={cn({ "font-bold": currentShippingMethod })}>By Shipping</span>
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          {ordersByShipping.map(({ shipping, orders }) => (
            <DropdownMenuItem
              key={shipping}
              className={cn("flex items-center justify-between gap-4", { "font-bold": currentShippingMethod === shipping })}
              onClick={() => {
                browsedByShipping(shipping);
                setOpen(false);
              }}
            >
              <p className="flex-1">{shipping}</p>
              <Badge className="w-fit flex-none text-base">{orders}</Badge>
            </DropdownMenuItem>
          ))}
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}
