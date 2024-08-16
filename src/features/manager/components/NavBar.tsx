"use client";

// react
import { ComponentProps, Dispatch, SetStateAction, useState } from "react";

// next
import { usePathname } from "next/navigation";
import Link from "next/link";

// other libraries
import { cn } from "@/lib/utils";
import PathFinder from "../PathFinder";
import useMediaQuery from "@/lib/hooks/useMediaQuery";

// components
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// assets
import { Bars4Icon } from "@heroicons/react/24/solid";

// types
interface NavLinkProps extends ComponentProps<typeof Link> {
  isActive: boolean;
  activeClass: string;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

export default function NavBar() {
  // Small devices (landscape phones, less than 768px)
  const isSmall = useMediaQuery("(max-width: 767.98px)");

  return <nav>{isSmall ? <NavMenu /> : <NavTabs />}</nav>;
}

function NavLink({ isActive = false, activeClass, setOpen, className, ...props }: NavLinkProps) {
  return <Link {...props} className={cn(className, isActive && activeClass, setOpen && "block w-full")} onClick={() => setOpen?.(false)} />;
}

function NavTabs() {
  const pathname = usePathname();

  const isHomeActive = pathname === PathFinder.toManagerHome();
  const isBrandsActive = pathname.includes(PathFinder.toAllBrands());
  const isCategoriesActive = pathname.includes(PathFinder.toAllCategories());
  const isSubCategoriesActive = pathname.includes(PathFinder.toAllSubCategories());
  const isProductsActive = pathname.includes(PathFinder.toAllProducts());
  const isChartsActive = pathname.includes(PathFinder.toAllCharts());

  return (
    <div role="tablist" className="tabs tabs-lifted">
      <NavLink href={PathFinder.toManagerHome()} role="tab" className="tab" isActive={isHomeActive} activeClass={"tab-active"}>
        Home
      </NavLink>
      <NavLink href={PathFinder.toAllBrands()} role="tab" className="tab" isActive={isBrandsActive} activeClass={"tab-active"}>
        Brands
      </NavLink>
      <NavLink href={PathFinder.toAllCategories()} role="tab" className="tab" isActive={isCategoriesActive} activeClass={"tab-active"}>
        Categories
      </NavLink>
      <NavLink href={PathFinder.toAllSubCategories()} role="tab" className="tab" isActive={isSubCategoriesActive} activeClass={"tab-active"}>
        SubCategories
      </NavLink>
      <NavLink href={PathFinder.toAllProducts()} role="tab" className="tab" isActive={isProductsActive} activeClass={"tab-active"}>
        Products
      </NavLink>
      <NavLink href={PathFinder.toAllCharts()} role="tab" className="tab" isActive={isChartsActive} activeClass={"tab-active"}>
        Charts
      </NavLink>
    </div>
  );
}

function NavMenu() {
  const pathname = usePathname();

  const isHomeActive = pathname === PathFinder.toManagerHome();
  const isBrandsActive = pathname.includes(PathFinder.toAllBrands());
  const isCategoriesActive = pathname.includes(PathFinder.toAllCategories());
  const isSubCategoriesActive = pathname.includes(PathFinder.toAllSubCategories());
  const isProductsActive = pathname.includes(PathFinder.toAllProducts());
  const isChartsActive = pathname.includes(PathFinder.toAllCharts());

  // The controlled open state of the drop-down menu
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className="btn btn-circle btn-ghost" title="Menu">
        <Bars4Icon width={24} height={24} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <NavLink href={PathFinder.toManagerHome()} isActive={isHomeActive} activeClass={"font-bold"} setOpen={setOpen}>
            Home
          </NavLink>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <NavLink href={PathFinder.toAllBrands()} isActive={isBrandsActive} activeClass={"font-bold"} setOpen={setOpen}>
            Brands
          </NavLink>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <NavLink href={PathFinder.toAllCategories()} isActive={isCategoriesActive} activeClass={"font-bold"} setOpen={setOpen}>
            Categories
          </NavLink>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <NavLink href={PathFinder.toAllSubCategories()} isActive={isSubCategoriesActive} activeClass={"font-bold"} setOpen={setOpen}>
            SubCategories
          </NavLink>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <NavLink href={PathFinder.toAllProducts()} isActive={isProductsActive} activeClass={"font-bold"} setOpen={setOpen}>
            Products
          </NavLink>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <NavLink href={PathFinder.toAllCharts()} isActive={isChartsActive} activeClass={"font-bold"} setOpen={setOpen}>
            Charts
          </NavLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
