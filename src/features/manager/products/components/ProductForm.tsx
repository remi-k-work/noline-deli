"use client";

// component css styles
import styles from "./ProductForm.module.css";

// react
import { useState } from "react";

// prisma and db access
import { ProductWithAll } from "../db";
import { BrandWithUser } from "../../brands/db";
import { CategoryWithSubCategory } from "../../categories/db";

// server actions and mutations
import { newProduct, updProduct } from "../actions";

// other libraries
import { PencilSquareIcon, PlusCircleIcon, TruckIcon } from "@heroicons/react/24/solid";
import ProductFormSchema, { ProductFormSchemaType, ProductFormState } from "../ProductFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import useFormActionWithVal from "../../useFormActionWithVal";
import { FormProvider } from "react-hook-form";

// components
import { FormTextArea, FormInputField, FormCheckField } from "../../components/FormControls";
import { BrandAndLogo, CategoryAndSubCategory, PriceInCents } from "./ProductFormControls";
import ProductFormImages from "./ProductFormImages";
import FormSubmit from "../../components/FormSubmit";
import ProductFormFeedback from "./ProductFormFeedback";

// assets
import { lusitana } from "@/assets/fonts";

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
    <TheFormWrapped
      key={formResetKey}
      product={product}
      brands={brands}
      categories={categories}
      onResetClicked={() => setFormResetKey(`ProductForm${Date.now()}`)}
    />
  );
}

function TheFormWrapped({ product, brands, categories, onResetClicked }: TheFormWrappedProps) {
  const {
    isPending,
    formState: productFormState,
    formAction,
    allFieldErrors,
    showFeedback,
    setShowFeedback,
    onSubmit,
    useFormMethods,
  } = useFormActionWithVal<ProductFormState, ProductFormSchemaType>({
    formActionFunc: product ? updProduct.bind(null, product.id, product.createdAt) : newProduct,
    resolver: zodResolver(ProductFormSchema.schema),
    formSchema: new ProductFormSchema(),
  });

  // Default values for the form
  let defName: string | undefined;
  let defDescription: string | undefined;
  let defTheMainImageUrl: string | undefined;
  let defMoreImagesUrls: string[] | undefined;
  let defPriceInCents: number | undefined;
  let defSelectedCategoryId: string | undefined;
  let defSelectedSubCategoryId: string | undefined;
  let defSelectedBrandId: string | undefined;
  let defFreeShipping: boolean | undefined;

  // Are we in editing mode?
  if (product) {
    // Yes, set all of the form's default values to match those from the edited product
    const { name, description, imageUrl, moreImages, price, categories, subCategories, brandId, freeShipping } = product;

    defName = name;
    defDescription = description;
    defTheMainImageUrl = imageUrl;
    defMoreImagesUrls = moreImages.map(({ imageUrl }) => imageUrl);
    defPriceInCents = price;
    defSelectedCategoryId = categories.length > 0 ? categories[0].categoryId : undefined;
    defSelectedSubCategoryId = subCategories.length > 0 ? subCategories[0].subCategoryId : undefined;
    defSelectedBrandId = brandId ?? undefined;
    defFreeShipping = freeShipping;
  }

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
        <form action={formAction} noValidate={true} onSubmit={useFormMethods.handleSubmit(onSubmit)}>
          {/* <form action={formAction} noValidate={true} onSubmit={(ev) => onSubmit({} as ProductFormSchemaType, ev)}> */}
          <FormInputField
            fieldName={"name"}
            fieldLabel={"name"}
            allFieldErrors={allFieldErrors}
            size={40}
            maxLength={50}
            spellCheck={"true"}
            autoComplete={"off"}
            required={true}
            placeholder={"e.g., Sloppy Joe's Surprise, Grandma's Award-Winning Pie"}
            defaultValue={defName}
          />
          <FormTextArea
            fieldName={"description"}
            fieldLabel={"description"}
            allFieldErrors={allFieldErrors}
            cols={50}
            rows={6}
            maxLength={2049}
            spellCheck={"true"}
            autoComplete={"off"}
            required={true}
            placeholder={"Write a brief description of your product (e.g., features, benefits, target audience)"}
            defaultValue={defDescription}
          />
          <ProductFormImages theMainImageUrl={defTheMainImageUrl} moreImagesUrls={defMoreImagesUrls} allFieldErrors={allFieldErrors} />
          <PriceInCents priceInCents={defPriceInCents} allFieldErrors={allFieldErrors} />
          <CategoryAndSubCategory
            categories={categories}
            selectedCategoryId={defSelectedCategoryId}
            selectedSubCategoryId={defSelectedSubCategoryId}
            allFieldErrors={allFieldErrors}
          />
          <BrandAndLogo brands={brands} selectedBrandId={defSelectedBrandId} allFieldErrors={allFieldErrors} />
          <FormCheckField fieldName={"freeShipping"} allFieldErrors={allFieldErrors} defaultChecked={defFreeShipping}>
            <TruckIcon width={24} height={24} />
            Free Shipping
          </FormCheckField>
          <FormSubmit isPending={isPending} onSubmitCompleted={() => setShowFeedback(true)} onResetClicked={onResetClicked} />
        </form>
      </FormProvider>
      {showFeedback && <ProductFormFeedback product={product} productFormState={productFormState} setShowFeedback={setShowFeedback} />}
    </article>
  );
}
