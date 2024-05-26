"use client";

// component css styles
import styles from "./BrandFormLogo.module.css";

// react
import { useDeferredValue, useEffect, useState } from "react";

// next
import Image from "next/image";

// other libraries
import PathFinder from "../PathFinder";
import { AllFieldErrors } from "../FormSchemaBase";

// components
import { FormInputField, FormOutputField } from "./FormControls";

// types
interface BrandFormLogoProps {
  logoUrl?: string;
  allFieldErrors?: AllFieldErrors;
}

export default function BrandFormLogo({ logoUrl = "", allFieldErrors }: BrandFormLogoProps) {
  const [currLogoUrl, setCurrLogoUrl] = useState(logoUrl);
  const [logoSrc, setLogoSrc] = useState(PathFinder.toBrandLogo(logoUrl));
  const defLogoSrc = useDeferredValue(logoSrc);

  // In react, props act like external instructions for a component,
  // while usestate manages its own internal memory that persists between re-renders
  useEffect(() => {
    // So, make sure the internal state is consistent with the props being passed
    setCurrLogoUrl(logoUrl);
    setLogoSrc(PathFinder.toBrandLogo(logoUrl));
  }, [logoUrl]);

  return (
    <section className={styles["brand-form-logo"]}>
      <header className={styles["brand-form-logo__logo"]}>
        <FormOutputField outputFor={"logoUrl"} fieldName={"LogoPreview"} fieldLabel={"logo preview"}>
          {defLogoSrc ? (
            <Image
              src={defLogoSrc}
              width={320}
              height={200}
              alt={"Logo Preview"}
              sizes="50vw"
              className="m-auto h-36 w-auto object-contain"
              onError={() => setLogoSrc(PathFinder.toImagePlaceholder())}
            />
          ) : (
            <div className="grid h-36 w-full place-items-center">
              <>No Logo</>
            </div>
          )}
        </FormOutputField>
      </header>
      <footer className={styles["brand-form-logo__url"]}>
        <FormInputField
          fieldType={"url"}
          fieldName={"logoUrl"}
          fieldLabel={"logo url"}
          allFieldErrors={allFieldErrors}
          size={40}
          maxLength={256}
          spellCheck={"false"}
          autoComplete={"off"}
          required={true}
          value={currLogoUrl}
          onChange={(ev) => {
            setCurrLogoUrl(ev.target.value);
            setLogoSrc(PathFinder.toBrandLogo(ev.target.value));
          }}
        />
      </footer>
    </section>
  );
}
