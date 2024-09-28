"use client";

// component css styles
import styles from "./Controls.module.css";

// next
import Image from "next/image";

// prisma and db access
import { BrandWithUser } from "../../../brands/db";
import { CategoryWithSubCategory } from "../../../categories/db";

// other libraries
import { useProductFormStore } from "../../stores/productFormProvider";
import { useAllFieldErrorsContext } from "../../../../../lib/contexts/AllFieldErrors";
import { useFormContext } from "react-hook-form";
import { formatPrice } from "@/lib/helpers";
import PathFinder from "../../../../../lib/PathFinder";

// components
import { ErrorMessage, FormInputField, FormOutputField, FormSelectField } from "../../../components/FormControls";

interface BrandAndLogoProps {
  brands: BrandWithUser[];
}

interface CategoryAndSubCategoryProps {
  categories: CategoryWithSubCategory[];
}

export function PriceInCents() {
  const priceInCents = useProductFormStore((state) => state.priceInCents);
  const priceChanged = useProductFormStore((state) => state.priceChanged);
  const { allFieldErrors } = useAllFieldErrorsContext();

  return (
    <>
      <section className={styles["price-in-cents"]}>
        <FormInputField
          fieldType={"number"}
          fieldName={"price"}
          fieldLabel={"price in cents"}
          renderErrors={false}
          min={"1"}
          max={"900000000"}
          step={"1"}
          required={true}
          placeholder={"e.g., 9995"}
          value={priceInCents}
          onChange={(ev) => priceChanged(Number(ev.target.value))}
        />
        <FormOutputField outputFor={"price"} fieldName={"priceInDollars"} fieldLabel={"price in dollars"}>
          <div className="stats min-w-full">
            <div className="stat">
              <div className="stat-value text-base font-normal">{formatPrice(priceInCents)}</div>
            </div>
          </div>
        </FormOutputField>
      </section>
      {allFieldErrors["price"] && <ErrorMessage fieldErrors={allFieldErrors["price"]} />}
    </>
  );
}

export function BrandAndLogo({ brands }: BrandAndLogoProps) {
  const selectedBrandId = useProductFormStore((state) => state.selectedBrandId);
  const brandSelected = useProductFormStore((state) => state.brandSelected);
  const { allFieldErrors } = useAllFieldErrorsContext();

  const currentBrand = brands.find(({ id }) => id === selectedBrandId);
  const currentLogoSrc = PathFinder.toBrandLogo(currentBrand?.logoUrl);

  return (
    <>
      <section className={styles["brand-and-logo"]}>
        <FormSelectField
          fieldName={"brandId"}
          fieldLabel={"brand"}
          renderErrors={false}
          value={selectedBrandId}
          onChange={(ev) => brandSelected(ev.target.value)}
        >
          <option value="">Choose Brand</option>
          {brands.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
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
  const selectedCategoryId = useProductFormStore((state) => state.selectedCategoryId);
  const selectedSubCategoryId = useProductFormStore((state) => state.selectedSubCategoryId);
  const categorySelected = useProductFormStore((state) => state.categorySelected);
  const subCategorySelected = useProductFormStore((state) => state.subCategorySelected);

  const { allFieldErrors } = useAllFieldErrorsContext();

  const currentCategory = categories.find(({ id }) => id === selectedCategoryId);
  const hasSubCategories = currentCategory ? currentCategory.subCategories.length > 0 : false;

  // Retrieve all needed useform hook methods and props
  const { setValue } = useFormContext();

  return (
    <>
      <section className={styles["category-and-subcategory"]}>
        <FormSelectField
          fieldName={"categoryId"}
          fieldLabel={"category"}
          renderErrors={false}
          required={true}
          value={selectedCategoryId}
          onChange={(ev) => {
            categorySelected(ev.target.value, categories);

            // Keep the react hook form state in sync (we must manually update any dependent fields)
            setValue("subCategoryId", hasSubCategories ? "+" : "");
          }}
        >
          <option value="">Choose Category</option>
          {categories.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </FormSelectField>
        <FormSelectField
          fieldName={"subCategoryId"}
          fieldLabel={"subcategory"}
          renderErrors={false}
          required={true}
          value={selectedSubCategoryId}
          disabled={!hasSubCategories}
          onChange={(ev) => subCategorySelected(ev.target.value)}
        >
          {hasSubCategories ? (
            // Inform the validation schema that a subcategory must be picked now (field required conditionally)
            <option value="+">Choose SubCategory</option>
          ) : (
            // There is no need to select a subcategory when there are none available (default behavior)
            <option value="">Choose SubCategory</option>
          )}
          {currentCategory?.subCategories.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </FormSelectField>
      </section>
      {allFieldErrors["categoryId"] && <ErrorMessage fieldErrors={allFieldErrors["categoryId"]} />}
      {allFieldErrors["subCategoryId"] && <ErrorMessage fieldErrors={allFieldErrors["subCategoryId"]} />}
    </>
  );
}
