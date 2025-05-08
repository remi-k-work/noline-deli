// prisma and db access
import type { OrderWithItemsSimple } from "@/features/storefront/db/types";

// other libraries
import { formatCurrency } from "@/lib/formatters";

// components
import { Column, Heading, Row, Section, Text } from "@react-email/components";
import Entry from "./Entry";

// types
interface DetailsProps {
  order: OrderWithItemsSimple;
}

export default function Details({ order: { orderedItems, totalQty, subTotal, taxAmount, shippingCost, totalPaid } }: DetailsProps) {
  return (
    <Section className="text-start">
      <Row>
        <Column className="w-2/3">
          <Heading as="h5" className="mt-4 mb-1">
            Item and Description
          </Heading>
        </Column>
        <Column className="w-1/3 text-end">
          <Heading as="h5" className="mt-4 mb-1">
            Qty / Total
          </Heading>
        </Column>
      </Row>
      {orderedItems.map((orderedItem, index) => (
        <Entry key={index} orderedItem={orderedItem} />
      ))}
      <Row className="bg-gray-500 px-2 pt-2 text-white">
        <Column className="w-2/3 text-end">
          <Heading as="h5" className="m-0">
            Total Qty / Subtotal:
          </Heading>
        </Column>
        <Column className="w-1/3 text-end">
          <Text className="m-0">
            {totalQty} / {formatCurrency(subTotal)}
          </Text>
        </Column>
      </Row>
      <Row className="bg-gray-500 px-2 text-white">
        <Column className="w-2/3 text-end">
          <Heading as="h5" className="m-0">
            Taxes:
          </Heading>
        </Column>
        <Column className="w-1/3 text-end">
          <Text className="m-0">{formatCurrency(taxAmount)}</Text>
        </Column>
      </Row>
      <Row className="bg-gray-500 px-2 text-white">
        <Column className="w-2/3 text-end">
          <Heading as="h5" className="m-0">
            Shipping:
          </Heading>
        </Column>
        <Column className="w-1/3 text-end">
          <Text className="m-0">{formatCurrency(shippingCost)}</Text>
        </Column>
      </Row>
      <Row className="bg-gray-500 px-2 pb-2 text-white">
        <Column className="w-2/3 text-end">
          <Heading as="h5" className="m-0 underline">
            TOTAL:
          </Heading>
        </Column>
        <Column className="w-1/3 text-end">
          <Text className="m-0 underline">{formatCurrency(totalPaid)}</Text>
        </Column>
      </Row>
    </Section>
  );
}
