"use client";

// react
import { useEffect, useState, useTransition } from "react";

// next
import { useRouter } from "next/navigation";

// other libraries
import PathFinder from "@/lib/PathFinder";

// components
import { Button } from "@/components/ui/custom/button";

// assets
import { PowerIcon } from "@heroicons/react/24/solid";

export default function Logout() {
  // Is the user currently logged in?
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggedIn] = useState(false);

  // To display a pending status while the server action is running
  const [isPending, startTransition] = useTransition();

  // To be able to reload the manager
  const { refresh } = useRouter();

  useEffect(() => {
    // Is the user currently logged in?
    // async function checkIfLoggedIn() {
    //   const res = await fetch(PathFinder.toAuth(), { method: "GET" });
    //   setIsLoggedIn(res.ok);
    // }
    // Temporarily disable user authentication so that everyone can access the manager
    // checkIfLoggedIn();
  }, []);

  function handleLogoutClicked() {
    startTransition(async () => {
      // Log the user out
      await fetch(PathFinder.toAuth(), { method: "DELETE" });

      // Reload the manager
      refresh();
    });
  }

  return (
    <Button type="button" size="icon" variant="ghost" title="Logout" disabled={isPending || !isLoggedIn} onClick={handleLogoutClicked}>
      <PowerIcon width={36} height={36} />
    </Button>
  );
}
