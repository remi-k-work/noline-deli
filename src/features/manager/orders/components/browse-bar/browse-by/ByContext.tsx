"use client";

// react
import { forwardRef } from "react";

// other libraries
import { useTanTableInstanceContext } from "../../../stores/TanTableInstance";

const ByContext = forwardRef<HTMLElement>(({ ...props }, ref) => {
  const { isSearchMode } = useTanTableInstanceContext();

  return (
    <footer ref={ref} {...props}>
      {isSearchMode ? <>Search Results</> : <>All Orders</>}
    </footer>
  );
});
ByContext.displayName = "ByContext";

export default ByContext;
