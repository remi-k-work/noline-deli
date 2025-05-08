// Load environment variables
import "dotenv/config";

// prisma and db access
import type { OrderWithItemsSimple } from "@/features/storefront/db/types";
import { SHIPPING_OPTIONS } from "@/features/cart/db/consts";

// other libraries
import { faker } from "@faker-js/faker";
import { nanoid } from "nanoid";

// components
import { Body, Container, Head, Heading, Hr, Html, Img, Preview, Tailwind, Text } from "@react-email/components";
import Header from "./components/order-confirmation/header";
import Details from "./components/order-confirmation/details";
import ShipTo, { type ShipToProps } from "./components/order-confirmation/header/ShipTo";

// types
interface OrderConfirmationProps {
  order: OrderWithItemsSimple;
  customerEmail: string;
  paymentMethodType: string;
  receiptUrl: string | null;
  shipTo: ShipToProps;
}

// Generate an array of ordered items for the preview
const { orderedItems, totalQty, subTotal } = {
  orderedItems: [
    {
      quantity: 2,
      name: "Snack Fizzy Cola Cola flavour milk chocolate with popping Candy 90g",
      imageUrl: "/f0040c9713432db4c2520a1a801fc5ac617e9f2f.png",
      price: 1389,
      total: 2778,
      categoryName: "Chocolate Tablets",
      subCategoryName: "Medium 100g Milk",
    },
    {
      quantity: 3,
      name: "Sensitive Calm Liquid Shaving Cream",
      imageUrl: "/165d55532d154e418836d5809bc6b093-screen.webp",
      price: 985,
      total: 2955,
      categoryName: "Cosmetics",
      subCategoryName: null,
    },
    {
      quantity: 2,
      name: "Bread Tray",
      imageUrl: "/mae-mu-8GzmzEyLNyc-unsplash.jpg",
      price: 1809,
      total: 3618,
      categoryName: "Catering",
      subCategoryName: "Trays",
    },
  ],
  totalQty: 2 + 3 + 2,
  subTotal: 2778 + 2955 + 3618,
};

// Generate a random customer for the preview
const gender = faker.person.sexType();
const firstName = faker.person.firstName(gender);
const lastName = faker.person.lastName(gender);

// Pick a random shipping option for this order
const shippingOption = faker.helpers.arrayElement(SHIPPING_OPTIONS);
const shippingCost = shippingOption.shipping_rate_data.fixed_amount.amount;
const shippingMethod = shippingOption.shipping_rate_data.display_name;

const taxAmount = 0;
const totalPaid = subTotal + taxAmount + shippingCost;

OrderConfirmation.PreviewProps = {
  order: { orderNumber: nanoid(), created: new Date(), totalQty, subTotal, taxAmount, shippingCost, shippingMethod, totalPaid, orderedItems },
  customerEmail: faker.internet.email({ firstName, lastName }),
  paymentMethodType: "Credit Card",
  receiptUrl:
    "https://pay.stripe.com/receipts/invoices/CAcaFwoVYWNjdF8xUGpiaHhLQmRzR3dZS3I3KMrF6cAGMgbA4x11fcw6LBa0xWUfSuBVo_JWhio586dFFOJdc4ni1Z4h69VNsL1UPFn-6HJ0DfT0WDSx?s=ap",
  shipTo: ShipTo.PreviewProps,
} satisfies OrderConfirmationProps;

export default function OrderConfirmation({ order, order: { orderNumber }, customerEmail, paymentMethodType, receiptUrl, shipTo }: OrderConfirmationProps) {
  return (
    <Html>
      <Head>
        <title>NoLine-Deli ► Order Confirmation</title>
      </Head>
      <Tailwind>
        <Body className="bg-white text-center font-sans text-gray-500">
          <Preview>NoLine-Deli ► Order Confirmation ({orderNumber})</Preview>
          <Container className="mx-auto max-w-xl rounded-xl border border-solid border-gray-500 p-4">
            <Img src={`${process.env.NEXT_PUBLIC_WEBSITE_URL}/logo.png`} alt="logo" width={1024} height={1024} className="mx-auto h-36 w-auto" />
            <Hr />
            <Heading>Thank you for your order!</Heading>
            <Header order={order} customerEmail={customerEmail} paymentMethodType={paymentMethodType} receiptUrl={receiptUrl} shipTo={shipTo} />
            <Details order={order} />
            <Hr />
            <Img src={`${process.env.NEXT_PUBLIC_WEBSITE_URL}/favicon.svg`} alt="logo" width={16} height={16} className="mx-auto h-9 w-auto" />
            <Text className="text-black">Thanks, The NoLine-Deli Team</Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
