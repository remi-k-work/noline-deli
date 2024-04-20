"use client";

// component css styles
import styles from "./ProductsTableActions.module.css";

// react
import { useRef, useState, useTransition } from "react";

// next
import Link from "next/link";
import { useRouter } from "next/navigation";

// other libraries
import clsx from "clsx";
import { EllipsisVerticalIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { waait } from "@/lib/helpers";

// components
import ConfirmDialog from "@/components/ConfirmDialog";
import Toastify from "@/components/Toastify";
import ProductExcerpt from "./ProductExcerpt";

// types
interface ProductsTableActionsProps {
  productId: string;
  productName: string;
  productImageUrl: string;
  productPrice: number;
  usersRole: string;
}

export default function ProductsTableActions({ productId, productName, productImageUrl, productPrice, usersRole }: ProductsTableActionsProps) {
  const [isPending, startTransition] = useTransition();
  const [isToastify, setIsToastify] = useState(false);

  const { refresh } = useRouter();

  const confirmDialogRef = useRef<HTMLDialogElement>(null);

  function handleDeleteConfirmed() {
    startTransition(async () => {
      await waait();
      refresh();
      setIsToastify(true);
    });
  }

  return (
    <>
      <div className="dropdown dropdown-left">
        <div tabIndex={0} role="button" className="btn btn-circle btn-ghost">
          {isPending ? <span className="loading loading-spinner"></span> : <EllipsisVerticalIcon width={24} height={24} />}
        </div>
        <ul tabIndex={0} className={clsx(styles["products-table-actions"], "dropdown-content -translate-y-1/4")}>
          <li>
            <Link href={"#"} className="btn btn-block">
              <PencilIcon width={24} height={24} />
              Edit
            </Link>
          </li>
          <li>
            <button type="button" className="btn btn-warning btn-block" disabled={isPending} onClick={() => confirmDialogRef.current?.showModal()}>
              <TrashIcon width={24} height={24} />
              Delete
            </button>
          </li>
        </ul>
      </div>
      <ConfirmDialog ref={confirmDialogRef} onConfirmed={handleDeleteConfirmed}>
        <p className="mb-4">Are you certain you want to remove this article?</p>
        <ProductExcerpt name={productName} imageUrl={productImageUrl} price={productPrice} />
      </ConfirmDialog>
      {isToastify && (
        <Toastify onTimedOut={() => setIsToastify(false)}>
          <p className="mb-4">The following article has been removed.</p>
          <ProductExcerpt name={productName} imageUrl={productImageUrl} price={productPrice} />
        </Toastify>
      )}
    </>
  );
}
