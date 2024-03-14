// next
import Link from "next/link";

// other libraries
import clsx from "clsx";

// assets
import { lusitana } from "@/assets/fonts";

export default function NotFound() {
  return (
    <div className="grid h-full place-content-center">
      <h2 className={clsx(lusitana.className, "mb-8 text-3xl lg:text-4xl")}>Not Found</h2>
      <p>I could not find the requested resource.</p>
      <Link href={"/"} className="link-hover link">
        Return Home
      </Link>
    </div>
  );
}
