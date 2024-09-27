// prisma and db access
import { ProductWithAll } from "../productsDb";

// components
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import ResponsiveDialogTrigger from "@/components/ResponsiveDialogTrigger";
import ProductInfo from "@/features/products/components/ProductInfo";

// assets
import { InformationCircleIcon } from "@heroicons/react/24/solid";

// types
interface ProductInfoTriggerProps {
  product: ProductWithAll;
  className?: string;
}

export default function ProductInfoTrigger({ product, className }: ProductInfoTriggerProps) {
  return (
    <ResponsiveDialogTrigger
      trigger={
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="btn btn-circle glass btn-primary">
              <InformationCircleIcon width={24} height={24} />
            </div>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Detailed information about this product</p>
          </TooltipContent>
        </Tooltip>
      }
      title={
        <>
          <InformationCircleIcon width={32} height={32} />
          Product Info
        </>
      }
      description="Detailed information about this product"
      content={<ProductInfo product={product} />}
      className={className}
    />
  );
}
