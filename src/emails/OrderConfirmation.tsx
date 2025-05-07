// Load environment variables
import "dotenv/config";

// components
import { Body, Container, Head, Heading, Hr, Html, Img, Preview, Tailwind, Text } from "@react-email/components";
import OrderView, { type OrderViewProps } from "./components/order-view";

// types
interface OrderConfirmationProps {
  orderView: OrderViewProps;
}

OrderConfirmationProps.PreviewProps = {
  orderView: OrderView.PreviewProps,
} satisfies OrderConfirmationProps;

export default function OrderConfirmationProps({
  orderView: {
    header,
    header: { orderNumber },
  },
}: OrderConfirmationProps) {
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
            <OrderView header={header} />
            <Hr />
            <Img src={`${process.env.NEXT_PUBLIC_WEBSITE_URL}/favicon.svg`} alt="logo" width={16} height={16} className="mx-auto h-9 w-auto" />
            <Text className="text-black">Thanks, The NoLine-Deli Team</Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
