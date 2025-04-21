"use client";

// react
import { useRef } from "react";

// prisma and db access
import type { OrderWithItems } from "@/features/storefront/db/types";
import type { OrderStatus } from "@prisma/client";

// server actions and mutations
import { cancelOrder } from "@/features/storefront/actions/customers";

// other libraries
import { z } from "zod";
import useOrderActionWithVal from "@/features/storefront/hooks/customers/useOrderActionWithVal";
import type { OrderActionResult } from "@/features/storefront/actions/customers";
import type { Row } from "@tanstack/react-table";

// components
import { TableCell } from "@/components/ui/custom/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/custom/button";
import ConfirmDialog from "@/components/ConfirmDialog";
import OrderExcerpt from "@/features/storefront/components/customers/OrderExcerpt";

// assets
import { XCircleIcon } from "@heroicons/react/24/solid";
import { Loader2 } from "lucide-react";

// types
interface ActionsCellProps {
  row: Row<OrderWithItems>;
}

export default function ActionsCell({
  row: {
    original,
    original: { id: orderId, customerId, checkoutSessionId, isConnected, status },
  },
}: ActionsCellProps) {
  const { execute, isPending, feedback } = useOrderActionWithVal<
    z.ZodObject<{
      orderId: z.ZodString;
      customerId: z.ZodString;
      checkoutSessionId: z.ZodString;
      isConnected: z.ZodBoolean;
      status: z.ZodNativeEnum<typeof OrderStatus>;
    }>,
    readonly [],
    OrderActionResult
  >({
    safeActionFunc: cancelOrder,
    excerpt: <OrderExcerpt order={original} />,
  });

  // To make sure the user is certain
  const confirmDialogRef = useRef<HTMLDialogElement>(null);

  return (
    <TableCell>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            size="icon"
            variant="destructive"
            disabled={isPending || status !== "JUST_ORDERED"}
            onClick={() => confirmDialogRef.current?.showModal()}
          >
            {isPending ? <Loader2 className="size-9 animate-spin" /> : <XCircleIcon className="size-9" />}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>Cancel this order</p>
        </TooltipContent>
      </Tooltip>
      <ConfirmDialog ref={confirmDialogRef} onConfirmed={() => execute({ orderId, customerId, checkoutSessionId, isConnected, status })}>
        <p className="mb-2 p-4 text-center">
          Are you certain you want to <b className="text-destructive">cancel</b> this order?
        </p>
        <OrderExcerpt order={original} />
      </ConfirmDialog>
      {feedback}
    </TableCell>
  );
}

export function ActionsCellSkeleton() {
  return (
    <TableCell>
      <Button type="button" size="icon" variant="destructive" disabled>
        <XCircleIcon className="size-9" />
      </Button>
    </TableCell>
  );
}
