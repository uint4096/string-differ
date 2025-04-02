export type Operations = "insert" | "delete" | "retain";
export type ResultTypes = "Range" | "Char";

export type LevenshteinMatrix = Array<Array<number>>;

export interface CharOperations<T extends Operations> {
  type: T;
  value: T extends Extract<Operations, "delete" | "retain"> ? number : string;
}

export type Traces = Array<Array<number | null>>;

export type Context = {
  a: string;
  b: string;
  traces: Traces;
};

export interface Operands {
  s1: string;
  s2: string;
}

export interface OperationContainer {
  type: Operations;
  index: number;
}

interface RangeOperationsType<T extends Operations> {
  type: T;
}

type RangeOperationsBase<
  T extends Operations,
  K extends string | number = number,
> =
  T extends Extract<Operations, "delete" | "retain">
    ? RangeOperationsType<T> & { startIndex: K }
    : RangeOperationsType<T> & { value: string };

export type RangeOperations<
  T extends Operations,
  K extends string | number = number,
> =
  T extends Extract<Operations, "delete" | "retain">
    ? K extends string
      ? RangeOperationsBase<T, K>
      : RangeOperationsBase<T, K> & { endIndex: number }
    : RangeOperationsBase<T, K>;

export type CharOperationsGroup =
  | CharOperations<"insert">
  | CharOperations<"delete">
  | CharOperations<"retain">;

export interface CharTransforms {
  addOperation(type: "delete" | "retain", value: number): void;
  addOperation(type: "insert", value: string): void;
  getOperations: () => Array<CharOperationsGroup>;
}

export interface RangeTransforms {
  addOperation(type: Operations, index: number): void;
  getOperations: () => Array<RangeOperations<Operations>>;
}

export type ExcludeUndefined<T> =
  T extends Array<infer U | undefined> ? Array<U> : never;
