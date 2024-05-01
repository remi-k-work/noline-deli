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
import { routeToBrandLogo } from "@/features/products/helpers";

// components
import { FormInputField, FormOutputField, FormSelectField } from "./FormControls";

// types
interface PriceInCentsProps {
  priceInCents?: number;
}

interface BrandAndLogoProps {
  brands: BrandWithUser[];
  selectedBrandId?: string;
}

interface CategoryAndSubCategoryProps {
  categories: CategoryWithSubCategory[];
  selectedCategoryId?: string;
  selectedSubCategoryId?: string;
}

export function PriceInCents({ priceInCents = 1 }: PriceInCentsProps) {
  const [currPriceInCents, setCurrPriceInCents] = useState(priceInCents);

  return (
    <section className={styles["price-in-cents"]}>
      <FormInputField
        fieldType={"number"}
        fieldName={"price"}
        fieldLabel={"price in cents"}
        fieldErrors={[]}
        min={"1"}
        max={"900000000"}
        step={"1"}
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

export function BrandAndLogo({ brands, selectedBrandId = "" }: BrandAndLogoProps) {
  const [currSelectedBrandId, setCurrSelectedBrandId] = useState(selectedBrandId);

  const currentBrand = brands.find(({ id }) => id === currSelectedBrandId);

  return (
    <section className={styles["brand-and-logo"]}>
      <FormSelectField
        fieldName={"brandId"}
        fieldLabel={"brand"}
        fieldErrors={[]}
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
        {currentBrand && currentBrand.logoUrl ? (
          <Image
            src={routeToBrandLogo(currentBrand.logoUrl)}
            width={320}
            height={200}
            alt={currentBrand.name}
            sizes="50vw"
            className="h-12 w-auto object-contain"
          />
        ) : (
          <>No Logo</>
        )}
      </FormOutputField>
    </section>
  );
}

export function CategoryAndSubCategory({ categories, selectedCategoryId = "", selectedSubCategoryId = "" }: CategoryAndSubCategoryProps) {
  const [currSelectedCategoryId, setCurrSelectedCategoryId] = useState(selectedCategoryId);
  const [currSelectedSubCategoryId, setCurrSelectedSubCategoryId] = useState(selectedSubCategoryId);

  const currentCategory = categories.find(({ id }) => id === currSelectedCategoryId);
  const hasSubCategories = currentCategory ? currentCategory.subCategories.length > 0 : false;

  return (
    <section className={styles["category-and-subcategory"]}>
      <FormSelectField
        fieldName={"categoryId"}
        fieldLabel={"category"}
        fieldErrors={[]}
        value={currSelectedCategoryId}
        onChange={(ev) => setCurrSelectedCategoryId(ev.target.value)}
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
        fieldErrors={[]}
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
