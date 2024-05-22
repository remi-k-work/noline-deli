"use client";

// component css styles
import styles from "./ProductsTableActions.module.css";

// react
import { useRef, useState, useTransition } from "react";

// next
import Link from "next/link";
import { useRouter } from "next/navigation";

// server actions and mutations
import { delProduct } from "../managerActions";

// other libraries
import clsx from "clsx";
import { EllipsisVerticalIcon, ExclamationTriangleIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import PathFinder from "../PathFinder";

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
  // To display a pending status while the server action is running
  const [isPending, startTransition] = useTransition();

  // Are we prepared to provide feedback to the user?
  const [showFeedback, setShowFeedback] = useState(false);

  const { refresh } = useRouter();
  const confirmDialogRef = useRef<HTMLDialogElement>(null);
  const deletedProductExcerptRef = useRef<Awaited<ReturnType<typeof delProduct>>>(undefined);

  function handleDeleteConfirmed() {
    startTransition(async () => {
      deletedProductExcerptRef.current = await delProduct(productId);
      setShowFeedback(true);
      refresh();
    });
  }

  return (
    <>
      <div className="dropdown dropdown-left">
        <div className="lg:tooltip lg:tooltip-left" data-tip="Perform actions with this product">
          <div tabIndex={0} role="button" className="btn btn-circle btn-ghost">
            {isPending ? <span className="loading loading-spinner"></span> : <EllipsisVerticalIcon width={24} height={24} />}
          </div>
        </div>
        <ul tabIndex={0} className={clsx(styles["products-table-actions"], "dropdown-content -translate-y-1/4")}>
          <li>
            <Link href={PathFinder.toProductEdit(productId)} className="btn btn-block">
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
        <p className="mb-4">Are you certain you want to remove this product?</p>
        <ProductExcerpt name={productName} imageUrl={productImageUrl} price={productPrice} />
      </ConfirmDialog>
      {showFeedback && deletedProductExcerptRef.current && (
        <Toastify onTimedOut={() => setShowFeedback(false)}>
          <p className="mb-4">The following product has been removed.</p>
          <ProductExcerpt
            name={deletedProductExcerptRef.current[0]}
            imageUrl={deletedProductExcerptRef.current[1]}
            price={deletedProductExcerptRef.current[2]}
          />
        </Toastify>
      )}
      {showFeedback && deletedProductExcerptRef.current === undefined && (
        <Toastify type={"alert-warning"} onTimedOut={() => setShowFeedback(false)}>
          <ExclamationTriangleIcon width={48} height={48} className="m-auto" />
          <p className="mb-4">Database error! Failed to delete the following product.</p>
          <ProductExcerpt name={productName} imageUrl={productImageUrl} price={productPrice} />
        </Toastify>
      )}
    </>
  );
}
