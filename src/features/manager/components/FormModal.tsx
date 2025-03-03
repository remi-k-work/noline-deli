"use client";

// react
import { ReactNode } from "react";

// next
import { useRouter } from "next/navigation";

// components
import Dialog, { DialogContent, DialogTitle, DialogDescription } from "@/components/ui/custom/dialog";

// types
interface FormModalProps {
  title: ReactNode;
  description: string;
  children: ReactNode;
}

export default function FormModal({ title, description, children }: FormModalProps) {
  // To be able to close the modal
  const { back } = useRouter();

  return (
    <Dialog defaultOpen onOpenChange={() => back()}>
      <DialogContent>
        <DialogTitle className="flex items-center gap-2">{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
        {children}
      </DialogContent>
    </Dialog>
  );
}
