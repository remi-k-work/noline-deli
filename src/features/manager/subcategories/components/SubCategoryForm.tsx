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
import { PencilSquareIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import useFormActionWithVal from "../../useFormActionWithVal";
import { FormProvider } from "react-hook-form";
import { subCategoryFormSchema } from "../schemas/subCategoryForm";
import { SubCategoryFormActionResult } from "../schemas/types";
import PathFinder from "../../PathFinder";
import useFormActionFeedback from "../../useFormActionFeedback";

// components
import { FormInputField, FormSelectField } from "../../components/FormControls";
import FormSubmit from "../../components/FormSubmit";

// assets
import { lusitana } from "@/assets/fonts";

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
    <TheFormWrapped
      key={formResetKey}
      subCategory={subCategory}
      categories={categories}
      onResetClicked={() => setFormResetKey(`SubCategoryForm${Date.now()}`)}
    />
  );
}

function TheFormWrapped({ subCategory, categories, onResetClicked }: TheFormWrappedProps) {
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

  // Default values for the form
  let defCategoryId: string | undefined;
  let defName: string | undefined;

  // Are we in editing mode?
  if (subCategory) {
    // Yes, set all of the form's default values to match those from the edited subcategory
    const {
      category: { id },
      name,
    } = subCategory;

    defCategoryId = id;
    defName = name;
  }

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
        <form noValidate={true} onSubmit={useFormMethods.handleSubmit(onSubmit)}>
          <FormSelectField fieldName={"categoryId"} fieldLabel={"parent category"} allFieldErrors={allFieldErrors} required={true} defaultValue={defCategoryId}>
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
            allFieldErrors={allFieldErrors}
            size={40}
            maxLength={50}
            spellCheck={"true"}
            autoComplete={"off"}
            required={true}
            placeholder={"e.g., Sliced Deli Meats, Smoked Sausages, Fresh Fish"}
            defaultValue={defName}
          />
          <FormSubmit isExecuting={isExecuting} onResetClicked={onResetClicked} />
        </form>
      </FormProvider>
      {feedback}
    </article>
  );
}
