"use client";

// component css styles
import styles from "./NewProductForm.module.css";

// react
import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

// next
import { useRouter } from "next/navigation";

// prisma and db access
import { BrandWithUser, CategoryWithSubCategory } from "../managerDb";

// server actions and mutations
import { newProduct } from "../managerActions";

// other libraries
import { HandThumbDownIcon, HandThumbUpIcon, PencilSquareIcon, TruckIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { ProductFormState } from "../ProductFormSchema";

// components
import { FormTextArea, FormInputField, FormCheckField } from "./FormControls";
import { BrandAndLogo, CategoryAndSubCategory, PriceInCents } from "./ProductFormControls";
import ProductFormImages from "./ProductFormImages";

// assets
import { lusitana } from "@/assets/fonts";

// types
interface NewProductFormProps {
  brands: BrandWithUser[];
  categories: CategoryWithSubCategory[];
}

interface TheFormWrappedProps {
  brands: BrandWithUser[];
  categories: CategoryWithSubCategory[];
  onResetClicked: () => void;
}

export default function NewProductForm({ brands, categories }: NewProductFormProps) {
  // Resetting a form with a key: you can force a subtree to reset its state by giving it a different key
  const [formResetKey, setFormResetKey] = useState("NewProductForm");

  return <TheFormWrapped key={formResetKey} brands={brands} categories={categories} onResetClicked={() => setFormResetKey(`NewProductForm${Date.now()}`)} />;
}

function TheFormWrapped({ brands, categories, onResetClicked }: TheFormWrappedProps) {
  // To be able to send the user back after canceling
  const { back } = useRouter();

  // To be able to use the information returned by a form action
  const [formState, formAction] = useFormState<ProductFormState, FormData>(newProduct, { actionStatus: "idle" });

  const { allFieldErrors } = formState;

  return (
    <article className={styles["new-product-form"]}>
      <h2 className={lusitana.className}>
        <PencilSquareIcon width={64} height={64} />
        New Product
      </h2>
      <form action={formAction} noValidate={true}>
        <FormInputField
          fieldName={"name"}
          fieldLabel={"name"}
          allFieldErrors={allFieldErrors}
          size={40}
          maxLength={50}
          spellCheck={"true"}
          autoComplete={"off"}
          required={true}
          defaultValue={""}
        />
        <FormTextArea
          fieldName={"description"}
          fieldLabel={"description"}
          allFieldErrors={allFieldErrors}
          cols={50}
          rows={6}
          spellCheck={"true"}
          autoComplete={"off"}
          required={true}
          defaultValue={""}
        />
        <ProductFormImages
          theMainImageUrl={"/16.golabki_z_sosem.jpg"}
          moreImagesUrls={[
            "/26.pork_meatballs.jpg",
            "/27.pork_ribs.jpg",
            "/julian-o-hayon-Bs-zngH79Ds-unsplash.jpg",
            "/laura-chouette-HWG_9omXS5g-unsplash.jpg",
            "/imani-bahati-LxVxPA1LOVM-unsplash.jpg",
          ]}
          allFieldErrors={allFieldErrors}
        />
        <PriceInCents allFieldErrors={allFieldErrors} />
        <CategoryAndSubCategory categories={categories} allFieldErrors={allFieldErrors} />
        <BrandAndLogo brands={brands} allFieldErrors={allFieldErrors} />
        <FormCheckField fieldName={"freeShipping"} allFieldErrors={allFieldErrors} defaultChecked={false}>
          <TruckIcon width={24} height={24} />
          Free Shipping
        </FormCheckField>
        <section className={styles["new-product-form__submit"]}>
          <SaveButton />
          <button type="reset" className="btn btn-warning" onClick={() => onResetClicked && onResetClicked()}>
            <XCircleIcon width={24} height={24} />
            Reset
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => back()}>
            <HandThumbDownIcon width={24} height={24} />
            Cancel
          </button>
        </section>
      </form>
    </article>
  );
}

function SaveButton() {
  // To be able to display a pending status while the form is being submitted
  const { pending } = useFormStatus();

  return (
    <button type="submit" className="btn btn-primary" disabled={pending}>
      {pending ? (
        <>
          <span className="loading loading-spinner"></span>
          Saving...
        </>
      ) : (
        <>
          <HandThumbUpIcon width={24} height={24} />
          Save
        </>
      )}
    </button>
  );
}
