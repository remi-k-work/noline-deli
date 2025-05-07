// prisma and db access
import { generateRandomPriceInCents } from "@/db/seed/helpers";
import { SHIPPING_OPTIONS } from "@/features/cart/db/consts";

// other libraries
import { faker } from "@faker-js/faker";
import { nanoid } from "nanoid";
import { formatCurrency, formatDateTime } from "@/lib/formatters";

// components
import { Button, Column, Heading, Row, Section, Text } from "@react-email/components";
import ShipTo, { type ShipToProps } from "./ShipTo";

// types
export interface HeaderProps {
  orderNumber: string;
  created: Date;
  customerEmail: string;
  totalPaid: number;
  paymentMethodType: string;
  receiptUrl: string | null;
  shipTo: ShipToProps;
  shippingMethod: string;
}

// Generate a random header for the preview
const gender = faker.person.sexType();
const firstName = faker.person.firstName(gender);
const lastName = faker.person.lastName(gender);

Header.PreviewProps = {
  orderNumber: nanoid(),
  created: new Date(),
  customerEmail: faker.internet.email({ firstName, lastName }),
  totalPaid: generateRandomPriceInCents(10000),
  paymentMethodType: "Credit Card",
  receiptUrl:
    "https://pay.stripe.com/receipts/invoices/CAcaFwoVYWNjdF8xUGpiaHhLQmRzR3dZS3I3KMrF6cAGMgbA4x11fcw6LBa0xWUfSuBVo_JWhio586dFFOJdc4ni1Z4h69VNsL1UPFn-6HJ0DfT0WDSx?s=ap",
  shipTo: ShipTo.PreviewProps,
  shippingMethod: faker.helpers.arrayElement(SHIPPING_OPTIONS).shipping_rate_data.display_name,
} satisfies HeaderProps;

export default function Header({ orderNumber, created, customerEmail, totalPaid, paymentMethodType, receiptUrl, shipTo, shippingMethod }: HeaderProps) {
  return (
    <Section className="text-start">
      <Row>
        <Column className="w-1/2 rounded-xl border border-solid border-gray-500 p-4 align-top">
          <Heading as="h3">Order Number</Heading>
          <Text className="break-all">{orderNumber}</Text>
        </Column>
        <Column className="w-1/2 rounded-xl bg-gray-500 p-4 align-top text-white">
          <Heading as="h3">Date</Heading>
          <Text>{formatDateTime(created)}</Text>
        </Column>
      </Row>
      <Row>
        <Column className="w-1/2 rounded-xl bg-gray-500 p-4 align-top text-white">
          <Heading as="h3">Email</Heading>
          <Text className="break-all">{customerEmail}</Text>
        </Column>
        <Column className="w-1/2 rounded-xl border border-solid border-gray-500 p-4 align-top">
          <Heading as="h3">Total</Heading>
          <Text>{formatCurrency(totalPaid)}</Text>
        </Column>
      </Row>
      <Row>
        <Column className="w-1/2 rounded-xl border border-solid border-gray-500 p-4 align-top">
          <Heading as="h3">Payment Method</Heading>
          <Text>{paymentMethodType}</Text>
        </Column>
        <Column className="w-1/2 rounded-xl bg-gray-500 p-4 align-top text-white">
          <Heading as="h3">Receipt</Heading>
          {receiptUrl ? (
            <Button href={receiptUrl} className="rounded-xl bg-white px-5 py-3 text-gray-500 no-underline">
              View Receipt
            </Button>
          ) : (
            <Text>Unavailable</Text>
          )}
        </Column>
      </Row>
      <Row>
        <Column className="w-1/2 rounded-xl bg-gray-500 p-4 align-top text-white">
          <Heading as="h3">Ship To</Heading>
          <ShipTo {...shipTo} />
        </Column>
        <Column className="w-1/2 rounded-xl border border-solid border-gray-500 p-4 align-top">
          <Heading as="h3">Shipping Method</Heading>
          <Text>{shippingMethod}</Text>
        </Column>
      </Row>
    </Section>
  );
}
