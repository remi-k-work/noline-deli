"use client";

// component css styles
import styles from "./Logo.module.css";

// react
import { useDeferredValue } from "react";

// next
import Image from "next/image";

// other libraries
import { useBrandFormStore } from "../../stores/brandFormProvider";

// components
import { FormInputField, FormOutputField } from "../../../components/FormControls";

export default function Logo() {
  const logoUrl = useBrandFormStore((state) => state.logoUrl);
  const logoSrc = useBrandFormStore((state) => state.logoSrc);
  const logoChanged = useBrandFormStore((state) => state.logoChanged);
  const previewFailed = useBrandFormStore((state) => state.previewFailed);

  const defLogoSrc = useDeferredValue(logoSrc);

  return (
    <section className={styles["logo"]}>
      <header className={styles["logo__logo"]}>
        <FormOutputField outputFor={"logoUrl"} fieldName={"LogoPreview"} fieldLabel={"logo preview"}>
          {defLogoSrc ? (
            <Image
              src={defLogoSrc}
              width={320}
              height={200}
              alt={"Logo Preview"}
              sizes="50vw"
              className="m-auto h-36 w-auto object-contain"
              onError={previewFailed}
            />
          ) : (
            <div className="grid h-36 w-full place-items-center">
              <>No Logo</>
            </div>
          )}
        </FormOutputField>
      </header>
      <footer className={styles["logo__url"]}>
        <FormInputField
          fieldType={"url"}
          fieldName={"logoUrl"}
          fieldLabel={"logo url"}
          size={40}
          maxLength={256}
          spellCheck={"false"}
          autoComplete={"off"}
          required={true}
          placeholder={"e.g., https://images.unsplash.com/example-photo"}
          value={logoUrl}
          onChange={(ev) => logoChanged(ev.target.value)}
        />
        <small className="text-muted-foreground">
          * please use image addresses from&nbsp;
          <a href="https://unsplash.com/" target="_blank" className="link">
            unsplash.com
          </a>
        </small>
      </footer>
    </section>
  );
}
