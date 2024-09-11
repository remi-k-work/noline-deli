// react
import { Dispatch, SetStateAction } from "react";

// other libraries
import { cn } from "@/lib/utils";
import { useTanTableInstanceContext } from "../../../stores/tan-table-instance";

// components
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

// types
interface AllProductsProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function AllProducts({ setOpen }: AllProductsProps) {
  const {
    tableState: { isBrowsingAll },
    tableActions: { browsedAll },
  } = useTanTableInstanceContext();

  return (
    <DropdownMenuItem
      className={cn({ "font-bold": isBrowsingAll })}
      onClick={() => {
        browsedAll();
        setOpen(false);
      }}
    >
      All Products
    </DropdownMenuItem>
  );
}
