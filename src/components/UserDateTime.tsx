"use client";

// other libraries
import { formatDateTime } from "@/lib/formatters";

// types
interface UserDateTimeProps {
  date: Date;
}

// This component ensures that date and time are always displayed on the client side in the user's local timezone
export default function UserDateTime({ date }: UserDateTimeProps) {
  return <p>{formatDateTime(date)}</p>;
}
