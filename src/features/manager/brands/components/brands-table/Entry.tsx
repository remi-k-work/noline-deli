// next
import Link from "next/link";
import Image from "next/image";

// prisma and db access
import type { BrandWithInfo } from "@/features/manager/brands/db";

// other libraries
import { cn } from "@/lib/utils";
import PathFinder from "@/lib/PathFinder";
import useMediaQuery from "@/hooks/useMediaQuery";
import { formatDistanceToNow } from "date-fns";

// components
import { TableCell, TableRow } from "@/components/ui/custom/table";
import Actions from "./Actions";

// assets
import { ClockIcon } from "@heroicons/react/24/solid";

// types
interface EntryProps {
  brand: BrandWithInfo;
  createdByUser?: string;
}

export default function Entry({ brand, createdByUser }: EntryProps) {
  // Small devices (landscape phones, less than 768px)
  const isSmall = useMediaQuery("(max-width: 767.98px)");

  // Ensure the brand exists
  if (!brand) return null;

  const {
    id,
    name,
    logoUrl,
    createdBy,
    user: { role },
    _count: { products },
    createdAt,
    updatedAt,
  } = brand;

  return (
    <TableRow className="odd:bg-[--surface-3] even:bg-[--surface-4]">
      <TableCell>
        <Link href={PathFinder.toBrandEdit(id)}>
          <Image
            src={PathFinder.toResolvedBrandLogo(logoUrl)}
            width={320}
            height={200}
            alt={name}
            title={name}
            sizes="50vw"
            className="m-auto max-h-14 w-auto rounded-lg object-cover"
          />
        </Link>
      </TableCell>
      <TableCell>
        <Link href={PathFinder.toBrandEdit(id)} className="link">
          {name}
        </Link>
      </TableCell>
      {isSmall ? (
        <TableCell className="text-center">{products}</TableCell>
      ) : (
        <>
          <TableCell className="overflow-clip whitespace-nowrap">{logoUrl}</TableCell>
          <TableCell className="text-center">{products}</TableCell>
          <TableCell className="text-center">
            <span className="m-auto flex w-fit items-center gap-2">
              <ClockIcon width={24} height={24} className="min-w-max" />
              {formatDistanceToNow(createdAt)} ago
            </span>
            <hr className="border-dotted" />
            <span className="m-auto flex w-fit items-center gap-2">
              <ClockIcon width={24} height={24} className="min-w-max" />
              {formatDistanceToNow(updatedAt)} ago
            </span>
          </TableCell>
        </>
      )}
      <TableCell>
        <Actions brandId={id} brandName={name} brandLogoUrl={logoUrl} />
      </TableCell>
    </TableRow>
  );
}
