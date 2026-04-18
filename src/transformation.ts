import type { CharOperationsGroup } from "./types";

export const fromCharOperations = (operations: Array<CharOperationsGroup>) => {
  return operations.reduce((acc, op) => {
    if (op.type === "insert" || op.type === "retain") {
      acc += op.value;
    }

    return acc;
  }, "");
};
