import { type Context } from "../utils";
import { Store } from "./store";

export const generateEditScript = ({ a, b, aStart, bStart, aEnd, bEnd }: any): [number, number] | [] => {
  const aLength = aEnd - aStart + 1;
  const bLength = bEnd - bStart + 1;
  const max = aLength + bLength;

  const store = Store(max);

  // to make sure x for the 0th step is assigned 0
  store.set(1, 0); 
  store.set(-1, 0); 

  const _store = Store(max);
  _store.set(1, 0); 
  _store.set(-1, 0);

  const delta = aLength - bLength;

  for (let d = 0; d <= max; d++) {
    for (let k = -d; k <= d; k += 2) {
      let x1: any =
        d === -k || (d !== k && ((store.get(k+1) ?? -1) > (store.get(k-1) ?? -1)))
          ? store.get(k+1) // x doesn't change when we move downward
          : (<number>store.get(k-1)) + 1; // x increases by 1 when we move rightward

      let y1 = x1 - k;

      // diagonal moves
      while (aLength > x1 && bLength > y1 && a[aStart + x1] === b[bStart + y1]) {
        x1 += 1;
        y1 += 1;
      }

      store.set(k, x1); // we only care about storing x values

      if (x1 >= aLength && y1 >= bLength) {
        return [];
      }

      let x2: any =
        d === -k || (d !== k && ((_store.get(k+1) ?? -1) > (_store.get(k-1) ?? -1)))
          ? _store.get(k+1)
          : (<number>_store.get(k-1)) + 1;

      let y2 = x2 - k;

      /*
       * The comparison is a[aStart + (aLength - x2 -1)] === b[bStart + (bLength - y2 -1)]
       * This translates to a[aEnd - x2], since aLength = aEnd - aStart + 1;
       */
      while (aLength > x2 && bLength > y2 && a[aEnd - x2] === b[bEnd - y2]) {
        x2 += 1;
        y2 += 1;
      }

      _store.set(k, x2);

      if (x2 >= aLength && y2 >= bLength) {
        return [];
      }

      const deltaK = delta - k;
      const mappedX = aLength - (_store.get(deltaK) ?? -1);


      if (x1 >= mappedX) {
        return [x1, y1];
      }
    }
  }

  return [];
};
