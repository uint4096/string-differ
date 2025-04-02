import type { Traces } from "../utils/types";

export const rollIdx = (size: number, index: number) =>
  index < 0 ? size + index : index;

export const Store = (maxSize: number) => {
  const xCoordinates: Array<number> = [];
  const traces: Traces = [];

  return {
    set: (index: number, value: number) => {
      xCoordinates[rollIdx(maxSize, index)] = value;
    },

    get: (index: number) => xCoordinates[rollIdx(maxSize, index)],

    snapshot: () => traces.push([...xCoordinates]),

    getSnapshot: () => traces,
  };
};
