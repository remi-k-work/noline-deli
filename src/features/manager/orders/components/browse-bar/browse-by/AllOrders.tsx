// react
import { Dispatch, SetStateAction } from "react";

// other libraries
import { cn } from "@/lib/utils";
import { useTanTableInstanceContext } from "../../../stores/TanTableInstance";

// components
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

// types
interface AllOrdersProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function AllOrders({ setOpen }: AllOrdersProps) {
  const { isBrowsingAll, browsedAll } = useTanTableInstanceContext();

  return (
    <DropdownMenuItem
      className={cn({ "font-bold": isBrowsingAll })}
      onClick={() => {
        browsedAll();
        setOpen(false);
      }}
    >
      All Orders
    </DropdownMenuItem>
  );
}
