// components
import MainLayout from "@/features/storefront/components/MainLayout";

export default function Loading() {
  return (
    <MainLayout>
      <div className="grid h-full place-content-center">
        <span className="loading loading-dots loading-lg m-auto block" />
      </div>
    </MainLayout>
  );
}
