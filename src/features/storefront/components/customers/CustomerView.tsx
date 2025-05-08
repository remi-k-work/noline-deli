/* eslint-disable @next/next/no-img-element */

// component css styles
import styles from "./CustomerView.module.css";

// next
import Link from "next/link";

// prisma and db access
import type { CustomerData } from "@/features/storefront/db/types";

// server actions and mutations
import { createCustomerPortal } from "@/features/storefront/actions/customers";

// other libraries
import PathFinder from "@/lib/PathFinder";
import countryCodeToFlagEmoji from "country-code-to-flag-emoji";

// components
import { Button } from "@/components/ui/custom/button";

// assets
import { AtSymbolIcon, BanknotesIcon, HomeIcon, LockClosedIcon, PhoneIcon, UserIcon } from "@heroicons/react/24/solid";

// openauth
import { auth, logout } from "@/auth-client/actions";

// types
interface CustomerViewProps {
  customer: CustomerData;
}

export default async function CustomerView({ customer }: CustomerViewProps) {
  // Do not render anything if there is no customer
  if (!customer) return null;
  const { id, stripeCustomerId, email, name, phone, country, city, line1, line2, postal_code, state } = customer;

  // Check if the user/customer is authenticated (this is the real customer)
  const subject = await auth();
  const customerIdFromSession = subject ? subject.properties.customerId : undefined;

  return (
    <article className={styles["customer-view"]}>
      <img src={`https://doodleipsum.com/200x200/avatar-3?n=${name}`} width={200} height={200} alt="Avatar" />
      <h2>{name}</h2>
      <dl>
        <dd>
          <Button size="block" asChild>
            <Link href={PathFinder.toSfCustomerAccount(id)}>
              <UserIcon width={24} height={24} />
              Go to My Account
            </Link>
          </Button>
          <br />
          <br />
          <form action={createCustomerPortal.bind(null, id, stripeCustomerId)}>
            <Button type="submit" size="block">
              <BanknotesIcon width={24} height={24} />
              Manage My Billing
            </Button>
          </form>
          {customerIdFromSession && (
            <>
              <br />
              <form action={logout}>
                <Button type="submit" size="block" variant="secondary">
                  <LockClosedIcon width={24} height={24} />
                  Logout
                </Button>
              </form>
            </>
          )}
        </dd>
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
          {line1 && <p>{line1}</p>}
          {line2 && <p>{line2}</p>}
          {(city || state) && <p>{[city, state].filter(Boolean).join(", ")}</p>}
          {postal_code && <p>{postal_code}</p>}
          {country && (
            <p className="text-2xl">
              <b>{country}</b>&nbsp;<span className="font-noto-color-emoji">{countryCodeToFlagEmoji(country)}</span>
            </p>
          )}
        </dd>
      </dl>
    </article>
  );
}

export function CustomerViewSkeleton() {
  return (
    <div className={styles["customer-view"]}>
      <div className="bg-background h-[200px] w-[200px] animate-pulse [grid-area:ava]"></div>
      <h2>
        <div className="bg-background h-15 animate-pulse"></div>
      </h2>
      <dl>
        <dd>
          <Button type="button" size="block" disabled>
            <UserIcon width={24} height={24} />
            Go to My Account
          </Button>
          <br />
          <br />
          <Button type="button" size="block" disabled>
            <BanknotesIcon width={24} height={24} />
            Manage My Billing
          </Button>
        </dd>
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
