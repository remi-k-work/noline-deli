// component css styles
import styles from "./TestCustomersList.module.css";

// next
import Link from "next/link";
import { redirect } from "next/navigation";

// prisma and db access
import { allGuestTestCustomersData } from "@/features/cart/db/helpers";

// other libraries
import PathFinder from "@/lib/PathFinder";
import { faker } from "@faker-js/faker";

// components
import { Button } from "@/components/ui/custom/button";
import TestCustomerCard, { TestCustomerCardSkeleton } from "./TestCustomerCard";

// assets
import { ShoppingBagIcon, UserIcon } from "@heroicons/react/24/solid";

// openauth
import { auth, login } from "@/auth-client/actions";

// types
interface TestCustomersListProps {
  goingTo: "checkout" | "my-account";
}

export default async function TestCustomersList({ goingTo }: TestCustomersListProps) {
  // Check if the user/customer is authenticated (this is the real customer)
  const subject = await auth();
  const customerIdFromSession = subject ? subject.properties.customerId : undefined;

  if (customerIdFromSession) {
    if (goingTo === "checkout") {
      redirect(PathFinder.toSfCheckoutPage(customerIdFromSession));
    } else {
      redirect(PathFinder.toSfCustomerAccount(customerIdFromSession));
    }
  }

  // Get all the necessary data about all guest test customers
  const customers = await allGuestTestCustomersData();

  // Pick a random customer to use for the test checkout session
  const { id: pickedCustomerId } = faker.helpers.arrayElement(customers);

  return (
    <article className={styles["test-customers-list"]}>
      <form action={login.bind(null, goingTo)}>
        <Button type="submit" size="lg" variant="secondary">
          Login with OpenAuth
        </Button>
      </form>
      <br />
      <h3 className="font-lusitana text-xl">- OR -</h3>
      <br />
      {goingTo === "checkout" ? (
        <h4 className="font-lusitana text-xl">Select a test Customer for Checkout!</h4>
      ) : (
        <h4 className="font-lusitana text-xl">Select a test Customer to Login!</h4>
      )}
      <section>
        {customers.map((customer) => (
          <TestCustomerCard key={customer.id} customer={customer} goingTo={goingTo} isPicked={customer.id === pickedCustomerId} />
        ))}
      </section>
      <br />
      {goingTo === "checkout" ? (
        <Button size="lg" className="float-end" asChild>
          <Link href={PathFinder.toSfCheckoutPage(pickedCustomerId)}>
            <ShoppingBagIcon width={24} height={24} />
            Continue to Checkout
          </Link>
        </Button>
      ) : (
        <Button size="lg" className="float-end" asChild>
          <Link href={PathFinder.toSfCustomerAccount(pickedCustomerId)}>
            <UserIcon width={24} height={24} />
            Go to My Account
          </Link>
        </Button>
      )}
    </article>
  );
}

export function TestCustomersListSkeleton({ goingTo }: TestCustomersListProps) {
  return (
    <div className={styles["test-customers-list"]}>
      {goingTo === "checkout" ? (
        <h4 className="font-lusitana text-xl">Select a test Customer for Checkout!</h4>
      ) : (
        <h4 className="font-lusitana text-xl">Select a test Customer to Login!</h4>
      )}
      <section>
        <TestCustomerCardSkeleton />
        <TestCustomerCardSkeleton />
        <TestCustomerCardSkeleton />
        <TestCustomerCardSkeleton />
        <TestCustomerCardSkeleton />
        <TestCustomerCardSkeleton />
        <TestCustomerCardSkeleton />
        <TestCustomerCardSkeleton />
        <TestCustomerCardSkeleton />
        <TestCustomerCardSkeleton />
      </section>
      <br />
      <div className="bg-primary float-end h-10 w-48 animate-pulse"></div>
    </div>
  );
}
