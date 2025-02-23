"use client";

// component css styles
import styles from "./index.module.css";

// next
import Image from "next/image";

// other libraries
import useEmblaCarousel from "embla-carousel-react";
import PathFinder from "@/lib/PathFinder";

// components
import Prev from "./buttons/Prev";
import Next from "./buttons/Next";
import Dot from "./buttons/Dot";

// types
interface ImageSliderProps {
  productName: string;
  moreImages: { imageUrl: string }[];
}

export default function ImageSlider({ productName, moreImages = [] }: ImageSliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel();

  return (
    <article className={styles["image-slider"]}>
      <section ref={emblaRef}>
        <div>
          {moreImages.map(({ imageUrl }, index) => (
            <div key={index}>
              <Image src={PathFinder.toResolvedProductImage(imageUrl)} width={640} height={400} alt={productName} sizes="100vw" />
            </div>
          ))}
        </div>
      </section>
      <header>
        <Prev emblaApi={emblaApi} />
        <Next emblaApi={emblaApi} />
      </header>
      <footer>{emblaApi?.scrollSnapList().map((_, index) => <Dot key={index} emblaApi={emblaApi} index={index} />)}</footer>
    </article>
  );
}
