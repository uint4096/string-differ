import { diff } from "./myers";
import { fromCharOperations } from "./transformation";
import type { CharOperationsGroup, Operands } from "./types";

export const getStepsForTransformation = ({ s1, s2 }: Operands) =>
  diff({ a: s1, b: s2 });

export const transformString = (operations: Array<CharOperationsGroup>) =>
  fromCharOperations(operations as Array<CharOperationsGroup>);
