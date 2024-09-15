"use client";

// component css styles
import styles from "./OrderedItemInfoTrigger.module.css";

// prisma and db access
import { OrderedItem } from "@prisma/client";

// other libraries
import useMediaQuery from "@/lib/hooks/useMediaQuery";

// components
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import OrderedItemInfo from "@/features/manager/components/OrderedItemInfo";

// assets
import { InformationCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

// types
interface OrderedItemInfoTriggerProps {
  orderedItem: OrderedItem;
  className?: string;
}

export default function OrderedItemInfoTrigger({ orderedItem, className }: OrderedItemInfoTriggerProps) {
  // Small devices (landscape phones, less than 768px)
  const isSmall = useMediaQuery("(max-width: 767.98px)");

  return isSmall ? (
    <Drawer>
      <DrawerTrigger className={className}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="btn btn-circle glass btn-primary">
              <InformationCircleIcon width={24} height={24} />
            </div>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Detailed information about this ordered item</p>
          </TooltipContent>
        </Tooltip>
      </DrawerTrigger>
      <DrawerContent className="max-h-[80vh]">
        <DrawerHeader className="m-auto">
          <DrawerTitle className="m-auto flex items-center gap-2">
            <InformationCircleIcon width={32} height={32} />
            Ordered Item Info
          </DrawerTitle>
          <DrawerDescription className="sr-only">Detailed information about this ordered item</DrawerDescription>
        </DrawerHeader>
        <div className="h-auto overflow-y-auto">
          <OrderedItemInfo orderedItem={orderedItem} />
        </div>
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
      <DialogTrigger className={className}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="btn btn-circle glass btn-primary">
              <InformationCircleIcon width={24} height={24} />
            </div>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Detailed information about this ordered item</p>
          </TooltipContent>
        </Tooltip>
      </DialogTrigger>
      <DialogContent className={styles["ordered-item-info-trigger__product-info"]}>
        <DialogHeader className="m-auto">
          <DialogTitle className="m-auto flex items-center gap-2">
            <InformationCircleIcon width={32} height={32} />
            Ordered Item Info
          </DialogTitle>
          <DialogDescription className="sr-only">Detailed information about this ordered item</DialogDescription>
        </DialogHeader>
        <div className="max-h-[80vh] overflow-y-auto">
          <OrderedItemInfo orderedItem={orderedItem} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
