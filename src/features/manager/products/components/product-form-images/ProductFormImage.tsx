"use client";

// component css styles
import styles from "./ProductFormImage.module.css";

// react
import { forwardRef, useDeferredValue, useEffect, useState } from "react";

// next
import Image from "next/image";

// other libraries
import { cn } from "@/lib/utils";
import PathFinder from "../../../PathFinder";
import { TrashIcon } from "@heroicons/react/24/solid";
import { AllFieldErrors } from "../../../formActionTypes";

// components
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { FormInputField, FormOutputField } from "../../../components/FormControls";

// types
interface ProductFormImageProps {
  fieldName: string;
  fieldLabel: string;
  imageUrl?: string;
  onRemoveImageClicked?: () => void;
  allFieldErrors?: AllFieldErrors;
  className?: string;
}

const ProductFormImage = forwardRef<HTMLElement, ProductFormImageProps>(
  ({ fieldName, fieldLabel, imageUrl = "", onRemoveImageClicked, allFieldErrors, className, ...props }: ProductFormImageProps, ref) => {
    const [currImageUrl, setCurrImageUrl] = useState(imageUrl);
    const [imageSrc, setImageSrc] = useState(PathFinder.toProductImage(imageUrl));
    const defImageSrc = useDeferredValue(imageSrc);

    // In react, props act like external instructions for a component,
    // while usestate manages its own internal memory that persists between re-renders
    useEffect(() => {
      // So, make sure the internal state is consistent with the props being passed
      setCurrImageUrl(imageUrl);
      setImageSrc(PathFinder.toProductImage(imageUrl));
    }, [imageUrl]);

    return (
      <section ref={ref} className={cn(styles["product-form-image"], className)} {...props}>
        <header className={styles["product-form-image__image"]}>
          <FormOutputField outputFor={fieldName} fieldName={`${fieldName}Preview`} fieldLabel={`${fieldLabel} preview`}>
            {defImageSrc ? (
              <Image
                src={defImageSrc}
                width={320}
                height={200}
                alt={"Product Image"}
                sizes="50vw"
                className="m-auto h-36 w-auto object-contain"
                onError={() => setImageSrc(PathFinder.toImagePlaceholder())}
              />
            ) : (
              <div className="grid h-36 w-full place-items-center">
                <>No Image</>
              </div>
            )}
          </FormOutputField>
        </header>
        <Tooltip>
          <TooltipTrigger
            type="button"
            className={cn(styles["product-form-image__toolbar"], "btn btn-circle")}
            disabled={!onRemoveImageClicked}
            onClick={() => onRemoveImageClicked?.()}
          >
            <TrashIcon width={24} height={24} />
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Remove this image</p>
          </TooltipContent>
        </Tooltip>
        <footer className={styles["product-form-image__url"]}>
          <FormInputField
            fieldType={"url"}
            fieldName={fieldName}
            fieldLabel={`${fieldLabel} url`}
            allFieldErrors={allFieldErrors}
            size={40}
            maxLength={256}
            spellCheck={"false"}
            autoComplete={"off"}
            required={true}
            placeholder={"e.g., https://images.unsplash.com/example-photo"}
            value={currImageUrl}
            onChange={(ev) => {
              setCurrImageUrl(ev.target.value);
              setImageSrc(PathFinder.toProductImage(ev.target.value));
            }}
          />
          <small className="text-info-content">
            * please use image addresses from&nbsp;
            <a className="link-hover link" href="https://unsplash.com/" target="_blank">
              unsplash.com
            </a>
          </small>
        </footer>
      </section>
    );
  },
);
ProductFormImage.displayName = "ProductFormImage";

export default ProductFormImage;
