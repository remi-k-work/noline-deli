"use client";

// react
import { ReactNode } from "react";

// other libraries
import useMediaQuery from "@/lib/hooks/useMediaQuery";

// components
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";

// assets
import { XCircleIcon } from "@heroicons/react/24/solid";

// types
interface ResponsiveDialogTriggerProps {
  asChild?: boolean;
  trigger: ReactNode;
  title: ReactNode;
  description: string;
  content: ReactNode;
  className?: string;
}

export default function ResponsiveDialogTrigger({ asChild, trigger, title, description, content, className }: ResponsiveDialogTriggerProps) {
  // Small devices (landscape phones, less than 768px)
  const isSmall = useMediaQuery("(max-width: 767.98px)");

  return isSmall ? (
    <Drawer>
      <DrawerTrigger asChild={asChild} className={className}>
        {trigger}
      </DrawerTrigger>
      <DrawerContent className="max-h-[80vh]">
        <DrawerHeader className="m-auto">
          <DrawerTitle className="m-auto flex items-center gap-2">{title}</DrawerTitle>
          <DrawerDescription className="sr-only">{description}</DrawerDescription>
        </DrawerHeader>
        <div className="h-auto overflow-y-auto">{content}</div>
        <DrawerFooter>
          <DrawerClose asChild>
            <button type="button" className="btn btn-block">
              <XCircleIcon width={24} height={24} />
              Close
            </button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ) : (
    <Dialog>
      <DialogTrigger asChild={asChild} className={className}>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-[--size-content-3]">
        <DialogHeader className="m-auto">
          <DialogTitle className="m-auto flex items-center gap-2">{title}</DialogTitle>
          <DialogDescription className="sr-only">{description}</DialogDescription>
        </DialogHeader>
        <div className="max-h-[80vh] overflow-y-auto">{content}</div>
      </DialogContent>
    </Dialog>
  );
}
