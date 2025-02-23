// react
import { useCallback, useEffect, useState } from "react";

// other libraries
import type { EmblaCarouselType } from "embla-carousel";

// components
import { Button } from "@/components/ui/custom/button";

// types
interface PrevProps {
  emblaApi?: EmblaCarouselType;
}

export default function Prev({ emblaApi }: PrevProps) {
  const [isDisabled, setIsDisabled] = useState(true);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setIsDisabled(!emblaApi.canScrollPrev());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect).on("select", onSelect);

    return () => {
      emblaApi.off("reInit", onSelect).off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <Button type="button" size="icon" variant="ghost" disabled={isDisabled} onClick={() => emblaApi?.scrollPrev()}>
      <svg viewBox="0 0 532 532">
        <path
          fill="currentColor"
          d="M355.66 11.354c13.793-13.805 36.208-13.805 50.001 0 13.785 13.804 13.785 36.238 0 50.034L201.22 266l204.442 204.61c13.785 13.805 13.785 36.239 0 50.044-13.793 13.796-36.208 13.796-50.002 0a5994246.277 5994246.277 0 0 0-229.332-229.454 35.065 35.065 0 0 1-10.326-25.126c0-9.2 3.393-18.26 10.326-25.2C172.192 194.973 332.731 34.31 355.66 11.354Z"
        />
      </svg>
    </Button>
  );
}
