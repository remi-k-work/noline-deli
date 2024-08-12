"use client";

// component css styles
import styles from "./CategoryForm.module.css";

// react
import { useState } from "react";

// prisma and db access
import { CategoryWithUser } from "../db";

// server actions and mutations
import { newCategory2, updCategory2 } from "@/features/manager/categories/actions";

// other libraries
import { z } from "zod";
import useFormActionWithVal from "../../useFormActionWithVal";
import { FormProvider } from "react-hook-form";
import { categoryFormSchema } from "../schemas/categoryForm";
import { CategoryFormActionResult } from "../schemas/types";
import PathFinder from "../../PathFinder";
import useFormActionFeedback from "../../useFormActionFeedback";

// components
import { FormInputField } from "../../components/FormControls";
import FormSubmit from "../../components/FormSubmit";

// assets
import { lusitana } from "@/assets/fonts";
import { PencilSquareIcon, PlusCircleIcon } from "@heroicons/react/24/solid";

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
  // To provide feedback to the user
  const { feedback, showFeedback } = useFormActionFeedback({
    excerpt: category ? <p className="text-center text-2xl font-bold">{category.name}</p> : undefined,
    pathToAllItems: PathFinder.toAllCategories(),
  });

  const { useFormMethods, onSubmit, allFieldErrors, isExecuting } = useFormActionWithVal<
    typeof categoryFormSchema,
    readonly [categoryId: z.ZodString] | readonly [],
    CategoryFormActionResult
  >({
    safeActionFunc: category ? updCategory2.bind(null, category.id) : newCategory2,
    formSchema: categoryFormSchema,
    showFeedback,
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
            placeholder={"e.g., Meat & Seafood, Cheeses, Prepared Salads, Bakery Items"}
            defaultValue={defName}
          />
          <FormSubmit isExecuting={isExecuting} onResetClicked={onResetClicked} />
        </form>
      </FormProvider>
      {feedback}
    </article>
  );
}
