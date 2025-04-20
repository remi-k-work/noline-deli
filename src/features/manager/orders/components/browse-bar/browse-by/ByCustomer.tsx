// react
import { Dispatch, SetStateAction } from "react";

// other libraries
import { cn } from "@/lib/utils";
import { useTanTableInstanceContext } from "@/features/manager/orders/stores/tan-table-instance";

// components
import { Badge } from "@/components/ui/custom/badge";
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
              <p className="flex-1 basis-9/10">
                {email}
                <br />
                <small>{name}</small>
              </p>
              <Badge className="shrink-0 basis-1/10 text-base">{orders}</Badge>
            </DropdownMenuItem>
          ))}
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}
