"use client";

// react
import { forwardRef } from "react";

// other libraries
import { useTanTableInstanceContext } from "../../../stores/TanTableInstance";

const ByContext = forwardRef<HTMLElement>(({ ...props }, ref) => {
  const { currentDate, currentCustomerEmail, currentShippingMethod, currentStatus, currentBrand, isSearchMode, isBrowsingAll } = useTanTableInstanceContext();

  if (isSearchMode)
    return (
      <footer ref={ref} {...props}>
        Search Results
      </footer>
    );

  if (isBrowsingAll)
    return (
      <footer ref={ref} {...props}>
        All Orders
      </footer>
    );

  return (
    <footer ref={ref} {...props}>
      {currentDate ? (
        <>By Date ► {currentDate.label}</>
      ) : currentCustomerEmail ? (
        <>By Customer ► {currentCustomerEmail}</>
      ) : currentShippingMethod ? (
        <>By Shipping ► {currentShippingMethod}</>
      ) : currentStatus ? (
        <>By Status ► {currentStatus}</>
      ) : (
        <>By Brand ► {currentBrand}</>
      )}
    </footer>
  );
});
ByContext.displayName = "ByContext";

export default ByContext;
