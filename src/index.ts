import { shortestEdit, getOperations } from "./operations";
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
  resultType: ResultTypes,
  { s1, s2 }: Operands,
) {
  switch (resultType) {
    case "Range": {
      return getOperations("Range")(shortestEdit(s1, s2));
    }
    case "Char": {
      return getOperations("Char")(shortestEdit(s1, s2));
    }
    default: {
      throw new Error("Operation type not supported!");
    }
  }
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
  switch (operationType) {
    case "Char": {
      return fromCharOperations(
        operations as Array<CharOperationsGroup>,
        baseString,
      );
    }
    case "Range": {
      return fromRangeOperations(
        operations as Array<RangeOperations<Operations>>,
        baseString,
      );
    }
  }
}
