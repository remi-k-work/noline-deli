// react
import { useCallback, useEffect, useState } from "react";

// other libraries
import type { EmblaCarouselType } from "embla-carousel";

// components
import { Button } from "@/components/ui/custom/button";

// assets
import { ViewfinderCircleIcon as ViewfinderCircleIconS } from "@heroicons/react/24/solid";
import { ViewfinderCircleIcon as ViewfinderCircleIconO } from "@heroicons/react/24/outline";

// types
interface DotProps {
  emblaApi?: EmblaCarouselType;
  index: number;
}

export default function Dot({ emblaApi, index }: DotProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
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
    <Button type="button" size="icon" variant="ghost" onClick={() => emblaApi?.scrollTo(index)}>
      {index === selectedIndex ? <ViewfinderCircleIconS width={36} height={36} /> : <ViewfinderCircleIconO width={36} height={36} />}
    </Button>
  );
}
