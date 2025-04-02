/* eslint-disable @next/next/no-img-element */

// component css styles
import styles from "./TestCustomerCard.module.css";

// next
import Link from "next/link";

// prisma and db access
import type { AllGuestTestCustomersData } from "@/features/cart/db/types";

// other libraries
import { cn } from "@/lib/utils";
import PathFinder from "@/lib/PathFinder";
import countryCodeToFlagEmoji from "country-code-to-flag-emoji";

// assets
import { AtSymbolIcon, HomeIcon, PhoneIcon } from "@heroicons/react/24/solid";

// types
interface TestCustomerCardProps {
  customer: AllGuestTestCustomersData;
  goingTo: "checkout" | "my-account";
  isPicked: boolean;
}

export default function TestCustomerCard({
  customer: { id, email, name, phone, country, city, line1, line2, postal_code, state },
  goingTo,
  isPicked = false,
}: TestCustomerCardProps) {
  return (
    <Link
      href={goingTo === "checkout" ? PathFinder.toSfCheckoutPage(id) : PathFinder.toSfCustomerAccount(id)}
      className={cn(styles["test-customer-card"], isPicked && styles["test-customer-card--is-picked"])}
    >
      <img src={`https://doodleipsum.com/200x200/avatar-3?n=${name}`} width={200} height={200} alt="Avatar" />
      <h2>{name}</h2>
      <dl>
        <dt>
          <AtSymbolIcon width={24} height={24} />
          email
        </dt>
        <dd className={styles["email"]}>{email}</dd>
        <dt>
          <PhoneIcon width={24} height={24} />
          phone
        </dt>
        <dd>{phone}</dd>
        <dt>
          <HomeIcon width={24} height={24} />
          address
        </dt>
        <dd>
          <p>{line1}</p>
          <p>{line2}</p>
          <p>{city}</p>
          <p>
            {state}, {postal_code}
          </p>
          <p className="text-2xl">
            <b>{country}</b>&nbsp;<span className="font-noto-color-emoji">{countryCodeToFlagEmoji(country)}</span>
          </p>
        </dd>
      </dl>
    </Link>
  );
}

export function TestCustomerCardSkeleton() {
  return (
    <div className={styles["test-customer-card"]}>
      <div className="bg-background h-[200px] w-[200px] animate-pulse [grid-area:ava]"></div>
      <h2>
        <div className="bg-background h-15 animate-pulse"></div>
      </h2>
      <dl>
        <dt>
          <AtSymbolIcon width={24} height={24} />
          email
        </dt>
        <dd>
          <div className="bg-background h-4 animate-pulse"></div>
        </dd>
        <dt>
          <PhoneIcon width={24} height={24} />
          phone
        </dt>
        <dd>
          <div className="bg-background h-5.5 animate-pulse"></div>
        </dd>
        <dt>
          <HomeIcon width={24} height={24} />
          address
        </dt>
        <dd>
          <div className="bg-background h-35.5 animate-pulse"></div>
        </dd>
      </dl>
    </div>
  );
}
