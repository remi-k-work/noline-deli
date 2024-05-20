"use client";

// component css styles
import styles from "./ProductForm.module.css";

// react
import { useState } from "react";

// prisma and db access
import { BrandWithUser, CategoryWithSubCategory, ProductWithAll } from "../managerDb";

// server actions and mutations
import { newProduct, updProduct } from "../managerActions";

// other libraries
import { PencilSquareIcon, PlusCircleIcon, TruckIcon } from "@heroicons/react/24/solid";
import ProductFormSchema, { ProductFormSchemaType, ProductFormState } from "../ProductFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import useFormActionWithVal from "../useFormActionWithVal";

// components
import { FormTextArea, FormInputField, FormCheckField } from "./FormControls";
import { BrandAndLogo, CategoryAndSubCategory, PriceInCents } from "./ProductFormControls";
import ProductFormImages from "./ProductFormImages";
import ProductFormSubmit, { ProductFormFeedback } from "./ProductFormSubmit";

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
  const { isPending, formState, formAction, allFieldErrors, register, unregister, handleSubmit, setValue, showFeedback, setShowFeedback, onSubmit } =
    useFormActionWithVal<ProductFormState, ProductFormSchemaType>({
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
      {/* <form action={formAction} noValidate={true} onSubmit={handleSubmit(onSubmit)}> */}
      <form action={formAction} noValidate={true} onSubmit={(ev) => onSubmit({} as ProductFormSchemaType, ev)}>
        <FormInputField
          fieldName={"name"}
          fieldLabel={"name"}
          allFieldErrors={allFieldErrors}
          size={40}
          maxLength={50}
          spellCheck={"true"}
          autoComplete={"off"}
          required={true}
          defaultValue={defName}
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
          defaultValue={defDescription}
          register={register}
        />
        <ProductFormImages
          theMainImageUrl={defTheMainImageUrl}
          moreImagesUrls={defMoreImagesUrls}
          allFieldErrors={allFieldErrors}
          register={register}
          unregister={unregister}
        />
        <PriceInCents priceInCents={defPriceInCents} allFieldErrors={allFieldErrors} register={register} />
        <CategoryAndSubCategory
          categories={categories}
          selectedCategoryId={defSelectedCategoryId}
          selectedSubCategoryId={defSelectedSubCategoryId}
          allFieldErrors={allFieldErrors}
          register={register}
          setValue={setValue}
        />
        <BrandAndLogo brands={brands} selectedBrandId={defSelectedBrandId} allFieldErrors={allFieldErrors} register={register} />
        <FormCheckField fieldName={"freeShipping"} allFieldErrors={allFieldErrors} defaultChecked={defFreeShipping} register={register}>
          <TruckIcon width={24} height={24} />
          Free Shipping
        </FormCheckField>
        <ProductFormSubmit isPending={isPending} onSubmitCompleted={() => setShowFeedback(true)} onResetClicked={onResetClicked} />
      </form>
      {showFeedback && <ProductFormFeedback product={product} formState={formState} setShowFeedback={setShowFeedback} />}
    </article>
  );
}
