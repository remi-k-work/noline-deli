"use client";

// react
import { ReactNode } from "react";

// other libraries
import useMediaQuery from "@/hooks/useMediaQuery";

// components
import { Button } from "@/components/ui/custom/button";
import Dialog, { DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/custom/dialog";
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
            <Button type="button" size="block" variant="outline">
              <XCircleIcon width={24} height={24} />
              Close
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ) : (
    <Dialog>
      <DialogTrigger asChild={asChild} className={className}>
        {trigger}
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="flex items-center gap-2">{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
        {content}
      </DialogContent>
    </Dialog>
  );
}
