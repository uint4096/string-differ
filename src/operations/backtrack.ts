import type {
  CharTransforms,
  RangeTransforms,
  ResultTypes,
  Context,
} from "../utils";
import { CharOperationsHelper, RangeOperationsHelper } from "./helpers";
import { rollIdx } from "./store";

function createOperations(
  type: "Range",
  helper: RangeTransforms,
  context: Context,
): ReturnType<RangeTransforms["getOperations"]>;
function createOperations(
  type: "Char",
  helper: CharTransforms,
  context: Context,
): ReturnType<CharTransforms["getOperations"]>;

function createOperations(
  type: ResultTypes,
  helper: CharTransforms | RangeTransforms,
  { a, b, traces }: Context,
) {
  const retainOp = (index: number) => helper.addOperation("retain", index);
  const insertOp = (index: number) =>
    type === "Char"
      ? (helper as CharTransforms).addOperation("insert", b[index])
      : (helper as RangeTransforms).addOperation("insert", index);
  const deleteOp = (index: number) => helper.addOperation("delete", index);

  let x = a.length,
    y = b.length;
  const size = x + y;

  for (let d = traces.length - 1; d > 0; d--) {
    const k = x - y;
    const trace = traces[d];

    const prevK =
      d === -k ||
      (d !== k &&
        (trace[rollIdx(size, k + 1)] ?? -1) >
          (trace[rollIdx(size, k - 1)] ?? -1)) // prefer the move with larger x value
        ? k + 1
        : k - 1;

    const prevX = trace[rollIdx(size, prevK)] ?? -1;
    const prevY = prevX - prevK;

    // backtrack diagonal moves
    while (x > prevX && y > prevY) {
      x = x - 1;
      y = y - 1;

      retainOp(x);
    }

    if (prevX < x) {
      deleteOp(x - 1);
    } else {
      insertOp(y - 1);
    }

    x = prevX;
    y = prevY;
  }

  while (x !== 0 || y !== 0) {
    retainOp(--x);

    y -= 1;
  }

  return helper.getOperations();
}

export const getOperations =
  (type: ResultTypes) =>
  (
    context: Context,
  ):
    | ReturnType<CharTransforms["getOperations"]>
    | ReturnType<RangeTransforms["getOperations"]> => {
    switch (type) {
      case "Range": {
        return createOperations(
          "Range",
          RangeOperationsHelper(context.b),
          context,
        );
      }
      case "Char": {
        return createOperations("Char", CharOperationsHelper(), context);
      }
      default: {
        throw new Error("Unsupported operation type!");
      }
    }
  };
