"use client";

// other libraries
import useMediaQuery from "@/hooks/useMediaQuery";

// components
import JumpToImageMob from "./JumpToImageMob";
import JumpToImageReg from "./JumpToImageReg";

export default function JumpToImage() {
  // Small devices (landscape phones, less than 768px)
  const isSmall = useMediaQuery("(max-width: 767.98px)");

  return isSmall ? <JumpToImageMob /> : <JumpToImageReg />;
}
