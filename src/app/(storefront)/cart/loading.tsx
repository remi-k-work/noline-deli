// components
import MainLayout from "@/features/storefront/components/MainLayout";

// assets
import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <MainLayout>
      <div className="grid h-full place-content-center">
        <Loader className="size-48 animate-spin text-muted-foreground" />
      </div>
    </MainLayout>
  );
}
