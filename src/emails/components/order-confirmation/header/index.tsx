// prisma and db access
import type { OrderWithItemsSimple } from "@/features/storefront/db/types";

// other libraries
import { formatCurrency, formatDateTime } from "@/lib/formatters";

// components
import { Button, Column, Heading, Row, Section, Text } from "@react-email/components";
import ShipTo, { type ShipToProps } from "./ShipTo";

// types
interface HeaderProps {
  order: OrderWithItemsSimple;
  customerEmail: string;
  paymentMethodType: string;
  receiptUrl: string | null;
  shipTo: ShipToProps;
}

export default function Header({
  order: { orderNumber, created, shippingMethod, totalPaid },
  customerEmail,
  paymentMethodType,
  receiptUrl,
  shipTo,
}: HeaderProps) {
  return (
    <Section className="text-start">
      <Row>
        <Column className="w-1/2 rounded-xl border border-solid border-gray-500 p-4 align-top">
          <Heading as="h3" className="mt-0 mb-1">
            Order Number
          </Heading>
          <Text className="m-0 break-all">{orderNumber}</Text>
        </Column>
        <Column className="w-1/2 rounded-xl bg-gray-500 p-4 align-top text-white">
          <Heading as="h3" className="mt-0 mb-1">
            Date
          </Heading>
          <Text className="m-0">{formatDateTime(created)}</Text>
        </Column>
      </Row>
      <Row>
        <Column className="w-1/2 rounded-xl bg-gray-500 p-4 align-top text-white">
          <Heading as="h3" className="mt-0 mb-1">
            Email
          </Heading>
          <Text className="m-0 break-all">{customerEmail}</Text>
        </Column>
        <Column className="w-1/2 rounded-xl border border-solid border-gray-500 p-4 align-top">
          <Heading as="h3" className="mt-0 mb-1">
            Total
          </Heading>
          <Text className="m-0">{formatCurrency(totalPaid)}</Text>
        </Column>
      </Row>
      <Row>
        <Column className="w-1/2 rounded-xl border border-solid border-gray-500 p-4 align-top">
          <Heading as="h3" className="mt-0 mb-1">
            Payment Method
          </Heading>
          <Text className="m-0">{paymentMethodType}</Text>
        </Column>
        <Column className="w-1/2 rounded-xl bg-gray-500 p-4 align-top text-white">
          <Heading as="h3" className="mt-0 mb-1">
            Receipt
          </Heading>
          {receiptUrl ? (
            <Button href={receiptUrl} className="rounded-xl bg-white px-5 py-3 text-gray-500 no-underline">
              View Receipt
            </Button>
          ) : (
            <Text className="m-0">Unavailable</Text>
          )}
        </Column>
      </Row>
      <Row>
        <Column className="w-1/2 rounded-xl bg-gray-500 p-4 align-top text-white">
          <Heading as="h3" className="mt-0 mb-1">
            Ship To
          </Heading>
          <ShipTo {...shipTo} />
        </Column>
        <Column className="w-1/2 rounded-xl border border-solid border-gray-500 p-4 align-top">
          <Heading as="h3" className="mt-0 mb-1">
            Shipping Method
          </Heading>
          <Text className="m-0">{shippingMethod}</Text>
        </Column>
      </Row>
    </Section>
  );
}
