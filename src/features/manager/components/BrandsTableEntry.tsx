// component css styles
import styles from "./BrandsTableEntry.module.css";

// next
import Link from "next/link";
import Image from "next/image";

// prisma and db access
import { BrandWithUser } from "../dbBrands";
import { getCreatedByUser } from "../dbAccess";

// other libraries
import clsx from "clsx";
import PathFinder from "../PathFinder";

// components
import BrandsTableActions from "./BrandsTableActions";

// types
interface BrandsTableEntryProps {
  brand: BrandWithUser;
}

export default function BrandsTableEntry({ brand }: BrandsTableEntryProps) {
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
    <tr className={clsx(styles["brands-table-entry"], { "text-error": role === "ADMIN" || createdBy !== getCreatedByUser() })}>
      <td>
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
      </td>
      <td>{name}</td>
      <td>{logoUrl}</td>
      <td>
        <BrandsTableActions brandId={id} brandName={name} brandLogoUrl={logoUrl} />
      </td>
    </tr>
  );
}
