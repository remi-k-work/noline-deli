"use client";

// component css styles
import styles from "./ImageView.module.css";

// react
import { forwardRef, useDeferredValue, useEffect, useState } from "react";

// next
import Image from "next/image";

// other libraries
import { cn } from "@/lib/utils";
import PathFinder from "../../../../../lib/PathFinder";

// components
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { FormInputField, FormOutputField } from "../../../components/FormControls";

// assets
import { TrashIcon } from "@heroicons/react/24/solid";

// types
interface ImageViewProps {
  fieldName: string;
  fieldLabel: string;
  imageUrl?: string;
  onRemoveImageClicked?: () => void;
  className?: string;
}

const ImageView = forwardRef<HTMLElement, ImageViewProps>(
  ({ fieldName, fieldLabel, imageUrl = "", onRemoveImageClicked, className, ...props }: ImageViewProps, ref) => {
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
      <section ref={ref} className={cn(styles["image-view"], className)} {...props}>
        <header className={styles["image-view__image"]}>
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
            className={cn(styles["image-view__toolbar"], "btn btn-circle")}
            disabled={!onRemoveImageClicked}
            onClick={() => onRemoveImageClicked?.()}
          >
            <TrashIcon width={24} height={24} />
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Remove this image</p>
          </TooltipContent>
        </Tooltip>
        <footer className={styles["image-view__url"]}>
          <FormInputField
            fieldType={"url"}
            fieldName={fieldName}
            fieldLabel={`${fieldLabel} url`}
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
ImageView.displayName = "ImageView";

export default ImageView;
