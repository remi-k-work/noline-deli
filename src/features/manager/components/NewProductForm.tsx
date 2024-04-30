"use client";

// component css styles
import styles from "./NewProductForm.module.css";

// react
import { useState } from "react";

// other libraries
import clsx from "clsx";
import { HandThumbUpIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import { formatPrice } from "@/lib/helpers";

// components
import { FormTextArea, FormInputField, FormOutputField } from "./FormControls";

// assets
import { lusitana } from "@/assets/fonts";

export default function NewProductForm() {
  const [priceInCents, setPriceInCents] = useState(1);

  return (
    <article className={styles["new-product-form"]}>
      <h2 className={lusitana.className}>
        <PencilSquareIcon width={64} height={64} />
        New Product
      </h2>
      <form>
        <FormInputField
          fieldName={"name"}
          fieldLabel={"name"}
          fieldErrors={[]}
          size={40}
          maxLength={50}
          spellCheck={"true"}
          autoComplete={"off"}
          defaultValue={""}
        />
        <FormTextArea
          fieldName={"description"}
          fieldLabel={"description"}
          fieldErrors={[]}
          cols={50}
          rows={6}
          spellCheck={"true"}
          autoComplete={"off"}
          defaultValue={""}
        />
        <FormInputField
          type={"url"}
          fieldName={"imageUrl"}
          fieldLabel={"image url"}
          fieldErrors={[]}
          size={40}
          maxLength={50}
          spellCheck={"false"}
          autoComplete={"off"}
          defaultValue={""}
        />
        <div className="flex gap-2">
          <FormInputField
            type={"number"}
            fieldName={"price"}
            fieldLabel={"price in cents"}
            fieldErrors={[]}
            min={"1"}
            max={"900000000"}
            step={"1"}
            defaultValue={"1"}
            onChange={(e) => setPriceInCents(Number(e.target.value))}
          />
          <FormOutputField outputFor={"price"} fieldName={"priceInDollars"} fieldLabel={"price in dollars"}>
            <div className="stats min-w-full shadow">
              <div className="stat">
                <div className="stat-value text-lg">{formatPrice(priceInCents)}</div>
              </div>
            </div>
          </FormOutputField>
        </div>
      </form>
    </article>
  );
}
