"use client";

// component css styles
import styles from "./ProductFormImage.module.css";

// react
import { forwardRef, useDeferredValue, useEffect, useState } from "react";

// next
import Image from "next/image";

// other libraries
import PathFinder from "../PathFinder";
import { TrashIcon } from "@heroicons/react/24/solid";

// components
import { FormInputField, FormOutputField } from "./FormControls";

// types
interface ProductFormImageProps {
  fieldName: string;
  fieldLabel: string;
  imageUrl?: string;
  onRemoveImageClicked?: () => void;
}

// eslint-disable-next-line react/display-name
const ProductFormImage = forwardRef<HTMLElement, ProductFormImageProps>(
  ({ fieldName, fieldLabel, imageUrl = "", onRemoveImageClicked }: ProductFormImageProps, ref) => {
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
      <section ref={ref} className={styles["product-form-image"]}>
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
        <div className={styles["product-form-image__toolbar"]}>
          <button type="button" className="btn btn-circle" disabled={!onRemoveImageClicked} onClick={() => onRemoveImageClicked && onRemoveImageClicked()}>
            <div className="lg:tooltip lg:tooltip-left" data-tip="Remove this image">
              <TrashIcon width={24} height={24} />
            </div>
          </button>
        </div>
        <footer className={styles["product-image__url"]}>
          <FormInputField
            fieldType={"url"}
            fieldName={fieldName}
            fieldLabel={`${fieldLabel} url`}
            fieldErrors={[]}
            size={40}
            maxLength={256}
            spellCheck={"false"}
            autoComplete={"off"}
            required={true}
            value={currImageUrl}
            onChange={(ev) => {
              setCurrImageUrl(ev.target.value);
              setImageSrc(PathFinder.toProductImage(ev.target.value));
            }}
          />
        </footer>
      </section>
    );
  },
);

export default ProductFormImage;
