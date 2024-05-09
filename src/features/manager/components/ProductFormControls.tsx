"use client";

// component css styles
import styles from "./ProductFormControls.module.css";

// react
import { useState } from "react";

// next
import Image from "next/image";

// prisma and db access
import { BrandWithUser, CategoryWithSubCategory } from "../managerDb";

// other libraries
import { formatPrice } from "@/lib/helpers";
import PathFinder from "../PathFinder";

// components
import { FormInputField, FormOutputField, FormSelectField } from "./FormControls";

// types
interface AllFieldErrors {
  [index: string]: string[] | undefined;
}

interface PriceInCentsProps {
  priceInCents?: number;
  allFieldErrors?: AllFieldErrors;
}

interface BrandAndLogoProps {
  brands: BrandWithUser[];
  selectedBrandId?: string;
  allFieldErrors?: AllFieldErrors;
}

interface CategoryAndSubCategoryProps {
  categories: CategoryWithSubCategory[];
  selectedCategoryId?: string;
  selectedSubCategoryId?: string;
  allFieldErrors?: AllFieldErrors;
}

export function PriceInCents({ priceInCents = 1, allFieldErrors }: PriceInCentsProps) {
  const [currPriceInCents, setCurrPriceInCents] = useState(priceInCents);

  return (
    <section className={styles["price-in-cents"]}>
      <FormInputField
        fieldType={"number"}
        fieldName={"price"}
        fieldLabel={"price in cents"}
        allFieldErrors={allFieldErrors}
        min={"1"}
        max={"900000000"}
        step={"1"}
        required={true}
        defaultValue={priceInCents}
        onChange={(ev) => setCurrPriceInCents(Number(ev.target.value))}
      />
      <FormOutputField outputFor={"price"} fieldName={"priceInDollars"} fieldLabel={"price in dollars"}>
        <div className="stats min-w-full">
          <div className="stat">
            <div className="stat-value text-base font-normal">{formatPrice(currPriceInCents)}</div>
          </div>
        </div>
      </FormOutputField>
    </section>
  );
}

export function BrandAndLogo({ brands, selectedBrandId = "", allFieldErrors }: BrandAndLogoProps) {
  const [currSelectedBrandId, setCurrSelectedBrandId] = useState(selectedBrandId);

  const currentBrand = brands.find(({ id }) => id === currSelectedBrandId);
  const currentLogoSrc = PathFinder.toBrandLogo(currentBrand?.logoUrl);

  return (
    <section className={styles["brand-and-logo"]}>
      <FormSelectField
        fieldName={"brandId"}
        fieldLabel={"brand"}
        allFieldErrors={allFieldErrors}
        value={currSelectedBrandId}
        onChange={(ev) => setCurrSelectedBrandId(ev.target.value)}
      >
        <option value="">Choose Brand</option>
        {brands.map(({ id, name }) => {
          return (
            <option key={id} value={id}>
              {name}
            </option>
          );
        })}
      </FormSelectField>
      <FormOutputField outputFor={"brandId"} fieldName={"brandLogo"} fieldLabel={"logo"}>
        {currentLogoSrc ? (
          <Image src={currentLogoSrc} width={320} height={200} alt={"Brand Logo"} sizes="50vw" className="h-12 w-auto object-contain" />
        ) : (
          <>No Logo</>
        )}
      </FormOutputField>
    </section>
  );
}

export function CategoryAndSubCategory({ categories, selectedCategoryId = "", selectedSubCategoryId = "", allFieldErrors }: CategoryAndSubCategoryProps) {
  const [currSelectedCategoryId, setCurrSelectedCategoryId] = useState(selectedCategoryId);
  const [currSelectedSubCategoryId, setCurrSelectedSubCategoryId] = useState(selectedSubCategoryId);

  const currentCategory = categories.find(({ id }) => id === currSelectedCategoryId);
  const hasSubCategories = currentCategory ? currentCategory.subCategories.length > 0 : false;

  return (
    <section className={styles["category-and-subcategory"]}>
      <FormSelectField
        fieldName={"categoryId"}
        fieldLabel={"category"}
        allFieldErrors={allFieldErrors}
        required={true}
        value={currSelectedCategoryId}
        onChange={(ev) => {
          setCurrSelectedCategoryId(ev.target.value);
          setCurrSelectedSubCategoryId("");
        }}
      >
        <option value="">Choose Category</option>
        {categories.map(({ id, name }) => {
          return (
            <option key={id} value={id}>
              {name}
            </option>
          );
        })}
      </FormSelectField>
      <FormSelectField
        fieldName={"subCategoryId"}
        fieldLabel={"subcategory"}
        allFieldErrors={allFieldErrors}
        required={true}
        value={currSelectedSubCategoryId}
        disabled={!hasSubCategories}
        onChange={(ev) => setCurrSelectedSubCategoryId(ev.target.value)}
      >
        <option value="">Choose SubCategory</option>
        {currentCategory?.subCategories.map(({ id, name }) => {
          return (
            <option key={id} value={id}>
              {name}
            </option>
          );
        })}
      </FormSelectField>
    </section>
  );
}
