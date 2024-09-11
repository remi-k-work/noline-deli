// react
import { Dispatch, SetStateAction } from "react";

// other libraries
import { cn } from "@/lib/utils";
import { useTanTableInstanceContext } from "../../../stores/tan-table-instance";

// components
import { DropdownMenuItem, DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger } from "@/components/ui/dropdown-menu";

// types
interface BySubCategoryProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function BySubCategory({ setOpen }: BySubCategoryProps) {
  const {
    browseBarData: { productsBySubCategory },
    tableState: { currentCategory, currentSubCategory },
    tableActions: { browsedBySubCategory },
  } = useTanTableInstanceContext();

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <span className={cn({ "font-bold": currentCategory && currentSubCategory })}>By SubCategory</span>
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          {productsBySubCategory.map(({ categoryName, subCategoryName, products }) => (
            <DropdownMenuItem
              key={subCategoryName}
              className={cn("flex items-center justify-between gap-4", {
                "font-bold": currentCategory === categoryName && currentSubCategory === subCategoryName,
              })}
              onClick={() => {
                browsedBySubCategory(categoryName, subCategoryName);
                setOpen(false);
              }}
            >
              <p className="flex-1">
                {subCategoryName}
                <br />
                <small>{categoryName}</small>
              </p>
              <span className="badge badge-info flex-none">{products}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}
