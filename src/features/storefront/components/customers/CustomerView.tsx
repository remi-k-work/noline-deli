/* eslint-disable @next/next/no-img-element */

// component css styles
import styles from "./CustomerView.module.css";

// prisma and db access
import type { CustomerData } from "@/features/storefront/db/types";

// other libraries
import countryCodeToFlagEmoji from "country-code-to-flag-emoji";

// assets
import { AtSymbolIcon, HomeIcon, PhoneIcon } from "@heroicons/react/24/solid";

// types
interface CustomerViewProps {
  customer: CustomerData;
}

export default function CustomerView({ customer }: CustomerViewProps) {
  // Do not render anything if there is no customer
  if (!customer) return null;
  const { name, email, phone, country, city, line1, line2, postal_code, state } = customer;

  return (
    <article className={styles["customer-view"]}>
      <img src={`https://doodleipsum.com/300x300/avatar-3?n=${name}`} width={300} height={300} alt="Avatar" />
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
    </article>
  );
}
