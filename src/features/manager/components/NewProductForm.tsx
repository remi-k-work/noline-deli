// component css styles
import styles from "./NewProductForm.module.css";

// prisma and db access
import { getProductFormData } from "@/features/manager/managerDb";

// other libraries
import { HandThumbUpIcon, PencilSquareIcon, TruckIcon } from "@heroicons/react/24/solid";

// components
import { FormTextArea, FormInputField, FormCheckField } from "./FormControls";
import { BrandAndLogo, CategoryAndSubCategory, PriceInCents } from "./ProductFormControls";

// assets
import { lusitana } from "@/assets/fonts";

export default async function NewProductForm() {
  // Gather the necessary data for the product form, such as a list of all available brands and categories
  const { brands, categories } = await getProductFormData();

  return (
    <article className={styles["new-product-form"]}>
      <h2 className={lusitana.className}>
        <PencilSquareIcon width={64} height={64} />
        New Product
      </h2>
      <form>
        <FormInputField
          fieldName={"name"}
          fieldLabel={"name"}
          fieldErrors={[]}
          size={40}
          maxLength={50}
          spellCheck={"true"}
          autoComplete={"off"}
          defaultValue={""}
        />
        <FormTextArea
          fieldName={"description"}
          fieldLabel={"description"}
          fieldErrors={[]}
          cols={50}
          rows={6}
          spellCheck={"true"}
          autoComplete={"off"}
          defaultValue={""}
        />
        <FormInputField
          fieldType={"url"}
          fieldName={"imageUrl"}
          fieldLabel={"image url"}
          fieldErrors={[]}
          size={40}
          maxLength={50}
          spellCheck={"false"}
          autoComplete={"off"}
          defaultValue={""}
        />
        <PriceInCents />
        <CategoryAndSubCategory categories={categories} />
        <BrandAndLogo brands={brands} />
        <FormCheckField fieldName={"freeShipping"} fieldErrors={[]} defaultChecked={false}>
          <TruckIcon width={24} height={24} />
          Free Shipping
        </FormCheckField>
      </form>
    </article>
  );
}
