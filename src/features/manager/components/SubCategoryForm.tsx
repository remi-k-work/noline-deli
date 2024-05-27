"use client";

// component css styles
import styles from "./SubCategoryForm.module.css";

// react
import { useState } from "react";

// prisma and db access
import { CategoryWithSubCategory, SubCategoryWithUser } from "../dbCategories";

// server actions and mutations
import { newSubCategory, updSubCategory } from "../actionsSubCategories";

// other libraries
import { PencilSquareIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import SubCategoryFormSchema, { SubCategoryFormSchemaType, SubCategoryFormState } from "../SubCategoryFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import useFormActionWithVal from "../useFormActionWithVal";
import { FormProvider } from "react-hook-form";

// components
import { FormInputField, FormSelectField } from "./FormControls";
import FormSubmit from "./FormSubmit";
import SubCategoryFormFeedback from "./SubCategoryFormFeedback";

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
  const [parentCategoryName, setParentCategoryName] = useState("");

  const {
    isPending,
    formState: subCategoryFormState,
    formAction,
    allFieldErrors,
    showFeedback,
    setShowFeedback,
    onSubmit,
    useFormMethods,
  } = useFormActionWithVal<SubCategoryFormState, SubCategoryFormSchemaType>({
    formActionFunc: subCategory ? updSubCategory.bind(null, subCategory.id) : newSubCategory.bind(null, parentCategoryName),
    resolver: zodResolver(SubCategoryFormSchema.schema),
    formSchema: new SubCategoryFormSchema(),
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
            Edit Subcategory
          </>
        ) : (
          <>
            <PlusCircleIcon width={64} height={64} />
            New Subcategory
          </>
        )}
      </h2>
      <FormProvider {...useFormMethods}>
        {/* <form action={formAction} noValidate={true} onSubmit={useFormMethods.handleSubmit(onSubmit)}> */}
        <form action={formAction} noValidate={true} onSubmit={(ev) => onSubmit({} as SubCategoryFormSchemaType, ev)}>
          <FormSelectField
            fieldName={"categoryId"}
            fieldLabel={"parent category"}
            allFieldErrors={allFieldErrors}
            required={true}
            defaultValue={defCategoryId}
            onChange={(ev) => setParentCategoryName(ev.target.selectedOptions[0].text)}
          >
            <option value="">Choose Parent Category</option>
            {categories.map(({ id, name }) => {
              return (
                <option key={id} value={id}>
                  {name}
                </option>
              );
            })}
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
            defaultValue={defName}
          />
          <FormSubmit isPending={isPending} onSubmitCompleted={() => setShowFeedback(true)} onResetClicked={onResetClicked} />
        </form>
      </FormProvider>
      {showFeedback && <SubCategoryFormFeedback subCategory={subCategory} subCategoryFormState={subCategoryFormState} setShowFeedback={setShowFeedback} />}
    </article>
  );
}
