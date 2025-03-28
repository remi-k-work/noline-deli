// prisma and db access
import { OrderedItem, OrderedItemStatus } from "@prisma/client";

// server actions and mutations
import { chgOrderedItemStatus } from "@/features/manager/orders/actions";

// other libraries
import { useOptimisticAction } from "next-safe-action/hooks";

// components
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// types
interface StatusProps {
  orderedItem: OrderedItem;
  className?: string;
}

export default function Status({ orderedItem: { id, status }, className }: StatusProps) {
  // We will update the status of this ordered item optimistically
  const { execute, optimisticState } = useOptimisticAction(chgOrderedItemStatus, {
    currentState: { orderedItemId: id, newStatus: status },
    updateFn: (curState, newState) => ({ ...curState, newStatus: newState.newStatus }),
  });

  return (
    <Select
      name={"orderedItemStatus"}
      value={optimisticState.newStatus}
      onValueChange={async (newStatus) => {
        // Execute the server action to update the ordered item status, but if it fails, we will revert the changes
        execute({ orderedItemId: id, newStatus: newStatus as OrderedItemStatus });
      }}
    >
      <SelectTrigger className={className}>
        <SelectValue placeholder="Choose Status" />
      </SelectTrigger>
      <SelectContent side="left" align="center">
        {Object.values(OrderedItemStatus).map((orderedItemStatus) => (
          <SelectItem key={orderedItemStatus} value={orderedItemStatus}>
            {orderedItemStatus.replace("_", " ").toLowerCase()}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
