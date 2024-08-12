"use client";

// component css styles
import styles from "./Captcha.module.css";

// react
import { useEffect, useState } from "react";

// next
import Image from "next/image";

// other libraries
import PathFinder from "@/features/manager/PathFinder";
import { CAPTCHA_HEIGHT, CAPTCHA_WIDTH } from "@/features/auth/components/CaptchaBackground";

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
      <button type="button" className="btn btn-secondary" onClick={() => setCaptchaSrc(PathFinder.toCaptcha(captchaName, true))}>
        <ArrowPathIcon width={24} height={24} />
      </button>
    </article>
  );
}
