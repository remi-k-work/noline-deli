"use client";

// react
import { useRef, useTransition } from "react";

// next
import Link from "next/link";
import { useRouter } from "next/navigation";

// server actions and mutations
import { delBrand2 } from "../actions";

// other libraries
import { z } from "zod";
import { waait } from "@/lib/helpers";
import PathFinder from "../../PathFinder";
import useTableActionWithVal from "../../hooks/useTableActionWithVal";
import { BrandFormActionResult } from "../schemas/types";

// components
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import ConfirmDialog from "@/components/ConfirmDialog";
import BrandExcerpt from "./BrandExcerpt";

// assets
import { EllipsisVerticalIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

// types
interface BrandsTableActionsProps {
  brandId: string;
  brandName: string;
  brandLogoUrl: string | null;
}

export default function BrandsTableActions({ brandId, brandName, brandLogoUrl }: BrandsTableActionsProps) {
  const { execute, isExecuting, feedback } = useTableActionWithVal<z.ZodObject<{ brandId: z.ZodString }>, readonly [], BrandFormActionResult>({
    safeActionFunc: delBrand2,
    excerpt: <BrandExcerpt name={brandName} logoUrl={brandLogoUrl} />,
  });

  const { refresh } = useRouter();
  const confirmDialogRef = useRef<HTMLDialogElement>(null);
  const [, startTransition] = useTransition();

  function handleDeleteConfirmed() {
    execute({ brandId });
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
              <div className="btn btn-circle btn-ghost">
                {isExecuting ? <span className="loading loading-spinner"></span> : <EllipsisVerticalIcon width={24} height={24} />}
              </div>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Perform actions with this brand</p>
            </TooltipContent>
          </Tooltip>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="left">
          <DropdownMenuLabel>Choose an Action</DropdownMenuLabel>
          <DropdownMenuItem>
            <Link href={PathFinder.toBrandEdit(brandId)} className="btn btn-block">
              <PencilIcon width={24} height={24} />
              Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <button type="button" className="btn btn-warning btn-block" disabled={isExecuting} onClick={() => confirmDialogRef.current?.showModal()}>
              <TrashIcon width={24} height={24} />
              Delete
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ConfirmDialog ref={confirmDialogRef} onConfirmed={handleDeleteConfirmed}>
        <p className="mb-2 p-4">
          Are you certain you want to <b className="text-error">remove</b> this brand?
        </p>
        <BrandExcerpt name={brandName} logoUrl={brandLogoUrl} />
        <div className="m-auto mt-8 w-fit bg-error p-2 text-start">
          This operation will also <b className="text-error-content">delete</b> the following:
          <ul className="list-outside list-disc pl-4">
            <li>All products associated with this brand!</li>
          </ul>
        </div>
      </ConfirmDialog>
      {feedback}
    </>
  );
}
