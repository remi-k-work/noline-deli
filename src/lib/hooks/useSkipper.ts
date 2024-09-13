// react
import { useCallback, useEffect, useRef } from "react";

// To skip the pagination reset temporarily in the tanstack table
export default function useSkipper() {
  const autoResetPageIndex = useRef(true);

  useEffect(() => {
    autoResetPageIndex.current = true;
  });

  return [autoResetPageIndex.current, useCallback(() => (autoResetPageIndex.current = false), [])] as const;
}
