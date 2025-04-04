import { greaterThan, type Context } from "../utils";
import { Store } from "./store";

export const shortestEdit = (a: string, b: string): Context => {
  const max = a.length + b.length;
  const store = Store(2 * max + 1);

  store.set(1, 0); // to make sure x for the 0th step is assigned 0

  for (let d = 0; d <= max; d++) {
    store.snapshot();

    for (let k = -d; k <= d; k += 2) {
      let x =
        d === -k || (d !== k && greaterThan(store.get(k + 1), store.get(k - 1)))
          ? store.get(k + 1) // x doesn't change when we move downward
          : store.get(k - 1) + 1; // x increases by 1 when we move rightward

      let y = x - k;

      // diagonal moves
      while (greaterThan(a.length, x) && greaterThan(b.length, y) && a[x] === b[y]) {
        x += 1;
        y += 1;
      }

      store.set(k, x); // we only care about storing x values

      if (x >= a.length && y >= b.length) {
        return { a, b, traces: store.getSnapshot() };
      }
    }
  }

  return { a, b, traces: store.getSnapshot() };
};
