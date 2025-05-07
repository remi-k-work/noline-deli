// components
import Header, { type HeaderProps } from "./Header";
// import OrderDetails from "@/features/manager/orders/components/order-details";

// types
export interface OrderViewProps {
  header: HeaderProps;
}

OrderView.PreviewProps = {
  header: Header.PreviewProps,
};

export default function OrderView({ header }: OrderViewProps) {
  return (
    <>
      <Header {...header} />
    </>
  );
}
