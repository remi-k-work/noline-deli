// react
import { Dispatch, SetStateAction } from "react";

// other libraries
import { useTanTableInstanceContext } from "../../../stores/TanTableInstance";

// components
import { DropdownMenuItem, DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger } from "@/components/ui/dropdown-menu";

// types
interface ByCustomerProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function ByCustomer({ setOpen }: ByCustomerProps) {
  const {
    browseBarData: { ordersByCustomer },
    browsedByCustomer,
  } = useTanTableInstanceContext();

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>By Customer</DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          {ordersByCustomer.map(({ email, name, orders }) => (
            <DropdownMenuItem
              key={email}
              onClick={() => {
                browsedByCustomer(email);
                setOpen(false);
              }}
              className="flex items-center justify-between gap-4"
            >
              <p className="flex-1">
                {email}
                <br />
                <small>{name}</small>
              </p>
              <span className="badge badge-info flex-none">{orders}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}
