// next
import Link from "next/link";

// components
import { Button } from "@/components/ui/custom/button";

// assets
import { UserIcon } from "@heroicons/react/24/solid";

export default function MyAccount() {
  return (
    <Button type="button" size="icon" variant="ghost" className="[place-self:center_end] [grid-area:macc]" title="My Account" asChild>
      <Link href="/customer">
        <UserIcon width={36} height={36} />
      </Link>
    </Button>
  );
}

export function MyAccountSkeleton() {
  return <div className="bg-background h-12 w-12 animate-pulse [place-self:center_end] rounded-full [grid-area:macc]" />;
}
