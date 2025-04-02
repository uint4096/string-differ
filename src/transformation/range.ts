import type { Operations, RangeOperations } from "../utils";

export const fromRangeOperations = (
  operations: Array<RangeOperations<Operations>>,
  baseString: string,
) => {
  return operations.reduce((acc, op) => {
    if (op.type === "insert") {
      acc += op.value;
    } else if (op.type === "retain") {
      acc += baseString.slice(op.startIndex, op.endIndex + 1);
    }

    return acc;
  }, "");
};
