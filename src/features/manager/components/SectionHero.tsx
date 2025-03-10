// next
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

// other libraries
import { cn } from "@/lib/utils";
import PathFinder from "@/lib/PathFinder";

// components
import Hero, { HeroContent, HeroOverlay } from "@/components/ui/custom/hero";

// types
interface SectionHeroProps {
  heroBanner: StaticImageData;
  sectionTitle: string;
  sectionLink?: string;
}

interface SectionLinkProps {
  linkBanner: StaticImageData;
  sectionTitle: string;
  sectionLink: string;
}

export default function SectionHero({ heroBanner, sectionTitle, sectionLink }: SectionHeroProps) {
  return (
    <Hero className="mb-4">
      <HeroContent className="font-lusitana justify-self-start">
        <h1 className="text-xl lg:text-2xl">
          <Link href={PathFinder.toManagerHome()} className="link">
            Manager
          </Link>
          &nbsp;►&nbsp;
          {sectionLink ? (
            <Link href={sectionLink} className="link">
              {sectionTitle}
            </Link>
          ) : (
            <>{sectionTitle}</>
          )}
        </h1>
      </HeroContent>
      <HeroOverlay>
        <Image src={heroBanner} alt={sectionTitle} className="h-24" priority />
      </HeroOverlay>
    </Hero>
  );
}

export function SectionLink({ linkBanner, sectionTitle, sectionLink }: SectionLinkProps) {
  return (
    <Link href={sectionLink} className="sepia hover:sepia-0">
      <Hero>
        <HeroContent className="font-lusitana">
          <p className="text-center text-2xl lg:text-3xl">{sectionTitle}</p>
        </HeroContent>
        <HeroOverlay>
          <Image src={linkBanner} alt={sectionTitle} className="h-48" />
        </HeroOverlay>
      </Hero>
    </Link>
  );
}
