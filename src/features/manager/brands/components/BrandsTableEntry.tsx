// next
import Link from "next/link";
import Image from "next/image";

// prisma and db access
import { BrandWithUser } from "../db";

// other libraries
import { cn } from "@/lib/utils";
import PathFinder from "../../PathFinder";
import useMediaQuery from "@/lib/useMediaQuery";

// components
import { TableCell, TableRow } from "@/components/ui/table";
import BrandsTableActions from "./BrandsTableActions";

// types
interface BrandsTableEntryProps {
  brand: BrandWithUser;
  createdByUser?: string;
}

export default function BrandsTableEntry({ brand, createdByUser }: BrandsTableEntryProps) {
  // Small devices (landscape phones, less than 768px)
  const isSmall = useMediaQuery("(max-width: 767.98px)");

  // Ensure the brand exists
  if (!brand) {
    // To prevent receiving the "cannot destructure property of undefined" exception, do not attempt to render anything
    return null;
  }

  const {
    id,
    name,
    logoUrl,
    createdBy,
    user: { role },
  } = brand;

  return (
    <TableRow
      className={cn("odd:bg-[--surface-3] even:bg-[--surface-4]", {
        "text-error": role === "ADMIN" || createdBy !== createdByUser,
      })}
    >
      <TableCell>
        <Link href={PathFinder.toBrandEdit(id)}>
          <Image
            src={PathFinder.toResolvedBrandLogo(logoUrl)}
            width={320}
            height={200}
            alt={name}
            title={name}
            sizes="50vw"
            className="m-auto h-auto max-h-14 w-auto rounded-lg object-cover"
          />
        </Link>
      </TableCell>
      <TableCell>
        <Link href={PathFinder.toBrandEdit(id)} className="link-hover link">
          {name}
        </Link>
      </TableCell>
      {!isSmall && <TableCell className="overflow-clip whitespace-nowrap">{logoUrl}</TableCell>}
      <TableCell>
        <BrandsTableActions brandId={id} brandName={name} brandLogoUrl={logoUrl} />
      </TableCell>
    </TableRow>
  );
}
