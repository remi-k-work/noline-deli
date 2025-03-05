"use client";

// next
import Image, { type StaticImageData } from "next/image";

// other libraries
import PathFinder from "@/lib/PathFinder";
import useMediaQuery from "@/hooks/useMediaQuery";

// components
import NavigationMenu, {
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/custom/navigation-menu";
import Hero, { HeroContent, HeroOverlay } from "@/components/ui/custom/hero";

// assets
import { BanknotesIcon, HomeIcon, SwatchIcon } from "@heroicons/react/24/solid";
import bannerBrands from "@/assets/manager/banner-brands.webp";
import bannerCategories from "@/assets/manager/banner-categories.webp";
import bannerSubCategories from "@/assets/manager/banner-subcategories.webp";
import bannerProducts from "@/assets/manager/banner-products.webp";
import bannerCharts from "@/assets/manager/banner-charts.webp";
import bannerOrders from "@/assets/manager/banner-orders.webp";

// types
interface SectionLinkProps {
  linkBanner: StaticImageData;
  sectionTitle: string;
  sectionLink: string;
}

export default function NavBar() {
  // Large screens
  const isLarge = useMediaQuery("(min-width: 1024px)");

  return (
    <NavigationMenu className="flex-1">
      <NavigationMenuList>
        <NavigationMenuItem>
          {isLarge ? (
            <NavigationMenuLink href={PathFinder.toManagerHome()} className="flex items-center gap-1 uppercase">
              <HomeIcon width={36} height={36} className="flex-none" />
              <span className="flex-1">Home</span>
            </NavigationMenuLink>
          ) : (
            <NavigationMenuLink href={PathFinder.toManagerHome()}>
              <HomeIcon width={36} height={36} title="Home" />
            </NavigationMenuLink>
          )}
        </NavigationMenuItem>
        <NavigationMenuItem>
          {isLarge ? (
            <NavigationMenuTrigger type="button" className="flex items-center gap-1 uppercase">
              <SwatchIcon width={36} height={36} className="flex-none" />
              <span className="flex-1">Merchandise</span>
            </NavigationMenuTrigger>
          ) : (
            <NavigationMenuTrigger type="button">
              <SwatchIcon width={36} height={36} title="Merchandise" />
            </NavigationMenuTrigger>
          )}
          <NavigationMenuContent>
            <div className="grid gap-2 p-4 md:w-96">
              <SectionLink linkBanner={bannerBrands} sectionTitle={"Brands"} sectionLink={PathFinder.toAllBrands()} />
              <SectionLink linkBanner={bannerCategories} sectionTitle={"Categories"} sectionLink={PathFinder.toAllCategories()} />
              <SectionLink linkBanner={bannerSubCategories} sectionTitle={"SubCategories"} sectionLink={PathFinder.toAllSubCategories()} />
              <SectionLink linkBanner={bannerProducts} sectionTitle={"Products"} sectionLink={PathFinder.toAllProducts()} />
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          {isLarge ? (
            <NavigationMenuTrigger type="button" className="flex items-center gap-1 uppercase">
              <BanknotesIcon width={36} height={36} className="flex-none" />
              <span className="flex-1">Business</span>
            </NavigationMenuTrigger>
          ) : (
            <NavigationMenuTrigger type="button">
              <BanknotesIcon width={36} height={36} title="Business" />
            </NavigationMenuTrigger>
          )}
          <NavigationMenuContent>
            <div className="grid gap-2 p-4 md:w-96">
              <SectionLink linkBanner={bannerCharts} sectionTitle={"Charts"} sectionLink={PathFinder.toAllCharts()} />
              <SectionLink linkBanner={bannerOrders} sectionTitle={"Orders"} sectionLink={PathFinder.toAllOrders()} />
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuIndicator />
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function SectionLink({ linkBanner, sectionTitle, sectionLink }: SectionLinkProps) {
  return (
    <NavigationMenuLink href={sectionLink} className="sepia hover:sepia-0">
      <Hero>
        <HeroContent>
          <p className="text-center">{sectionTitle}</p>
        </HeroContent>
        <HeroOverlay>
          <Image src={linkBanner} alt={sectionTitle} className="h-16" />
        </HeroOverlay>
      </Hero>
    </NavigationMenuLink>
  );
}
