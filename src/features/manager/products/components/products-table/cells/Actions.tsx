"use client";

// react
import { useRef, useState } from "react";

// next
import Link from "next/link";
import { useRouter } from "next/navigation";

// server actions and mutations
import { delProduct2 } from "@/features/manager/products/actions";

// other libraries
import { z } from "zod";
import PathFinder from "@/lib/PathFinder";
import useTableActionWithVal from "@/features/manager/hooks/useTableActionWithVal";
import type { ProductFormActionResult } from "@/features/manager/products/schemas/types";
import { Row } from "@tanstack/react-table";
import { ProductRow } from "@/features/manager/products/components/products-table/Columns";

// components
import { Button } from "@/components/ui/custom/button";
import { TableCell } from "@/components/ui/custom/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import ConfirmDialog from "@/components/ConfirmDialog";
import ProductExcerpt from "@/features/storefront/components/products/ProductExcerpt";

// assets
import { EllipsisVerticalIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Loader2 } from "lucide-react";

// types
interface ActionsProps {
  row: Row<ProductRow>;
}

export default function Actions({ row: { getValue, original } }: ActionsProps) {
  const { execute, isPending, feedback } = useTableActionWithVal<z.ZodObject<{ productId: z.ZodString }>, readonly [], ProductFormActionResult>({
    safeActionFunc: delProduct2,
    excerpt: <ProductExcerpt kind="simple" name={getValue("name")} imageUrl={original.imageUrl} price={getValue("price")} />,
  });

  const { refresh } = useRouter();
  const confirmDialogRef = useRef<HTMLDialogElement>(null);

  // The controlled open state of the drop-down menu
  const [open, setOpen] = useState(false);

  return (
    <TableCell>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" variant="ghost" asChild>
                {isPending ? <Loader2 className="size-9 animate-spin" /> : <EllipsisVerticalIcon width={36} height={36} />}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Perform actions with this product</p>
            </TooltipContent>
          </Tooltip>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="left">
          <DropdownMenuLabel>Choose an Action</DropdownMenuLabel>
          <DropdownMenuItem>
            <Button size="block" asChild>
              <Link href={PathFinder.toProductEdit(original.id)} scroll={false} onClick={() => setOpen(false)}>
                <PencilIcon width={24} height={24} />
                Edit
              </Link>
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button type="button" size="block" variant="destructive" disabled={isPending} onClick={() => confirmDialogRef.current?.showModal()}>
              <TrashIcon width={24} height={24} />
              Delete
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ConfirmDialog
        ref={confirmDialogRef}
        onConfirmed={() => {
          execute({ productId: original.id });
          refresh();
        }}
      >
        <p className="mb-2 p-4">
          Are you certain you want to <b className="text-destructive">remove</b> this product?
        </p>
        <ProductExcerpt kind="simple" name={getValue("name")} imageUrl={original.imageUrl} price={getValue("price")} />
      </ConfirmDialog>
      {feedback}
    </TableCell>
  );
}
