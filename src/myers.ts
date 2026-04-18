import type { CharOperationsGroup, DiffArgs } from "./types";
import { generateEditScript } from "./ses";

const retainPrefix = ({
  a,
  b,
  aStart,
  bStart,
  aEnd,
  bEnd,
}: Required<DiffArgs>): number => {
  let retentionLength = 0;

  while (aStart <= aEnd && bStart <= bEnd && a.charCodeAt(aStart) === b.charCodeAt(bStart)) {
    retentionLength += 1;
    aStart += 1;
    bStart += 1;
  }

  return retentionLength;
};

const retainSuffix = ({
  a,
  b,
  aStart,
  bStart,
  aEnd,
  bEnd,
}: Required<DiffArgs>): number => {
  let retentionLength = 0;

  while (aStart <= aEnd && bStart <= bEnd && a.charCodeAt(aEnd) === b.charCodeAt(bEnd)) {
    retentionLength += 1;
    aEnd -= 1;
    bEnd -= 1;
  }

  return retentionLength;
};

export const diff = ({
  a,
  b,
  operations = [],
  aStart = 0,
  bStart = 0,
  aEnd = a.length - 1,
  bEnd = b.length - 1,
}: DiffArgs & {
  operations?: Array<CharOperationsGroup>;
}): Array<CharOperationsGroup> => {
  if (aStart > aEnd) {
    operations.push({ type: "insert", value: b.slice(bStart, bEnd + 1) });
    return operations;
  }

  if (bStart > bEnd) {
    operations.push({ type: "delete", value: a.slice(aStart, aEnd + 1) });
    return operations;
  }

  const prefixLength = retainPrefix({
    a,
    b,
    aStart,
    bStart,
    aEnd,
    bEnd,
  });

  const suffixLength = retainSuffix({
    a,
    b,
    aStart: aStart + prefixLength,
    bStart: bStart + prefixLength,
    aEnd,
    bEnd,
  });

  if (prefixLength) {
    operations.push({
      type: "retain",
      value: a.slice(aStart, aStart + prefixLength),
    });
  }

  if (aStart + prefixLength > aEnd - suffixLength) {
    if (bStart + prefixLength <= bEnd - suffixLength) {
      operations.push({
        type: "insert",
        value: b.slice(bStart + prefixLength, bEnd - suffixLength + 1),
      });
    }

    if (suffixLength) {
      operations.push({
        type: "retain",
        value: a.slice(aEnd - suffixLength + 1, aEnd + 1),
      });
    }

    return operations;
  }

  if (bStart + prefixLength > bEnd - suffixLength) {
    operations.push({
      type: "delete",
      value: a.slice(aStart + prefixLength, aEnd - suffixLength + 1),
    });

    if (suffixLength) {
      operations.push({
        type: "retain",
        value: a.slice(aEnd - suffixLength + 1, aEnd + 1),
      });
    }

    return operations;
  }

  const [splitX, splitY] = generateEditScript({
    a,
    b,
    aStart: aStart + prefixLength,
    bStart: bStart + prefixLength,
    aEnd: aEnd - suffixLength,
    bEnd: bEnd - suffixLength,
  });

  if (splitX == null || splitY == null) {
    operations.push(
      {
        type: "delete",
        value: a.slice(aStart + prefixLength, aEnd - suffixLength + 1),
      },
      {
        type: "insert",
        value: b.slice(bStart + prefixLength, bEnd - suffixLength + 1),
      },
    );
  } else {
    diff({
      a,
      b,
      operations,
      aStart: aStart + prefixLength,
      aEnd: aStart + prefixLength + splitX - 1,
      bStart: bStart + prefixLength,
      bEnd: bStart + prefixLength + splitY - 1,
    });

    diff({
      a,
      b,
      operations,
      aStart: aStart + prefixLength + splitX,
      aEnd: aEnd - suffixLength,
      bStart: bStart + prefixLength + splitY,
      bEnd: bEnd - suffixLength,
    });
  }

  if (suffixLength) {
    operations.push({
      type: "retain",
      value: a.slice(aEnd - suffixLength + 1, aEnd + 1),
    });
  }

  return operations;
};
