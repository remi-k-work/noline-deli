"use client";

// component css styles
import styles from "./BrandForm.module.css";

// react
import { useState } from "react";

// prisma and db access
import { BrandWithUser } from "../dbBrands";

// server actions and mutations
import { newBrand, updBrand } from "../actionsBrands";

// other libraries
import { PencilSquareIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import BrandFormSchema, { BrandFormSchemaType, BrandFormState } from "../BrandFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import useFormActionWithVal from "../useFormActionWithVal";
import { FormProvider } from "react-hook-form";

// components
import { FormInputField } from "./FormControls";
import BrandFormLogo from "./BrandFormLogo";
import FormSubmit from "./FormSubmit";
import BrandFormFeedback from "./BrandFormFeedback";

// assets
import { lusitana } from "@/assets/fonts";

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
  const {
    isPending,
    formState: brandFormState,
    formAction,
    allFieldErrors,
    showFeedback,
    setShowFeedback,
    onSubmit,
    useFormMethods,
  } = useFormActionWithVal<BrandFormState, BrandFormSchemaType>({
    formActionFunc: brand ? updBrand.bind(null, brand.id) : newBrand,
    resolver: zodResolver(BrandFormSchema.schema),
    formSchema: new BrandFormSchema(),
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
        <form action={formAction} noValidate={true} onSubmit={useFormMethods.handleSubmit(onSubmit)}>
          {/* <form action={formAction} noValidate={true} onSubmit={(ev) => onSubmit({} as BrandFormSchemaType, ev)}> */}
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
          <FormSubmit isPending={isPending} onSubmitCompleted={() => setShowFeedback(true)} onResetClicked={onResetClicked} />
        </form>
      </FormProvider>
      {showFeedback && <BrandFormFeedback brand={brand} brandFormState={brandFormState} setShowFeedback={setShowFeedback} />}
    </article>
  );
}
