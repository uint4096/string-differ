import { generateEditScript, getOperations, Store } from "./operations";
import { fromCharOperations, fromRangeOperations } from "./transformation";
import type {
  CharOperationsGroup,
  Operands,
  Operations,
  RangeOperations,
  ResultTypes,
} from "./utils";

export function getStepsForTransformation(
  resultType: "Char",
  { s1, s2 }: Operands,
): Array<CharOperationsGroup>;

export function getStepsForTransformation(
  resultType: "Range",
  { s1, s2 }: Operands,
): Array<RangeOperations<Operations>>;

export function getStepsForTransformation(
  type: ResultTypes,
  { s1, s2 }: Operands,
) {
  if (type !== "Char" && type !== "Range") {
    throw new Error("Operation type not supported!");
  }

  const store = Store();

  const context = { a: s1, b: s2, store };
  generateEditScript(context);

  return getOperations(type, context);
}

export function transformString(
  operationType: "Char",
  baseString: string,
  operations: Array<CharOperationsGroup>,
): string;

export function transformString(
  operationType: "Range",
  baseString: string,
  operations: Array<RangeOperations<Operations>>,
): string;

export function transformString(
  operationType: ResultTypes,
  baseString: string,
  operations: Array<RangeOperations<Operations>> | Array<CharOperationsGroup>,
): string {
  if (operationType === "Char") {
    return fromCharOperations(
      operations as Array<CharOperationsGroup>,
      baseString,
    );
  }

  return fromRangeOperations(
    operations as Array<RangeOperations<Operations>>,
    baseString,
  );
}
