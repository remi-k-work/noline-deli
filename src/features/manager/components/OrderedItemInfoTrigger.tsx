// prisma and db access
import type { OrderedItem } from "@prisma/client";

// components
import { Button } from "@/components/ui/custom/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import ResponsiveDialogTrigger from "@/components/ResponsiveDialogTrigger";
import OrderedItemInfo from "@/features/manager/components/OrderedItemInfo";

// assets
import { InformationCircleIcon } from "@heroicons/react/24/solid";

// types
interface OrderedItemInfoTriggerProps {
  orderedItem: OrderedItem;
  className?: string;
}

export default function OrderedItemInfoTrigger({ orderedItem, className }: OrderedItemInfoTriggerProps) {
  return (
    <ResponsiveDialogTrigger
      trigger={
        <Tooltip>
          <TooltipTrigger asChild>
            <Button type="button" size="icon" variant="secondary" asChild>
              <InformationCircleIcon width={36} height={36} />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Detailed information about this ordered item</p>
          </TooltipContent>
        </Tooltip>
      }
      title={
        <>
          <InformationCircleIcon width={32} height={32} />
          Ordered Item Info
        </>
      }
      description="Detailed information about this ordered item"
      content={<OrderedItemInfo orderedItem={orderedItem} />}
      className={className}
    />
  );
}
