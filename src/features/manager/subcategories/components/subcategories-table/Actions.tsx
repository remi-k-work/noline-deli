"use client";

// react
import { useRef, useTransition } from "react";

// next
import Link from "next/link";
import { useRouter } from "next/navigation";

// server actions and mutations
import { delSubCategory2 } from "@/features/manager/subcategories/actions";

// other libraries
import { z } from "zod";
import { waait } from "@/lib/helpers";
import PathFinder from "@/lib/PathFinder";
import useTableActionWithVal from "@/features/manager/hooks/useTableActionWithVal";
import type { SubCategoryFormActionResult } from "@/features/manager/subcategories/schemas/types";

// components
import { Button } from "@/components/ui/custom/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import ConfirmDialog from "@/components/ConfirmDialog";

// assets
import { EllipsisVerticalIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Loader2 } from "lucide-react";

// types
interface ActionsProps {
  subCategoryId: string;
  subCategoryName: string;
  parentCategoryName: string;
}

export default function Actions({ subCategoryId, subCategoryName, parentCategoryName }: ActionsProps) {
  const { execute, isExecuting, feedback } = useTableActionWithVal<z.ZodObject<{ subCategoryId: z.ZodString }>, readonly [], SubCategoryFormActionResult>({
    safeActionFunc: delSubCategory2,
    excerpt: (
      <p className="text-center text-2xl">
        {parentCategoryName} ► <b>{subCategoryName}</b>
      </p>
    ),
  });

  const { refresh } = useRouter();
  const confirmDialogRef = useRef<HTMLDialogElement>(null);
  const [, startTransition] = useTransition();

  function handleDeleteConfirmed() {
    execute({ subCategoryId });
    startTransition(async () => {
      await waait();
      refresh();
    });
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" variant="ghost" asChild>
                {isExecuting ? <Loader2 className="size-9 animate-spin" /> : <EllipsisVerticalIcon width={36} height={36} />}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Perform actions with this subcategory</p>
            </TooltipContent>
          </Tooltip>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="left">
          <DropdownMenuLabel>Choose an Action</DropdownMenuLabel>
          <DropdownMenuItem>
            <Button size="block" asChild>
              <Link href={PathFinder.toSubCategoryEdit(subCategoryId)}>
                <PencilIcon width={24} height={24} />
                Edit
              </Link>
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button type="button" size="block" variant="destructive" disabled={isExecuting} onClick={() => confirmDialogRef.current?.showModal()}>
              <TrashIcon width={24} height={24} />
              Delete
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ConfirmDialog ref={confirmDialogRef} onConfirmed={handleDeleteConfirmed}>
        <p className="mb-2 p-4">
          Are you certain you want to <b className="text-destructive">remove</b> this subcategory?
        </p>
        <p className="m-auto text-center text-2xl">
          {parentCategoryName} ► <b>{subCategoryName}</b>
        </p>
        <div className="m-auto mt-8 w-fit bg-destructive p-2 text-start">
          This operation will also <b className="text-destructive-foreground">delete</b> the following:
          <ul className="list-outside list-disc pl-4">
            <li>All products associated with this subcategory!</li>
          </ul>
        </div>
      </ConfirmDialog>
      {feedback}
    </>
  );
}
