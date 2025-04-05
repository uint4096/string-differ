import { type Context } from "../utils";

export const generateEditScript = ({ store, a, b }: Context): void => {
  const max = a.length + b.length;

  store.initialize(-1);
  store.set(-1, 1, 0); // to make sure x for the 0th step is assigned 0

  for (let d = 0; d <= max; d++) {
    store.initialize(d);

    for (let k = -d; k <= d; k += 2) {
      let x =
        d === -k || (d !== k && ((store.get(d-1, k+1) ?? -1) > (store.get(d-1, k-1) ?? -1)))
          ? store.get(d-1, k+1) // x doesn't change when we move downward
          : (<number>store.get(d-1, k-1)) + 1; // x increases by 1 when we move rightward

      if (x == null) {
        throw new Error("Invalid x coordinate!")
      }

      let y = x - k;

      // diagonal moves
      while (a.length > x && b.length > y && a[x] === b[y]) {
        x += 1;
        y += 1;
      }

      store.set(d, k, x); // we only care about storing x values

      if (x >= a.length && y >= b.length) {
        return;
      }
    }
  }
};
