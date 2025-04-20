// react
import { Dispatch, SetStateAction } from "react";

// other libraries
import { cn } from "@/lib/utils";
import { useTanTableInstanceContext } from "@/features/manager/products/stores/tan-table-instance";

// components
import { Badge } from "@/components/ui/custom/badge";
import { DropdownMenuItem, DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger } from "@/components/ui/dropdown-menu";

// types
interface ByBrandProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function ByBrand({ setOpen }: ByBrandProps) {
  const {
    browseBarData: { productsByBrand },
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
          {productsByBrand.map(({ brandName, products }) => (
            <DropdownMenuItem
              key={brandName}
              className={cn("flex items-center justify-between gap-4", { "font-bold": currentBrand === brandName })}
              onClick={() => {
                browsedByBrand(brandName);
                setOpen(false);
              }}
            >
              <p className="flex-1 basis-4/5">{brandName}</p>
              <Badge className="shrink-0 basis-1/5 text-base">{products}</Badge>
            </DropdownMenuItem>
          ))}
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}
