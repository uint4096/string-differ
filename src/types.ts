export type Operations = "insert" | "delete" | "retain";

export type DiffArgs = {
  a: string;
  b: string;
  aStart?: number;
  aEnd?: number;
  bStart?: number;
  bEnd?: number;
};

export interface CharOperations<T extends Operations> {
  type: T;
  value: T extends Extract<Operations, "delete" | "retain"> ? string : string;
}

export type Traces = Array<number>;

export interface IStore {
  set: (index: number, value: number) => void;
  get: (index: number) => number;
  getSize: () => number;
}

export interface Operands {
  s1: string;
  s2: string;
}

export type CharOperationsGroup =
  | CharOperations<"insert">
  | CharOperations<"delete">
  | CharOperations<"retain">;
