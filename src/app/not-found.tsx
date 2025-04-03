// next
import Link from "next/link";

// components
import MainLayout, { MainLayoutMain } from "@/features/storefront/components/main-layout";

export default function NotFound() {
  return (
    <MainLayout>
      <MainLayoutMain heading="Not Found">
        <div className="grid h-full place-content-center">
          <p>I could not find the requested resource.</p>
          <Link href={"/"} className="link">
            Return Home
          </Link>
        </div>
      </MainLayoutMain>
    </MainLayout>
  );
}
