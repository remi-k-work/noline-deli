"use client";

// component css styles
import styles from "./index.module.css";

// react
import { useState } from "react";

// prisma and db access
import type { BrandWithUser } from "@/features/manager/brands/db";

// server actions and mutations
import { newBrand2, updBrand2 } from "@/features/manager/brands/actions";

// other libraries
import { z } from "zod";
import { useBrandFormStore } from "@/features/manager/brands/stores/brandFormProvider";
import useFormActionWithVal from "@/features/manager/hooks/useFormActionWithVal";
import { FormProvider } from "react-hook-form";
import { brandFormSchema } from "@/features/manager/brands/schemas/brandForm";
import type { BrandFormSchemaType, BrandFormActionResult } from "@/features/manager/brands/schemas/types";
import PathFinder from "@/lib/PathFinder";
import useFormActionFeedback from "@/features/manager/hooks/useFormActionFeedback";

// components
import { BrandFormStoreProvider } from "@/features/manager/brands/stores/brandFormProvider";
import { AllFieldErrorsProvider } from "@/contexts/AllFieldErrors";
import { FormInputField } from "@/features/manager/components/FormControls";
import Logo from "./Logo";
import FormSubmit from "@/features/manager/components/FormSubmit";
import BrandExcerpt from "@/features/manager/brands/components/BrandExcerpt";

// assets
import { PencilSquareIcon, PlusCircleIcon } from "@heroicons/react/24/solid";

// types
interface BrandFormProps {
  brand?: BrandWithUser;
  isModal?: boolean;
}

interface TheFormWrappedProps {
  brand?: BrandWithUser;
  isModal?: boolean;
  onResetClicked: () => void;
}

export default function BrandForm({ brand, isModal = false }: BrandFormProps) {
  // Resetting a form with a key: you can force a subtree to reset its state by giving it a different key
  const [formResetKey, setFormResetKey] = useState("BrandForm");

  return (
    <BrandFormStoreProvider key={formResetKey} brand={brand}>
      <TheFormWrapped brand={brand} isModal={isModal} onResetClicked={() => setFormResetKey(`BrandForm${Date.now()}`)} />
    </BrandFormStoreProvider>
  );
}

function TheFormWrapped({ brand, isModal = false, onResetClicked }: TheFormWrappedProps) {
  const name = useBrandFormStore((state) => state.name);

  // To provide feedback to the user
  const { feedback, showFeedback } = useFormActionFeedback({
    excerpt: brand ? <BrandExcerpt name={brand.name} logoUrl={brand.logoUrl} /> : undefined,
    pathToAllItems: PathFinder.toAllBrands(),
  });

  const { useFormMethods, onSubmit, allFieldErrors, isPending } = useFormActionWithVal<
    BrandFormSchemaType,
    typeof brandFormSchema,
    readonly [brandId: z.ZodString] | readonly [],
    BrandFormActionResult
  >({
    safeActionFunc: brand ? updBrand2.bind(null, brand.id) : newBrand2,
    formSchema: brandFormSchema,
    showFeedback,
    defaultValues: { name },
  });

  return (
    <article className={styles["brand-form"]}>
      {!isModal && (
        <h2 className="font-lusitana">
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
      )}
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
              placeholder={"e.g., Wedel, Nivea"}
              defaultValue={name}
            />
            <section className={styles["brand-form__logo"]}>
              <header className="font-lusitana">Brand Logo</header>
              <Logo />
            </section>
            <FormSubmit isExecuting={isPending} onResetClicked={onResetClicked} />
          </form>
        </AllFieldErrorsProvider>
      </FormProvider>
      {feedback}
    </article>
  );
}
