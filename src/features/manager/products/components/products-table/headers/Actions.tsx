// components
import { TableHead } from "@/components/ui/table";

// types
interface ActionsProps {
  className?: string;
}

export default function Actions({ className }: ActionsProps) {
  return <TableHead className={className}>&nbsp;</TableHead>;
}
