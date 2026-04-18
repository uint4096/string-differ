import type { Traces, IStore } from "../utils";

export const Store = (offset: number = 0) => {
  let traces: any = new Array(2 * offset + 1).fill(-1);  

  return {
    initialize: () => {
      traces = [];
    },

    set: (index: number, value: number) => {
      traces[index + offset] = value;
    },

    get: (index: number) => traces[index + offset],

    getSize: () => traces.length,
  };
};
