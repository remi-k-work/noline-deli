// react
import { Dispatch, SetStateAction } from "react";

// components
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

// types
interface AllOrdersProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function AllOrders({ setOpen }: AllOrdersProps) {
  return (
    <DropdownMenuItem
      onClick={() => {
        setOpen(false);
      }}
    >
      All Orders
    </DropdownMenuItem>
  );
}
