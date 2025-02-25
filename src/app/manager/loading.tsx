// assets
import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="grid h-full place-content-center">
      <Loader className="size-48 animate-spin text-muted-foreground" />
    </div>
  );
}
