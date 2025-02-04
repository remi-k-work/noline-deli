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
import { useCategoryFormStore } from "../stores/categoryFormProvider";
import useFormActionWithVal from "../../hooks/useFormActionWithVal";
import { FormProvider } from "react-hook-form";
import { categoryFormSchema } from "../schemas/categoryForm";
import { CategoryFormActionResult } from "../schemas/types";
import PathFinder from "../../../../lib/PathFinder";
import useFormActionFeedback from "../../hooks/useFormActionFeedback";

// components
import { CategoryFormStoreProvider } from "../stores/categoryFormProvider";
import { AllFieldErrorsProvider } from "../../../../lib/contexts/AllFieldErrors";
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

  return (
    <CategoryFormStoreProvider key={formResetKey} category={category}>
      <TheFormWrapped category={category} onResetClicked={() => setFormResetKey(`CategoryForm${Date.now()}`)} />
    </CategoryFormStoreProvider>
  );
}

function TheFormWrapped({ category, onResetClicked }: TheFormWrappedProps) {
  const name = useCategoryFormStore((state) => state.name);

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
              placeholder={"e.g., Meat & Seafood, Cheeses, Prepared Salads, Bakery Items"}
              defaultValue={name}
            />
            <FormSubmit isExecuting={isExecuting} onResetClicked={onResetClicked} />
          </form>
        </AllFieldErrorsProvider>
      </FormProvider>
      {feedback}
    </article>
  );
}
