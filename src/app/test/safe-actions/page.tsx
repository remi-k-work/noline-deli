"use client";

import { testAction } from "./testAction";
import { useAction } from "next-safe-action/hooks";
import { delProduct2, updProduct2, newProduct2 } from "@/features/manager/products/actions";
import { delBrand2, updBrand2, newBrand2 } from "@/features/manager/brands/actions";
import { delCategory2, updCategory2, newCategory2 } from "@/features/manager/categories/actions";
import { delSubCategory2, updSubCategory2, newSubCategory2 } from "@/features/manager/subcategories/actions";

export default function Page() {
  const formDataPr = new FormData();
  formDataPr.append("name", "Test");
  formDataPr.append("description", "A liquid shaving experience that delivers a comfortable shave for visibly healthier-looking skin. | 6.8 FL. OZ. | 200ml.");
  formDataPr.append("theMainImage", "/165d55532d154e418836d5809bc6b093-screen.webp");
  formDataPr.append("extraImages.0", "/zzz");
  formDataPr.append("extraImages.1", "/zzz");
  formDataPr.append("price", "8888");
  formDataPr.append("categoryId", "65f5ea087090e0e6b65e6ff4");
  // formDataPr.append("categoryId", "*");
  formDataPr.append("subCategoryId", "*");
  formDataPr.append("brandId", "65f5e95f7090e0e6b65e6fec");
  // formDataPr.append("brandId", "*");
  formDataPr.append("freeShipping", "");
  formDataPr.append("hasSubCategories", "");

  const formDataBr = new FormData();
  formDataBr.append("name", "Test Name2");
  formDataBr.append("logoUrl", "/nivea.jpeg");

  const formDataCa = new FormData();
  formDataCa.append("name", "Test Name2");

  const formDataSu = new FormData();
  formDataSu.append("categoryId", "65f5ea087090e0e6b65e6ff4");
  formDataSu.append("name", "Test Name2");

  const { execute, isExecuting } = useAction(testAction.bind(null, "d3a96f0f-e509-4f2f-b7d0-cdf50f0dc772", 19), {
    onSuccess: ({ data }) => {
      // Execution is successful
      console.log(data);
    },
    onError: ({ error: { bindArgsValidationErrors, validationErrors, serverError } }) => {
      // Bind arguments inputs do not pass validation
      if (bindArgsValidationErrors) {
        console.log(bindArgsValidationErrors);
      }

      // Input data doesn't pass validation
      if (validationErrors) {
        console.log("allFieldErrors => ", validationErrors);
      }

      // An error occurs during the action's server code execution
      if (serverError) {
        console.log(serverError);
      }
    },
  });

  const { execute: exDelPr, isExecuting: isExDelPr } = useAction(delProduct2, {
    onSuccess: ({ data }) => {
      // We are dealing with either "denied" or "succeeded" action
      console.log(data);
    },
    onError: () => {
      // Any error is considered a "failed" action
      console.log("failed");
    },
  });

  const { execute: exDelBr, isExecuting: isExDelBr } = useAction(delBrand2, {
    onSuccess: ({ data }) => {
      // We are dealing with either "denied" or "succeeded" action
      console.log(data);
    },
    onError: () => {
      // Any error is considered a "failed" action
      console.log("failed");
    },
  });

  const { execute: exDelCa, isExecuting: isExDelCa } = useAction(delCategory2, {
    onSuccess: ({ data }) => {
      // We are dealing with either "denied" or "succeeded" action
      console.log(data);
    },
    onError: () => {
      // Any error is considered a "failed" action
      console.log("failed");
    },
  });

  const { execute: exDelSu, isExecuting: isExDelSu } = useAction(delSubCategory2, {
    onSuccess: ({ data }) => {
      // We are dealing with either "denied" or "succeeded" action
      console.log(data);
    },
    onError: () => {
      // Any error is considered a "failed" action
      console.log("failed");
    },
  });

  const { execute: exUpdPr, isExecuting: isExUpdPr } = useAction(updProduct2.bind(null, "66a3e04939fda3e83657209a", new Date("1995-12-17T03:24:00")), {
    onSuccess: ({ data }) => {
      // We are dealing with either "denied" or "succeeded" action
      console.log(data);
    },
    onError: ({ error: { validationErrors } }) => {
      // Input data fails validation
      if (validationErrors) {
        // We are dealing with an "invalid" action
        console.log("allFieldErrors => ", validationErrors);
      } else {
        // Any other error is considered a "failed" action
        console.log("failed");
      }
    },
  });

  const { execute: exUpdBr, isExecuting: isExUpdBr } = useAction(updBrand2.bind(null, "6687bdee97dd11f1d52b872b"), {
    onSuccess: ({ data }) => {
      // We are dealing with either "denied" or "succeeded" action
      console.log(data);
    },
    onError: ({ error: { validationErrors } }) => {
      // Input data fails validation
      if (validationErrors) {
        // We are dealing with an "invalid" action
        console.log("allFieldErrors => ", validationErrors);
      } else {
        // Any other error is considered a "failed" action
        console.log("failed");
      }
    },
  });

  const { execute: exUpdCa, isExecuting: isExUpdCa } = useAction(updCategory2.bind(null, "66a5319f20de3da1cbf8b71c"), {
    onSuccess: ({ data }) => {
      // We are dealing with either "denied" or "succeeded" action
      console.log(data);
    },
    onError: ({ error: { validationErrors } }) => {
      // Input data fails validation
      if (validationErrors) {
        // We are dealing with an "invalid" action
        console.log("allFieldErrors => ", validationErrors);
      } else {
        // Any other error is considered a "failed" action
        console.log("failed");
      }
    },
  });

  const { execute: exUpdSu, isExecuting: isExUpdSu } = useAction(updSubCategory2.bind(null, "66a5328220de3da1cbf8b71f"), {
    onSuccess: ({ data }) => {
      // We are dealing with either "denied" or "succeeded" action
      console.log(data);
    },
    onError: ({ error: { validationErrors } }) => {
      // Input data fails validation
      if (validationErrors) {
        // We are dealing with an "invalid" action
        console.log("allFieldErrors => ", validationErrors);
      } else {
        // Any other error is considered a "failed" action
        console.log("failed");
      }
    },
  });

  const { execute: exNewPr, isExecuting: isExNewPr } = useAction(newProduct2, {
    onSuccess: ({ data }) => {
      // We are dealing with either "denied" or "succeeded" action
      console.log(data);
    },
    onError: ({ error: { validationErrors } }) => {
      // Input data fails validation
      if (validationErrors) {
        // We are dealing with an "invalid" action
        console.log("allFieldErrors => ", validationErrors);
      } else {
        // Any other error is considered a "failed" action
        console.log("failed");
      }
    },
  });

  const { execute: exNewBr, isExecuting: isExNewBr } = useAction(newBrand2, {
    onSuccess: ({ data }) => {
      // We are dealing with either "denied" or "succeeded" action
      console.log(data);
    },
    onError: ({ error: { validationErrors } }) => {
      // Input data fails validation
      if (validationErrors) {
        // We are dealing with an "invalid" action
        console.log("allFieldErrors => ", validationErrors);
      } else {
        // Any other error is considered a "failed" action
        console.log("failed");
      }
    },
  });

  const { execute: exNewCa, isExecuting: isExNewCa } = useAction(newCategory2, {
    onSuccess: ({ data }) => {
      // We are dealing with either "denied" or "succeeded" action
      console.log(data);
    },
    onError: ({ error: { validationErrors } }) => {
      // Input data fails validation
      if (validationErrors) {
        // We are dealing with an "invalid" action
        console.log("allFieldErrors => ", validationErrors);
      } else {
        // Any other error is considered a "failed" action
        console.log("failed");
      }
    },
  });

  const { execute: exNewSu, isExecuting: isExNewSu } = useAction(newSubCategory2, {
    onSuccess: ({ data }) => {
      // We are dealing with either "denied" or "succeeded" action
      console.log(data);
    },
    onError: ({ error: { validationErrors } }) => {
      // Input data fails validation
      if (validationErrors) {
        // We are dealing with an "invalid" action
        console.log("allFieldErrors => ", validationErrors);
      } else {
        // Any other error is considered a "failed" action
        console.log("failed");
      }
    },
  });

  return (
    <>
      <br />
      <button type="button" disabled={isExecuting} onClick={() => execute(formDataPr)}>
        Test Action
      </button>
      <br />
      <br />
      <button type="button" disabled={isExDelPr} onClick={() => exDelPr({ productId: "66a3e02439fda3e836572095" })}>
        Delete Product
      </button>
      <br />
      <br />
      <button type="button" disabled={isExDelBr} onClick={() => exDelBr({ brandId: "66a4c2aa0bfee2230613c978" })}>
        Delete Brand
      </button>
      <br />
      <br />
      <button type="button" disabled={isExDelCa} onClick={() => exDelCa({ categoryId: "6687c5ae97dd11f1d52b8732" })}>
        Delete Category
      </button>
      <br />
      <br />
      <button type="button" disabled={isExDelSu} onClick={() => exDelSu({ subCategoryId: "6687c50297dd11f1d52b8730" })}>
        Delete SubCategory
      </button>
      <br />
      <br />
      <br />
      <br />
      <button type="button" disabled={isExUpdPr} onClick={() => exUpdPr(formDataPr)}>
        Update Product
      </button>
      <br />
      <br />
      <button type="button" disabled={isExUpdBr} onClick={() => exUpdBr(formDataBr)}>
        Update Brand
      </button>
      <br />
      <br />
      <button type="button" disabled={isExUpdCa} onClick={() => exUpdCa(formDataCa)}>
        Update Category
      </button>
      <br />
      <br />
      <button type="button" disabled={isExUpdSu} onClick={() => exUpdSu(formDataSu)}>
        Update SubCategory
      </button>
      <br />
      <br />
      <br />
      <br />
      <button type="button" disabled={isExNewPr} onClick={() => exNewPr(formDataPr)}>
        New Product
      </button>
      <br />
      <br />
      <button type="button" disabled={isExNewBr} onClick={() => exNewBr(formDataBr)}>
        New Brand
      </button>
      <br />
      <br />
      <button type="button" disabled={isExNewCa} onClick={() => exNewCa(formDataCa)}>
        New Category
      </button>
      <br />
      <br />
      <button type="button" disabled={isExNewSu} onClick={() => exNewSu(formDataSu)}>
        New SubCategory
      </button>
    </>
  );
}
