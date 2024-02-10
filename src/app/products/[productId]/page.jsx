// layouts and pages
import ViewProductDetails from "@/ui/pages/products/ViewProductDetails";

export default function Page({ params: { productId } }) {
  return <ViewProductDetails productId={productId} />;
}
