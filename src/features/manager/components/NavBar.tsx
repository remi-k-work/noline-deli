"use client";

// react
import { ComponentProps } from "react";

// next
import { usePathname } from "next/navigation";
import Link from "next/link";

// other libraries
import clsx from "clsx";
import PathFinder from "../PathFinder";
import { Bars4Icon } from "@heroicons/react/24/solid";

// types
interface NavLinkProps extends ComponentProps<typeof Link> {
  isActive: boolean;
  activeClass: string;
}

export default function NavBar() {
  return (
    <nav>
      <div className="hidden lg:block">
        <NavTabs />
      </div>
      <div className="lg:hidden">
        <NavMenu />
      </div>
    </nav>
  );
}

function NavLink({ isActive = false, activeClass, className, ...props }: NavLinkProps) {
  return <Link {...props} className={clsx(className, isActive && activeClass)} onClick={() => (document.activeElement as HTMLElement)?.blur()} />;
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

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-circle btn-ghost">
        <Bars4Icon width={24} height={24} />
      </div>
      <ul tabIndex={0} className="menu dropdown-content z-10 w-52 rounded-box bg-base-100 p-2 shadow">
        <li>
          <NavLink href={PathFinder.toManagerHome()} isActive={isHomeActive} activeClass={"active"}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink href={PathFinder.toAllBrands()} isActive={isBrandsActive} activeClass={"active"}>
            Brands
          </NavLink>
        </li>
        <li>
          <NavLink href={PathFinder.toAllCategories()} isActive={isCategoriesActive} activeClass={"active"}>
            Categories
          </NavLink>
        </li>
        <li>
          <NavLink href={PathFinder.toAllSubCategories()} isActive={isSubCategoriesActive} activeClass={"active"}>
            SubCategories
          </NavLink>
        </li>
        <li>
          <NavLink href={PathFinder.toAllProducts()} isActive={isProductsActive} activeClass={"active"}>
            Products
          </NavLink>
        </li>
        <li>
          <NavLink href={PathFinder.toAllCharts()} isActive={isChartsActive} activeClass={"active"}>
            Charts
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
