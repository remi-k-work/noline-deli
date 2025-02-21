// components
import { Badge } from "@/components/ui/badge";

// assets
import { TruckIcon } from "@heroicons/react/24/solid";

export default function FreeShipping() {
  return (
    <Badge className="m-auto flex w-fit items-center gap-2 p-3 text-base">
      <TruckIcon width={24} height={24} />
      Free Shipping
    </Badge>
  );
}
