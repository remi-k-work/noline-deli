// react
import { useTransition, type Dispatch, type SetStateAction } from "react";

// other libraries
import useSearchParamsState from "@/hooks/useSearchParamsState";

// components
import { Button } from "@/components/ui/custom/button";

// assets
import { BuildingStorefrontIcon, XMarkIcon } from "@heroicons/react/24/solid";

// types
interface FooterProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Footer({ setOpen }: FooterProps) {
  const { numberOfProductFilters, productFilterCleared } = useSearchParamsState();
  const [, startTransition] = useTransition();

  return (
    <>
      {numberOfProductFilters > 0 && (
        <Button
          type="button"
          size="block"
          variant="destructive"
          onClick={() => {
            setOpen(false);
            startTransition(() => productFilterCleared());
          }}
        >
          <XMarkIcon width={24} height={24} />
          Clear All Filters
        </Button>
      )}
      <Button type="button" size="block" variant="outline" onClick={() => setOpen(false)}>
        <BuildingStorefrontIcon width={24} height={24} />
        Keep Shopping
      </Button>
    </>
  );
}
