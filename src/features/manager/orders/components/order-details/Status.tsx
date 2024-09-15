// prisma and db access
import { OrderedItem, OrderedItemStatus } from "@prisma/client";

// server actions and mutations
import { chgOrderedItemStatus } from "@/features/manager/orders/actions";

// components
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// types
interface StatusProps {
  orderedItem: OrderedItem;
  className?: string;
}

export default function Status({ orderedItem: { id, status }, className }: StatusProps) {
  return (
    <Select
      name={"orderedItemStatus"}
      value={status}
      onValueChange={async (value) => {
        // Update the status of this ordered item at the underlying database level
        await chgOrderedItemStatus({ orderedItemId: id, newStatus: value as OrderedItemStatus });
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
