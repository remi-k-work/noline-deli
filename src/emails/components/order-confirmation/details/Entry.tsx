// prisma and db access
import type { OrderedItem } from "@prisma/client";

// other libraries
import PathFinder from "@/lib/PathFinder";
import { formatCurrency } from "@/lib/formatters";

// components
import { Column, Img, Row, Text } from "@react-email/components";

// types
interface EntryProps {
  orderedItem: Pick<OrderedItem, "quantity" | "name" | "imageUrl" | "price" | "total" | "categoryName" | "subCategoryName">;
}

export default function Entry({ orderedItem: { name, quantity, imageUrl, total, categoryName, subCategoryName } }: EntryProps) {
  return (
    <Row className="mb-4 px-2">
      <Column className="w-auto align-top">
        <Img
          src={PathFinder.toResolvedProductImageWithOrigin(imageUrl, process.env.NEXT_PUBLIC_WEBSITE_URL!)}
          alt={name}
          width={160}
          height={100}
          className="mr-4 object-cover"
        />
      </Column>
      <Column className="w-2/3 align-top">
        <Text className="m-0">{name}</Text>
        <Text className="m-0 text-[12px] leading-[14px]">{categoryName}</Text>
        {subCategoryName && <Text className="m-0 text-[12px] leading-[14px]">{subCategoryName}</Text>}
      </Column>
      <Column className="w-1/3 text-end align-top">
        <Text className="m-0 break-all">
          {quantity} / {formatCurrency(total)}
        </Text>
      </Column>
    </Row>
  );
}
