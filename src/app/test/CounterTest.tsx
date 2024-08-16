"use client";

import { useCounterStore } from "./counter-store-provider";

export default function CounterTest() {
  const { count, incrementCount, decrementCount } = useCounterStore((state) => state);

  return (
    <div>
      Count: {count}
      <br />
      <br />
      <button type="button" onClick={incrementCount} className="btn">
        Increment Count
      </button>
      &nbsp;
      <button type="button" onClick={decrementCount} className="btn">
        Decrement Count
      </button>
    </div>
  );
}
