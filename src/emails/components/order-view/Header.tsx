// other libraries
import { nanoid } from "nanoid";
import { formatCurrency, formatDateTime } from "@/lib/formatters";

// components
import { Button, Column, Heading, Row, Section, Text } from "@react-email/components";
import ShipTo from "./ShipTo";

// types
interface HeaderProps {
  orderNumber: string;
  created: Date;
  customerEmail: string;
  totalPaid: number;
  paymentMethodType: string;
  receiptUrl: string | null;
  shippingMethod: string;
}

Header.PreviewProps = {
  orderNumber: nanoid(),
  created: new Date(),
  customerEmail: "jZ7Kg@example.com",
  totalPaid: 100,
  paymentMethodType: "Credit Card",
  receiptUrl:
    "https://pay.stripe.com/receipts/invoices/CAcaFwoVYWNjdF8xUGpiaHhLQmRzR3dZS3I3KMrF6cAGMgbA4x11fcw6LBa0xWUfSuBVo_JWhio586dFFOJdc4ni1Z4h69VNsL1UPFn-6HJ0DfT0WDSx?s=ap",
  shippingMethod: "Standard",
} satisfies HeaderProps;

export default function Header({ orderNumber, created, customerEmail, totalPaid, paymentMethodType, receiptUrl, shippingMethod }: HeaderProps) {
  return (
    <Section>
      <Row>
        <Column>
          <Heading as="h3">Order Number</Heading>
          <Text>{orderNumber}</Text>
        </Column>
        <Column>
          <Heading as="h3">Date</Heading>
          <Text>{formatDateTime(created)}</Text>
        </Column>
      </Row>
      <Row>
        <Column>
          <Heading as="h3">Email</Heading>
          <Text>{customerEmail}</Text>
        </Column>
        <Column>
          <Heading as="h3">Total</Heading>
          <Text>{formatCurrency(totalPaid)}</Text>
        </Column>
      </Row>
      <Row>
        <Column>
          <Heading as="h3">Payment Method</Heading>
          <Text>{paymentMethodType}</Text>
        </Column>
        <Column>
          <Heading as="h3">Receipt</Heading>
          {receiptUrl ? (
            <Button href={receiptUrl} className="rounded bg-black px-6 py-4 text-lg text-white no-underline">
              View Receipt
            </Button>
          ) : (
            <Text>Unavailable</Text>
          )}
        </Column>
      </Row>
      <Row>
        <Column>
          <Heading as="h3">Ship To</Heading>
          <ShipTo paymentIntent={paymentIntent} />
        </Column>
        <Column>
          <Heading as="h3">Shipping Method</Heading>
          <Text>{shippingMethod}</Text>
        </Column>
      </Row>
    </Section>
  );
}
