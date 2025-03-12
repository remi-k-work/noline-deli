"use client";

// component css styles
import styles from "./CategoryForm.module.css";

// react
import { useState } from "react";

// prisma and db access
import type { CategoryWithUser } from "@/features/manager/categories/db";

// server actions and mutations
import { newCategory2, updCategory2 } from "@/features/manager/categories/actions";

// other libraries
import { z } from "zod";
import { useCategoryFormStore } from "@/features/manager/categories/stores/categoryFormProvider";
import useFormActionWithVal from "@/features/manager/hooks/useFormActionWithVal";
import { FormProvider } from "react-hook-form";
import { categoryFormSchema } from "@/features/manager/categories/schemas/categoryForm";
import type { CategoryFormSchemaType, CategoryFormActionResult } from "@/features/manager/categories/schemas/types";
import PathFinder from "@/lib/PathFinder";
import useFormActionFeedback from "@/features/manager/hooks/useFormActionFeedback";

// components
import { CategoryFormStoreProvider } from "@/features/manager/categories/stores/categoryFormProvider";
import { AllFieldErrorsContext } from "@/contexts/AllFieldErrors";
import { FormInputField } from "@/features/manager/components/FormControls";
import FormSubmit from "@/features/manager/components/FormSubmit";

// assets
import { PencilSquareIcon, PlusCircleIcon } from "@heroicons/react/24/solid";

// types
interface CategoryFormProps {
  category?: CategoryWithUser;
  isModal?: boolean;
}

interface TheFormWrappedProps {
  category?: CategoryWithUser;
  isModal?: boolean;
  onResetClicked: () => void;
}

export default function CategoryForm({ category, isModal = false }: CategoryFormProps) {
  // Resetting a form with a key: you can force a subtree to reset its state by giving it a different key
  const [formResetKey, setFormResetKey] = useState("CategoryForm");

  return (
    <CategoryFormStoreProvider key={formResetKey} category={category}>
      <TheFormWrapped category={category} isModal={isModal} onResetClicked={() => setFormResetKey(`CategoryForm${Date.now()}`)} />
    </CategoryFormStoreProvider>
  );
}

function TheFormWrapped({ category, isModal = false, onResetClicked }: TheFormWrappedProps) {
  const name = useCategoryFormStore((state) => state.name);

  // To provide feedback to the user
  const { feedback, showFeedback } = useFormActionFeedback({
    excerpt: category ? <p className="text-center text-2xl font-bold">{category.name}</p> : undefined,
    pathToAllItems: PathFinder.toAllCategories(),
  });

  const { useFormMethods, onSubmit, allFieldErrors, isPending } = useFormActionWithVal<
    CategoryFormSchemaType,
    typeof categoryFormSchema,
    readonly [categoryId: z.ZodString] | readonly [],
    CategoryFormActionResult
  >({
    safeActionFunc: category ? updCategory2.bind(null, category.id) : newCategory2,
    formSchema: categoryFormSchema,
    showFeedback,
    defaultValues: { name },
  });

  return (
    <article className={styles["category-form"]}>
      {!isModal && (
        <h2 className="font-lusitana">
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
      )}
      <FormProvider {...useFormMethods}>
        <AllFieldErrorsContext value={{ allFieldErrors }}>
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
            <FormSubmit isExecuting={isPending} onResetClicked={onResetClicked} />
          </form>
        </AllFieldErrorsContext>
      </FormProvider>
      {feedback}
    </article>
  );
}
