// next
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

// other libraries
import { cn } from "@/lib/utils";
import PathFinder from "@/lib/PathFinder";

// assets
import { lusitana } from "@/assets/fonts";

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
    <header className="hero">
      <div className="hero-overlay">
        <Image src={heroBanner} alt={sectionTitle} className="h-24 w-full rounded-t-2xl object-cover sepia" priority />
      </div>
      <div className="hero-content justify-self-start">
        <h1 className={cn(lusitana.className, "bg-background/80 p-2 text-xl text-foreground lg:text-2xl")}>
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
      </div>
    </header>
  );
}

export function SectionLink({ linkBanner, sectionTitle, sectionLink }: SectionLinkProps) {
  return (
    <Link href={sectionLink} className="hero sepia hover:sepia-0">
      <div className="hero-overlay">
        <Image src={linkBanner} alt={sectionTitle} className="h-48 w-full object-cover" />
      </div>
      <div className="hero-content">
        <span className={cn(lusitana.className, "bg-background/80 p-2 text-2xl text-foreground lg:text-3xl")}>{sectionTitle}</span>
      </div>
    </Link>
  );
}
