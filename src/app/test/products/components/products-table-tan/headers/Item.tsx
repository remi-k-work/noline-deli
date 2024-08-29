// components
import { TableHead } from "@/components/ui/table";

// types
interface ItemProps {
  className?: string;
}

export default function Item({ className }: ItemProps) {
  return <TableHead className={className}>&nbsp;</TableHead>;
}
