// next
import Link from "next/link";

// components
import MainLayout from "@/features/storefront/components/MainLayout";

export default function NotFound() {
  return (
    <MainLayout>
      <div className="grid h-full place-content-center">
        <h1 className="font-lusitana mb-8 text-xl lg:text-3xl">Not Found</h1>
        <p>I could not find the requested resource.</p>
        <Link href={"/"} className="link">
          Return Home
        </Link>
      </div>
    </MainLayout>
  );
}
