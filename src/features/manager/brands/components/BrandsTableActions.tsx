"use client";

// react
import { useRef, useState, useTransition } from "react";

// next
import Link from "next/link";
import { useRouter } from "next/navigation";

// server actions and mutations
import { delBrand } from "../actions";

// other libraries
import { EllipsisVerticalIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import PathFinder from "../../PathFinder";
import { BrandFormState } from "../BrandFormSchema";

// components
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import ConfirmDialog from "@/components/ConfirmDialog";
import BrandExcerpt from "./BrandExcerpt";
import { BrandsTableFeedback } from "./BrandFormFeedback";

// types
interface BrandsTableActionsProps {
  brandId: string;
  brandName: string;
  brandLogoUrl: string | null;
}

export default function BrandsTableActions({ brandId, brandName, brandLogoUrl }: BrandsTableActionsProps) {
  // To display a pending status while the server action is running
  const [isPending, startTransition] = useTransition();

  // Are we prepared to provide feedback to the user?
  const [showFeedback, setShowFeedback] = useState(false);

  const { refresh } = useRouter();
  const confirmDialogRef = useRef<HTMLDialogElement>(null);
  const brandFormState = useRef<BrandFormState>();

  function handleDeleteConfirmed() {
    startTransition(async () => {
      brandFormState.current = await delBrand(brandId);
      setShowFeedback(true);
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
                {isPending ? <span className="loading loading-spinner"></span> : <EllipsisVerticalIcon width={24} height={24} />}
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
            <button type="button" className="btn btn-warning btn-block" disabled={isPending} onClick={() => confirmDialogRef.current?.showModal()}>
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
      {showFeedback && brandFormState.current && (
        <BrandsTableFeedback brandName={brandName} brandLogoUrl={brandLogoUrl} brandFormState={brandFormState.current} setShowFeedback={setShowFeedback} />
      )}
    </>
  );
}
