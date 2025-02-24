"use client";

// component css styles
import styles from "./Captcha.module.css";

// react
import { useEffect, useState } from "react";

// next
import Image from "next/image";

// other libraries
import PathFinder from "@/lib/PathFinder";
import { CAPTCHA_HEIGHT, CAPTCHA_WIDTH } from "@/features/auth/components/CaptchaBackground";

// components
import { Button } from "@/components/ui/custom/button";

// assets
import { ArrowPathIcon } from "@heroicons/react/24/solid";

// types
interface CaptchaProps {
  captchaName: string;
}

export default function Captcha({ captchaName }: CaptchaProps) {
  const [captchaSrc, setCaptchaSrc] = useState(PathFinder.toCaptcha(captchaName));

  useEffect(() => {
    // Always reload the captcha to ensure that the browser does not display the cached version
    setCaptchaSrc(PathFinder.toCaptcha(captchaName, true));
  }, [captchaName]);

  return (
    <article className={styles["captcha"]}>
      <Image src={captchaSrc} overrideSrc={captchaSrc} width={CAPTCHA_WIDTH} height={CAPTCHA_HEIGHT} alt={captchaName} unoptimized />
      <Button type="button" size="icon" variant="secondary" onClick={() => setCaptchaSrc(PathFinder.toCaptcha(captchaName, true))}>
        <ArrowPathIcon width={36} height={36} />
      </Button>
    </article>
  );
}
