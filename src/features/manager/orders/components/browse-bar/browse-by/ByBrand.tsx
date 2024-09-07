// react
import { Dispatch, SetStateAction } from "react";

// other libraries
import { useTanTableInstanceContext } from "../../../stores/TanTableInstance";

// components
import { DropdownMenuItem, DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger } from "@/components/ui/dropdown-menu";

// types
interface ByBrandProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function ByBrand({ setOpen }: ByBrandProps) {
  const {
    browseBarData: { ordersByBrand },
  } = useTanTableInstanceContext();

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>By Brand</DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          {ordersByBrand.map(({ brandName, orders }) => (
            <DropdownMenuItem
              key={brandName}
              onClick={() => {
                setOpen(false);
              }}
              className="flex items-center justify-between gap-4"
            >
              <p className="flex-1">{brandName}</p>
              <span className="badge badge-info flex-none">{orders}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}
