// react
import { Dispatch, SetStateAction } from "react";

// other libraries
import { cn } from "@/lib/utils";
import { useTanTableInstanceContext } from "../../../stores/tan-table-instance";

// components
import { DropdownMenuItem, DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger } from "@/components/ui/dropdown-menu";

// types
interface ByCustomerProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function ByCustomer({ setOpen }: ByCustomerProps) {
  const {
    browseBarData: { ordersByCustomer },
    tableState: { currentCustomerEmail },
    tableActions: { browsedByCustomer },
  } = useTanTableInstanceContext();

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <span className={cn({ "font-bold": currentCustomerEmail })}>By Customer</span>
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          {ordersByCustomer.map(({ email, name, orders }) => (
            <DropdownMenuItem
              key={email}
              className={cn("flex items-center justify-between gap-4", { "font-bold": currentCustomerEmail === email })}
              onClick={() => {
                browsedByCustomer(email);
                setOpen(false);
              }}
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
