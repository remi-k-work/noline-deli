// react
import { Dispatch, SetStateAction } from "react";

// other libraries
import { cn } from "@/lib/utils";
import { useTanTableInstanceContext } from "../../../stores/tan-table-instance";

// components
import { DropdownMenuItem, DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger } from "@/components/ui/dropdown-menu";

// types
interface ByCategoryProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function ByCategory({ setOpen }: ByCategoryProps) {
  const {
    browseBarData: { productsByCategory },
    tableState: { currentCategory, currentSubCategory },
    tableActions: { browsedByCategory },
  } = useTanTableInstanceContext();

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <span className={cn({ "font-bold": currentCategory && !currentSubCategory })}>By Category</span>
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          {productsByCategory.map(({ categoryName, products }) => (
            <DropdownMenuItem
              key={categoryName}
              className={cn("flex items-center justify-between gap-4", { "font-bold": currentCategory === categoryName && !currentSubCategory })}
              onClick={() => {
                browsedByCategory(categoryName);
                setOpen(false);
              }}
            >
              <p className="flex-1">{categoryName}</p>
              <span className="badge badge-info flex-none">{products}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}
