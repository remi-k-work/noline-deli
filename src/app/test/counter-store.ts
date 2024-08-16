// other libraries
import { createStore } from "zustand/vanilla";

// types
export interface CounterState {
  count: number;
}

interface CounterActions {
  decrementCount: () => void;
  incrementCount: () => void;
}

export type CounterStore = CounterState & CounterActions;
export type CounterStoreApi = ReturnType<typeof createCounterStore>;

const defaultInitState: CounterState = {
  count: 0,
};

export const createCounterStore = (initState: CounterState = defaultInitState) => {
  return createStore<CounterStore>()((set) => ({
    ...initState,
    decrementCount: () => set((state) => ({ count: state.count - 1 })),
    incrementCount: () => set((state) => ({ count: state.count + 1 })),
  }));
};
