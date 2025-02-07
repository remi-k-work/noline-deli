"use client";

// component css styles
import styles from "./Logout.module.css";

// react
import { useEffect, useState, useTransition } from "react";

// next
import { useRouter } from "next/navigation";

// assets
import { PowerIcon } from "@heroicons/react/24/solid";

export default function Logout() {
  // Is the user currently logged in?
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // To display a pending status while the server action is running
  const [isPending, startTransition] = useTransition();

  // To be able to reload the manager
  const { refresh } = useRouter();

  useEffect(() => {
    // Is the user currently logged in?
    async function checkIfLoggedIn() {
      const res = await fetch("/auth");
      setIsLoggedIn(res.ok);
    }

    // Temporarily disable user authentication so that everyone can access the manager
    // checkIfLoggedIn();
  }, []);

  function handleLogoutClicked() {
    startTransition(async () => {
      // Log the user out
      await fetch("/auth", { method: "DELETE" });

      // Reload the manager
      refresh();
    });
  }

  return (
    <section className={styles["logout"]}>
      <button type="button" className="btn btn-circle btn-ghost" disabled={isPending || !isLoggedIn} title={"Logout"} onClick={handleLogoutClicked}>
        <PowerIcon width={24} height={24} />
      </button>
    </section>
  );
}
