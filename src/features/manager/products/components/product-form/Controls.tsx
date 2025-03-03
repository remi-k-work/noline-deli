"use client";

// component css styles
import styles from "./Controls.module.css";

// next
import Image from "next/image";

// prisma and db access
import type { BrandWithUser } from "@/features/manager/brands/db";
import type { CategoryWithSubCategory } from "@/features/manager/categories/db";

// other libraries
import { useProductFormStore } from "@/features/manager/products/stores/productFormProvider";
import { useAllFieldErrorsContext } from "@/contexts/AllFieldErrors";
import { formatCurrency } from "@/lib/formatters";
import PathFinder from "@/lib/PathFinder";

// components
import { SelectItem } from "@/components/ui/select";
import { ErrorMessage, FormHiddenField, FormInputField, FormOutputField, FormSelectField } from "@/features/manager/components/FormControls";

interface BrandAndLogoProps {
  brands: BrandWithUser[];
}

interface CategoryAndSubCategoryProps {
  categories: CategoryWithSubCategory[];
}

export function PriceInCents() {
  const price = useProductFormStore((state) => state.price);
  const priceChanged = useProductFormStore((state) => state.priceChanged);
  const { allFieldErrors } = useAllFieldErrorsContext();

  return (
    <>
      <section className={styles["price-in-cents"]}>
        <FormInputField
          type="number"
          fieldName={"price"}
          fieldLabel={"price in cents"}
          renderErrors={false}
          min={"1"}
          max={"900000000"}
          step={"1"}
          required={true}
          placeholder={"e.g., 9995"}
          value={price}
          onChange={(ev) => priceChanged(Number(ev.target.value))}
        />
        <FormOutputField outputFor={"price"} fieldName={"priceInDollars"} fieldLabel={"price in dollars"}>
          {formatCurrency(price)}
        </FormOutputField>
      </section>
      {allFieldErrors["price"] && <ErrorMessage fieldErrors={allFieldErrors["price"]} />}
    </>
  );
}

export function BrandAndLogo({ brands }: BrandAndLogoProps) {
  const brandId = useProductFormStore((state) => state.brandId);
  const brandSelected = useProductFormStore((state) => state.brandSelected);
  const { allFieldErrors } = useAllFieldErrorsContext();

  const currentBrand = brands.find(({ id }) => id === brandId);
  const currentLogoSrc = PathFinder.toBrandLogo(currentBrand?.logoUrl);

  return (
    <>
      <section className={styles["brand-and-logo"]}>
        <FormSelectField
          fieldName={"brandId"}
          fieldLabel={"brand"}
          placeholder="Choose Brand"
          renderErrors={false}
          value={brandId}
          onValueChange={(value) => brandSelected(value)}
        >
          {brands.map(({ id, name }) => (
            <SelectItem key={id} value={id}>
              {name}
            </SelectItem>
          ))}
        </FormSelectField>
        <FormOutputField outputFor={"brandId"} fieldName={"brandLogo"} fieldLabel={"logo"}>
          {currentLogoSrc ? (
            <Image src={currentLogoSrc} width={320} height={200} alt={"Brand Logo"} sizes="50vw" className="h-12 w-auto object-contain" />
          ) : (
            <>No Logo</>
          )}
        </FormOutputField>
      </section>
      {allFieldErrors["brandId"] && <ErrorMessage fieldErrors={allFieldErrors["brandId"]} />}
    </>
  );
}

export function CategoryAndSubCategory({ categories }: CategoryAndSubCategoryProps) {
  const categoryId = useProductFormStore((state) => state.categoryId);
  const subCategoryId = useProductFormStore((state) => state.subCategoryId);
  const hasSubCategories = useProductFormStore((state) => state.hasSubCategories);
  const categorySelected = useProductFormStore((state) => state.categorySelected);
  const subCategorySelected = useProductFormStore((state) => state.subCategorySelected);

  const { allFieldErrors } = useAllFieldErrorsContext();
  const currentCategory = categories.find(({ id }) => id === categoryId);

  return (
    <>
      <section className={styles["category-and-subcategory"]}>
        <FormSelectField
          fieldName={"categoryId"}
          fieldLabel={"category"}
          placeholder="Choose Category"
          renderErrors={false}
          required={true}
          value={categoryId}
          onValueChange={(value) => categorySelected(value, categories)}
        >
          {categories.map(({ id, name }) => (
            <SelectItem key={id} value={id}>
              {name}
            </SelectItem>
          ))}
        </FormSelectField>
        <FormSelectField
          fieldName={"subCategoryId"}
          fieldLabel={"subcategory"}
          placeholder="Choose SubCategory"
          renderErrors={false}
          required={true}
          disabled={!hasSubCategories}
          value={subCategoryId}
          onValueChange={(value) => subCategorySelected(value)}
        >
          {currentCategory?.subCategories.map(({ id, name }) => (
            <SelectItem key={id} value={id}>
              {name}
            </SelectItem>
          ))}
        </FormSelectField>
      </section>
      {allFieldErrors["categoryId"] && <ErrorMessage fieldErrors={allFieldErrors["categoryId"]} />}
      {allFieldErrors["subCategoryId"] && <ErrorMessage fieldErrors={allFieldErrors["subCategoryId"]} />}
      <FormHiddenField fieldName="hasSubCategories" value={hasSubCategories ? String(hasSubCategories) : ""} />
    </>
  );
}
