import type { Traces, IStore } from "../utils";

export const Store = (): IStore => {
  const traces: Traces = [];

  return {
    initialize: (step: number) => {
      traces[step] = traces[step] ?? new Map<number, number>();
    },
  
    set: (step: number, index: number, value: number) => {
      traces[step].set(index, value);
    },

    get: (step: number, index: number) => traces[step].get(index),

    getSize: () => traces.length
  };
};
