// components
import { TableHead } from "@/components/ui/custom/table";

// types
interface ItemProps {
  className?: string;
}

export default function Item({ className }: ItemProps) {
  return <TableHead className={className}>&nbsp;</TableHead>;
}
