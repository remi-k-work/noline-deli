"use client";

// component css styles
import styles from "./SubCategoryForm.module.css";

// react
import { useState } from "react";

// prisma and db access
import { CategoryWithSubCategory, SubCategoryWithUser } from "../../categories/db";

// server actions and mutations
import { newSubCategory2, updSubCategory2 } from "@/features/manager/subcategories/actions";

// other libraries
import { z } from "zod";
import { useSubCategoryFormStore } from "../stores/subCategoryFormProvider";
import useFormActionWithVal from "../../hooks/useFormActionWithVal";
import { FormProvider } from "react-hook-form";
import { subCategoryFormSchema } from "../schemas/subCategoryForm";
import { SubCategoryFormActionResult } from "../schemas/types";
import PathFinder from "../../../../lib/PathFinder";
import useFormActionFeedback from "../../hooks/useFormActionFeedback";

// components
import { SubCategoryFormStoreProvider } from "../stores/subCategoryFormProvider";
import { AllFieldErrorsProvider } from "../../../../contexts/AllFieldErrors";
import { FormInputField, FormSelectField } from "../../components/FormControls";
import FormSubmit from "../../components/FormSubmit";

// assets
import { lusitana } from "@/assets/fonts";
import { PencilSquareIcon, PlusCircleIcon } from "@heroicons/react/24/solid";

// types
interface SubCategoryFormProps {
  subCategory?: SubCategoryWithUser;
  categories: CategoryWithSubCategory[];
}

interface TheFormWrappedProps {
  subCategory?: SubCategoryWithUser;
  categories: CategoryWithSubCategory[];
  onResetClicked: () => void;
}

export default function SubCategoryForm({ subCategory, categories }: SubCategoryFormProps) {
  // Resetting a form with a key: you can force a subtree to reset its state by giving it a different key
  const [formResetKey, setFormResetKey] = useState("SubCategoryForm");

  return (
    <SubCategoryFormStoreProvider key={formResetKey} subCategory={subCategory}>
      <TheFormWrapped subCategory={subCategory} categories={categories} onResetClicked={() => setFormResetKey(`SubCategoryForm${Date.now()}`)} />
    </SubCategoryFormStoreProvider>
  );
}

function TheFormWrapped({ subCategory, categories, onResetClicked }: TheFormWrappedProps) {
  const categoryId = useSubCategoryFormStore((state) => state.categoryId);
  const name = useSubCategoryFormStore((state) => state.name);

  // To provide feedback to the user
  const { feedback, showFeedback } = useFormActionFeedback({
    excerpt: subCategory ? (
      <p className="text-center text-2xl">
        {subCategory.category.name} ► <b>{subCategory.name}</b>
      </p>
    ) : undefined,
    pathToAllItems: PathFinder.toAllSubCategories(),
  });

  const { useFormMethods, onSubmit, allFieldErrors, isExecuting } = useFormActionWithVal<
    typeof subCategoryFormSchema,
    readonly [subCategoryId: z.ZodString] | readonly [],
    SubCategoryFormActionResult
  >({
    safeActionFunc: subCategory ? updSubCategory2.bind(null, subCategory.id) : newSubCategory2,
    formSchema: subCategoryFormSchema,
    showFeedback,
  });

  return (
    <article className={styles["subcategory-form"]}>
      <h2 className={lusitana.className}>
        {subCategory ? (
          <>
            <PencilSquareIcon width={64} height={64} />
            Edit SubCategory
          </>
        ) : (
          <>
            <PlusCircleIcon width={64} height={64} />
            New SubCategory
          </>
        )}
      </h2>
      <FormProvider {...useFormMethods}>
        <AllFieldErrorsProvider allFieldErrors={allFieldErrors}>
          <form noValidate={true} onSubmit={onSubmit}>
            <FormSelectField fieldName={"categoryId"} fieldLabel={"parent category"} required={true} defaultValue={categoryId}>
              <option value="">Choose Parent Category</option>
              {categories.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </FormSelectField>
            <FormInputField
              fieldName={"name"}
              fieldLabel={"name"}
              size={40}
              maxLength={50}
              spellCheck={"true"}
              autoComplete={"off"}
              required={true}
              placeholder={"e.g., Sliced Deli Meats, Smoked Sausages, Fresh Fish"}
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
