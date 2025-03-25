// component css styles
import styles from "./TestCustomersList.module.css";

// next
import Link from "next/link";

// prisma and db access
import { allGuestTestCustomersData } from "@/features/cart/db/helpers";

// other libraries
import PathFinder from "@/lib/PathFinder";
import { faker } from "@faker-js/faker";

// components
import { Button } from "@/components/ui/custom/button";
import TestCustomerCard from "./TestCustomerCard";

// assets
import { ShoppingBagIcon } from "@heroicons/react/24/solid";

export default async function TestCustomersList() {
  // Get all the necessary data about all guest test customers
  const customers = await allGuestTestCustomersData();

  // Pick a random customer to use for the test checkout session
  const { id: pickedCustomerId } = faker.helpers.arrayElement(customers);

  return (
    <article className={styles["test-customers-list"]}>
      <h4 className="font-lusitana text-xl">Select a test Customer for Checkout!</h4>
      <section>
        {customers.map((customer) => (
          <TestCustomerCard key={customer.id} customer={customer} isPicked={customer.id === pickedCustomerId} />
        ))}
      </section>
      <br />
      <Button size="lg" className="float-end" asChild>
        <Link href={PathFinder.toSfCheckoutPage(pickedCustomerId)}>
          <ShoppingBagIcon width={24} height={24} />
          Continue to Checkout
        </Link>
      </Button>
      <br />
      <br />
    </article>
  );
}
