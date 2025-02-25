// react
import { Dispatch, SetStateAction } from "react";

// other libraries
import { cn } from "@/lib/utils";
import { useTanTableInstanceContext } from "@/features/manager/orders/stores/tan-table-instance";

// components
import { Badge } from "@/components/ui/badge";
import { DropdownMenuItem, DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger } from "@/components/ui/dropdown-menu";

// types
interface ByBrandProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function ByBrand({ setOpen }: ByBrandProps) {
  const {
    browseBarData: { ordersByBrand },
    tableState: { currentBrand },
    tableActions: { browsedByBrand },
  } = useTanTableInstanceContext();

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <span className={cn({ "font-bold": currentBrand })}>By Brand</span>
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          {ordersByBrand.map(({ brandName, orders }) => (
            <DropdownMenuItem
              key={brandName}
              className={cn("flex items-center justify-between gap-4", { "font-bold": currentBrand === brandName })}
              onClick={() => {
                browsedByBrand(brandName);
                setOpen(false);
              }}
            >
              <p className="flex-1">{brandName}</p>
              <Badge className="w-fit flex-none text-base">{orders}</Badge>
            </DropdownMenuItem>
          ))}
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}
