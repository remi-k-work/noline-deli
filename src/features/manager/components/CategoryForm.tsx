"use client";

// component css styles
import styles from "./CategoryForm.module.css";

// react
import { useState } from "react";

// prisma and db access
import { CategoryWithUser } from "../dbCategories";

// server actions and mutations
import { newCategory, updCategory } from "../actionsCategories";

// other libraries
import { PencilSquareIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import CategoryFormSchema, { CategoryFormSchemaType, CategoryFormState } from "../CategoryFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import useFormActionWithVal from "../useFormActionWithVal";
import { FormProvider } from "react-hook-form";

// components
import { FormInputField } from "./FormControls";
import FormSubmit from "./FormSubmit";
import CategoryFormFeedback from "./CategoryFormFeedback";

// assets
import { lusitana } from "@/assets/fonts";

// types
interface CategoryFormProps {
  category?: CategoryWithUser;
}

interface TheFormWrappedProps {
  category?: CategoryWithUser;
  onResetClicked: () => void;
}

export default function CategoryForm({ category }: CategoryFormProps) {
  // Resetting a form with a key: you can force a subtree to reset its state by giving it a different key
  const [formResetKey, setFormResetKey] = useState("CategoryForm");

  return <TheFormWrapped key={formResetKey} category={category} onResetClicked={() => setFormResetKey(`CategoryForm${Date.now()}`)} />;
}

function TheFormWrapped({ category, onResetClicked }: TheFormWrappedProps) {
  const {
    isPending,
    formState: categoryFormState,
    formAction,
    allFieldErrors,
    showFeedback,
    setShowFeedback,
    onSubmit,
    useFormMethods,
  } = useFormActionWithVal<CategoryFormState, CategoryFormSchemaType>({
    formActionFunc: category ? updCategory.bind(null, category.id) : newCategory,
    resolver: zodResolver(CategoryFormSchema.schema),
    formSchema: new CategoryFormSchema(),
  });

  // Default values for the form
  let defName: string | undefined;

  // Are we in editing mode?
  if (category) {
    // Yes, set all of the form's default values to match those from the edited category
    const { name } = category;

    defName = name;
  }

  return (
    <article className={styles["category-form"]}>
      <h2 className={lusitana.className}>
        {category ? (
          <>
            <PencilSquareIcon width={64} height={64} />
            Edit Category
          </>
        ) : (
          <>
            <PlusCircleIcon width={64} height={64} />
            New Category
          </>
        )}
      </h2>
      <FormProvider {...useFormMethods}>
        <form action={formAction} noValidate={true} onSubmit={useFormMethods.handleSubmit(onSubmit)}>
          {/* <form action={formAction} noValidate={true} onSubmit={(ev) => onSubmit({} as CategoryFormSchemaType, ev)}> */}
          <FormInputField
            fieldName={"name"}
            fieldLabel={"name"}
            allFieldErrors={allFieldErrors}
            size={40}
            maxLength={50}
            spellCheck={"true"}
            autoComplete={"off"}
            required={true}
            placeholder={"e.g., Meat & Seafood, Cheeses, Prepared Salads, Bakery Items"}
            defaultValue={defName}
          />
          <FormSubmit isPending={isPending} onSubmitCompleted={() => setShowFeedback(true)} onResetClicked={onResetClicked} />
        </form>
      </FormProvider>
      {showFeedback && <CategoryFormFeedback category={category} categoryFormState={categoryFormState} setShowFeedback={setShowFeedback} />}
    </article>
  );
}
