"use client";

// other libraries
import { formatDateTime } from "@/lib/formatters";

// types
interface UserDateTimeProps {
  created: number;
}

// This component ensures that date and time are always displayed on the client side in the user's local timezone
export default function UserDateTime({ created }: UserDateTimeProps) {
  return <p>{formatDateTime(new Date(created * 1000))}</p>;
}
