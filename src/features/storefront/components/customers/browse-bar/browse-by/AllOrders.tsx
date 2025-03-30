// react
import { Dispatch, SetStateAction } from "react";

// other libraries
import { cn } from "@/lib/utils";
import { useInstanceContext } from "@/features/storefront/stores/customers/orders-table";

// components
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

// types
interface AllOrdersProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function AllOrders({ setOpen }: AllOrdersProps) {
  const {
    state: { isBrowsingAll },
    actions: { browsedAll },
  } = useInstanceContext();

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
