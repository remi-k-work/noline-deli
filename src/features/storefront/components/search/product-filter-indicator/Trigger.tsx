// other libraries
import useSearchParamsState from "@/hooks/useSearchParamsState";

// components
import { PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/custom/button";
import { Badge } from "@/components/ui/custom/badge";
import WithIndicator, { Indicator } from "@/components/ui/custom/with-indicator";

// assets
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";

// types
interface TriggerProps {
  className?: string;
}

export default function Trigger({ className }: TriggerProps) {
  const { numberOfProductFilters } = useSearchParamsState();

  return (
    <PopoverTrigger className={className} asChild>
      <Button type="button" size="icon" variant="ghost" title={`You are applying ${numberOfProductFilters} filter(s)`}>
        <WithIndicator>
          <Indicator>
            <Badge variant="secondary">{numberOfProductFilters}</Badge>
          </Indicator>
          <AdjustmentsHorizontalIcon width={36} height={36} />
        </WithIndicator>
      </Button>
    </PopoverTrigger>
  );
}
