"use client";

// component css styles
import styles from "./NewProductForm.module.css";

// react
import { useEffect, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

// next
import { useRouter } from "next/navigation";

// prisma and db access
import { BrandWithUser, CategoryWithSubCategory } from "../managerDb";

// server actions and mutations
import { newProduct } from "../managerActions";

// other libraries
import { ExclamationTriangleIcon, HandThumbDownIcon, HandThumbUpIcon, PencilSquareIcon, TruckIcon, XCircleIcon } from "@heroicons/react/24/solid";
import ProductFormSchema, { ProductFormSchemaType, ProductFormState } from "../ProductFormSchema";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// components
import { FormTextArea, FormInputField, FormCheckField } from "./FormControls";
import { BrandAndLogo, CategoryAndSubCategory, PriceInCents } from "./ProductFormControls";
import ProductFormImages from "./ProductFormImages";
import Toastify from "@/components/Toastify";
import ProductExcerpt from "./ProductExcerpt";

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

interface SaveButtonProps {
  onSavingIsDone: () => void;
}

export default function NewProductForm({ brands, categories }: NewProductFormProps) {
  // Resetting a form with a key: you can force a subtree to reset its state by giving it a different key
  const [formResetKey, setFormResetKey] = useState("NewProductForm");

  return <TheFormWrapped key={formResetKey} brands={brands} categories={categories} onResetClicked={() => setFormResetKey(`NewProductForm${Date.now()}`)} />;
}

function TheFormWrapped({ brands, categories, onResetClicked }: TheFormWrappedProps) {
  const [isToastify, setIsToastify] = useState(false);

  // To be able to send the user back after canceling
  const { back } = useRouter();

  // To be able to use the information returned by a form action
  const [formState, formAction] = useFormState<ProductFormState, FormData>(newProduct, { actionStatus: "idle" });

  const { actionStatus, allFieldErrors: allFieldErrorsFromServer, productExcerpt } = formState;

  const {
    register,
    unregister,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProductFormSchemaType>({ shouldUnregister: true, resolver: zodResolver(ProductFormSchema.schema) });

  // Use the product form schema to preprocess react's hook form errors
  const productFormSchema = new ProductFormSchema(undefined, errors);
  const allFieldErrorsFromClient = productFormSchema.allFieldErrors;

  // We will show form validation errors from server-side first and client-side afterwards
  const allFieldErrors = allFieldErrorsFromServer || allFieldErrorsFromClient;

  const onSubmit: SubmitHandler<ProductFormSchemaType> = (data) => console.log(data);

  return (
    <article className={styles["new-product-form"]}>
      <h2 className={lusitana.className}>
        <PencilSquareIcon width={64} height={64} />
        New Product
      </h2>
      <form action={formAction} noValidate={true} onSubmit={handleSubmit(onSubmit)}>
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
          register={register}
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
          register={register}
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
          register={register}
          unregister={unregister}
        />
        <PriceInCents allFieldErrors={allFieldErrors} register={register} />
        <CategoryAndSubCategory categories={categories} allFieldErrors={allFieldErrors} register={register} setValue={setValue} />
        <BrandAndLogo brands={brands} allFieldErrors={allFieldErrors} register={register} />
        <FormCheckField fieldName={"freeShipping"} allFieldErrors={allFieldErrors} defaultChecked={false} register={register}>
          <TruckIcon width={24} height={24} />
          Free Shipping
        </FormCheckField>
        <section className={styles["new-product-form__submit"]}>
          <SaveButton onSavingIsDone={() => setIsToastify(true)} />
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
      {isToastify && actionStatus === "succeeded" && productExcerpt && (
        <Toastify onTimedOut={() => setIsToastify(false)}>
          <p className="mb-4">A new product has been created!</p>
          <ProductExcerpt name={productExcerpt.name} imageUrl={productExcerpt.imageUrl} price={productExcerpt.price} />
        </Toastify>
      )}
      {isToastify && actionStatus === "invalid" && (
        <Toastify type={"alert-warning"} onTimedOut={() => setIsToastify(false)}>
          <ExclamationTriangleIcon width={48} height={48} className="m-auto" />
          <p className="mt-4">Missing fields! Failed to create a new product.</p>
        </Toastify>
      )}
    </article>
  );
}

function SaveButton({ onSavingIsDone }: SaveButtonProps) {
  // To be able to display a pending status while the form is being submitted
  const { pending } = useFormStatus();

  // To maintain referential equality and minimize excessive effect dependencies
  const onSavingIsDoneRef = useRef(onSavingIsDone);

  useEffect(() => {
    if (!pending) {
      onSavingIsDoneRef.current();
    }
  }, [pending]);

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
