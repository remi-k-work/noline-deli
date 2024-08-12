"use client";

// component css styles
import styles from "./BrandForm.module.css";

// react
import { useState } from "react";

// prisma and db access
import { BrandWithUser } from "../db";

// server actions and mutations
import { newBrand2, updBrand2 } from "@/features/manager/brands/actions";

// other libraries
import { z } from "zod";
import useFormActionWithVal from "../../useFormActionWithVal";
import { FormProvider } from "react-hook-form";
import { brandFormSchema } from "../schemas/brandForm";
import { BrandFormActionResult } from "../schemas/types";
import PathFinder from "../../PathFinder";
import useFormActionFeedback from "../../useFormActionFeedback";

// components
import { FormInputField } from "../../components/FormControls";
import BrandFormLogo from "./BrandFormLogo";
import FormSubmit from "../../components/FormSubmit";
import BrandExcerpt from "./BrandExcerpt";

// assets
import { lusitana } from "@/assets/fonts";
import { PencilSquareIcon, PlusCircleIcon } from "@heroicons/react/24/solid";

// types
interface BrandFormProps {
  brand?: BrandWithUser;
}

interface TheFormWrappedProps {
  brand?: BrandWithUser;
  onResetClicked: () => void;
}

export default function BrandForm({ brand }: BrandFormProps) {
  // Resetting a form with a key: you can force a subtree to reset its state by giving it a different key
  const [formResetKey, setFormResetKey] = useState("BrandForm");

  return <TheFormWrapped key={formResetKey} brand={brand} onResetClicked={() => setFormResetKey(`BrandForm${Date.now()}`)} />;
}

function TheFormWrapped({ brand, onResetClicked }: TheFormWrappedProps) {
  // To provide feedback to the user
  const { feedback, showFeedback } = useFormActionFeedback({
    excerpt: brand ? <BrandExcerpt name={brand.name} logoUrl={brand.logoUrl} /> : undefined,
    pathToAllItems: PathFinder.toAllBrands(),
  });

  const { useFormMethods, onSubmit, allFieldErrors, isExecuting } = useFormActionWithVal<
    typeof brandFormSchema,
    readonly [brandId: z.ZodString] | readonly [],
    BrandFormActionResult
  >({
    safeActionFunc: brand ? updBrand2.bind(null, brand.id) : newBrand2,
    formSchema: brandFormSchema,
    showFeedback,
  });

  // Default values for the form
  let defName: string | undefined;
  let defLogoUrl: string | undefined;

  // Are we in editing mode?
  if (brand) {
    // Yes, set all of the form's default values to match those from the edited brand
    const { name, logoUrl } = brand;

    defName = name;
    defLogoUrl = logoUrl ?? undefined;
  }

  return (
    <article className={styles["brand-form"]}>
      <h2 className={lusitana.className}>
        {brand ? (
          <>
            <PencilSquareIcon width={64} height={64} />
            Edit Brand
          </>
        ) : (
          <>
            <PlusCircleIcon width={64} height={64} />
            New Brand
          </>
        )}
      </h2>
      <FormProvider {...useFormMethods}>
        <form noValidate={true} onSubmit={useFormMethods.handleSubmit(onSubmit)}>
          <FormInputField
            fieldName={"name"}
            fieldLabel={"name"}
            allFieldErrors={allFieldErrors}
            size={40}
            maxLength={50}
            spellCheck={"true"}
            autoComplete={"off"}
            required={true}
            placeholder={"e.g., Wedel, Nivea"}
            defaultValue={defName}
          />
          <section className={styles["brand-form__logo"]}>
            <header className={lusitana.className}>Brand Logo</header>
            <BrandFormLogo logoUrl={defLogoUrl} allFieldErrors={allFieldErrors} />
          </section>
          <FormSubmit isExecuting={isExecuting} onResetClicked={onResetClicked} />
        </form>
      </FormProvider>
      {feedback}
    </article>
  );
}
