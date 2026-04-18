import type { DiffArgs } from "./types";

export const generateEditScript = ({
  a,
  b,
  aStart,
  bStart,
  aEnd,
  bEnd,
}: Required<DiffArgs>): [number, number] | [] => {
  const aLength = aEnd - aStart + 1;
  const bLength = bEnd - bStart + 1;
  const max = aLength + bLength;

  const store = new Int32Array(2 * max + 1).fill(-1);

  // to make sure x for the 0th step is assigned 0
  store[1 + max] = 0;
  store[-1 + max] = 0;

  const _store = new Int32Array(2 * max + 1).fill(-1);
  _store[1 + max] = 0;
  _store[-1 + max] = 0;

  const delta = aLength - bLength;

  for (let d = 0; d <= max; d++) {
    for (let k = -d; k <= d; k += 2) {
      let x1: any =
        d === -k ||
        (d !== k && (store[k + 1 + max] ?? -1) > (store[k - 1 + max] ?? -1))
          ? store[k + 1 + max] // x doesn't change when we move downward
          : <number>store[k - 1 + max] + 1; // x increases by 1 when we move rightward

      let y1 = x1 - k;

      // diagonal moves
      while (
        aLength > x1 &&
        bLength > y1 &&
        a.charCodeAt(aStart + x1) === b.charCodeAt(bStart + y1)
      ) {
        x1 += 1;
        y1 += 1;
      }

      store[k + max] = x1; // we only care about storing x values

      if (x1 >= aLength && y1 >= bLength) {
        return [];
      }

      let x2: any =
        d === -k || (d !== k && _store[k + 1 + max] > _store[k - 1 + max])
          ? _store[k + 1 + max]
          : <number>_store[k - 1 + max] + 1;

      let y2 = x2 - k;

      /*
       * The comparison is a[aStart + (aLength - x2 -1)] === b[bStart + (bLength - y2 -1)]
       * This translates to a[aEnd - x2], since aLength = aEnd - aStart + 1;
       */
      while (
        aLength > x2 &&
        bLength > y2 &&
        a.charCodeAt(aEnd - x2) === b.charCodeAt(bEnd - y2)
      ) {
        x2 += 1;
        y2 += 1;
      }

      _store[k + max] = x2;

      if (x2 >= aLength && y2 >= bLength) {
        return [];
      }

      const deltaK = delta - k;
      const mappedX = aLength - (_store[deltaK + max] ?? -1);

      if (x1 >= mappedX) {
        return [x1, y1];
      }
    }
  }

  return [];
};
