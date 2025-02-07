"use client";

// component css styles
import styles from "./index.module.css";

// react
import { useState } from "react";

// prisma and db access
import { ProductWithAll } from "../../db";
import { BrandWithUser } from "../../../brands/db";
import { CategoryWithSubCategory } from "../../../categories/db";

// server actions and mutations
import { newProduct2, updProduct2 } from "@/features/manager/products/actions";

// other libraries
import { z } from "zod";
import { useProductFormStore } from "../../stores/productFormProvider";
import useFormActionWithVal from "../../../hooks/useFormActionWithVal";
import { FormProvider } from "react-hook-form";
import { productFormSchema } from "../../schemas/productForm";
import { ProductFormActionResult } from "../../schemas/types";
import PathFinder from "../../../../../lib/PathFinder";
import useFormActionFeedback from "../../../hooks/useFormActionFeedback";

// components
import { ProductFormStoreProvider } from "../../stores/productFormProvider";
import { AllFieldErrorsProvider } from "../../../../../contexts/AllFieldErrors";
import { FormTextArea, FormInputField, FormCheckField } from "../../../components/FormControls";
import { BrandAndLogo, CategoryAndSubCategory, PriceInCents } from "./Controls";
import ProductFormImages from "../product-form-images";
import FormSubmit from "../../../components/FormSubmit";
import ProductExcerpt from "../ProductExcerpt";

// assets
import { lusitana } from "@/assets/fonts";
import { PencilSquareIcon, PlusCircleIcon, TruckIcon } from "@heroicons/react/24/solid";

// types
interface ProductFormProps {
  product?: ProductWithAll;
  brands: BrandWithUser[];
  categories: CategoryWithSubCategory[];
}

interface TheFormWrappedProps {
  product?: ProductWithAll;
  brands: BrandWithUser[];
  categories: CategoryWithSubCategory[];
  onResetClicked: () => void;
}

export default function ProductForm({ product, brands, categories }: ProductFormProps) {
  // Resetting a form with a key: you can force a subtree to reset its state by giving it a different key
  const [formResetKey, setFormResetKey] = useState("ProductForm");

  return (
    <ProductFormStoreProvider key={formResetKey} product={product}>
      <TheFormWrapped product={product} brands={brands} categories={categories} onResetClicked={() => setFormResetKey(`ProductForm${Date.now()}`)} />
    </ProductFormStoreProvider>
  );
}

function TheFormWrapped({ product, brands, categories, onResetClicked }: TheFormWrappedProps) {
  const name = useProductFormStore((state) => state.name);
  const description = useProductFormStore((state) => state.description);
  const freeShipping = useProductFormStore((state) => state.freeShipping);

  // To provide feedback to the user
  const { feedback, showFeedback } = useFormActionFeedback({
    excerpt: product ? <ProductExcerpt name={product.name} imageUrl={product.imageUrl} price={product.price} /> : undefined,
    pathToAllItems: PathFinder.toAllProducts(),
  });

  const { useFormMethods, onSubmit, allFieldErrors, isExecuting } = useFormActionWithVal<
    typeof productFormSchema,
    readonly [productId: z.ZodString, orgCreatedAt: z.ZodDate] | readonly [],
    ProductFormActionResult
  >({
    safeActionFunc: product ? updProduct2.bind(null, product.id, product.createdAt) : newProduct2,
    formSchema: productFormSchema,
    showFeedback,
  });

  return (
    <article className={styles["product-form"]}>
      <h2 className={lusitana.className}>
        {product ? (
          <>
            <PencilSquareIcon width={64} height={64} />
            Edit Product
          </>
        ) : (
          <>
            <PlusCircleIcon width={64} height={64} />
            New Product
          </>
        )}
      </h2>
      <FormProvider {...useFormMethods}>
        <AllFieldErrorsProvider allFieldErrors={allFieldErrors}>
          <form noValidate={true} onSubmit={onSubmit}>
            <FormInputField
              fieldName={"name"}
              fieldLabel={"name"}
              size={40}
              maxLength={50}
              spellCheck={"true"}
              autoComplete={"off"}
              required={true}
              placeholder={"e.g., Sloppy Joe's Surprise, Grandma's Award-Winning Pie"}
              defaultValue={name}
            />
            <FormTextArea
              fieldName={"description"}
              fieldLabel={"description"}
              cols={50}
              rows={6}
              maxLength={2049}
              spellCheck={"true"}
              autoComplete={"off"}
              required={true}
              placeholder={"Write a brief description of your product (e.g., features, benefits, target audience)"}
              defaultValue={description}
            />
            <ProductFormImages />
            <PriceInCents />
            <CategoryAndSubCategory categories={categories} />
            <BrandAndLogo brands={brands} />
            <FormCheckField fieldName={"freeShipping"} defaultChecked={freeShipping}>
              <TruckIcon width={24} height={24} />
              Free Shipping
            </FormCheckField>
            <FormSubmit isExecuting={isExecuting} onResetClicked={onResetClicked} />
          </form>
        </AllFieldErrorsProvider>
      </FormProvider>
      {feedback}
    </article>
  );
}
