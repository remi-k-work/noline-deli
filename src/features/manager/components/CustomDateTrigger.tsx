"use client";

// component css styles
import styles from "./CustomDateTrigger.module.css";

// react
import { Dispatch, SetStateAction } from "react";

// other libraries
import useMediaQuery from "@/lib/hooks/useMediaQuery";
import { DateRange } from "react-day-picker";

// components
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import CustomDate from "./CustomDate";

// assets
import { CalendarDateRangeIcon, XCircleIcon } from "@heroicons/react/24/solid";

// types
interface CustomDateTriggerProps {
  dateRange?: DateRange;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onRangePicked: (dateRange: DateRange) => void;
}

export default function CustomDateTrigger({ dateRange, setOpen, onRangePicked }: CustomDateTriggerProps) {
  // Small devices (landscape phones, less than 768px)
  const isSmall = useMediaQuery("(max-width: 767.98px)");

  return isSmall ? (
    <Drawer>
      <DrawerTrigger asChild>
        <Button type="button" variant="outline">
          <CalendarDateRangeIcon className="mr-2 h-5 w-5" />
          Custom Date...
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[80vh]">
        <DrawerHeader className="m-auto">
          <DrawerTitle className="m-auto flex items-center gap-2">
            <CalendarDateRangeIcon width={32} height={32} />
            Custom Date
          </DrawerTitle>
          <DrawerDescription className="sr-only">Calendar to pick a custom date range</DrawerDescription>
        </DrawerHeader>
        <div className="h-auto overflow-y-auto">
          <CustomDate dateRange={dateRange} setOpen={setOpen} onRangePicked={onRangePicked} />
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
      <DialogTrigger asChild>
        <Button type="button" variant="outline">
          <CalendarDateRangeIcon className="mr-2 h-5 w-5" />
          Custom Date...
        </Button>
      </DialogTrigger>
      <DialogContent className={styles["custom-date-trigger__custom-date"]}>
        <DialogHeader className="m-auto">
          <DialogTitle className="m-auto flex items-center gap-2">
            <CalendarDateRangeIcon width={32} height={32} />
            Custom Date
          </DialogTitle>
          <DialogDescription className="sr-only">Calendar to pick a custom date range</DialogDescription>
        </DialogHeader>
        <div className="max-h-[80vh] overflow-y-auto">
          <CustomDate dateRange={dateRange} setOpen={setOpen} onRangePicked={onRangePicked} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
