export const shortestEdit = (a: string, b: string): Array<Array<number>> => {
  const max = a.length + b.length;
  const store = Store(max);

  store.set(1, 0); // to make sure x for the 0th step is assigned 0

  for (let d = 0; d <= max; d++) {
    store.snapshot();

    for (let k = -d; k <= d; k += 2) {
      let x =
        d === -k || (d !== k && store.get(k + 1) > store.get(k - 1))
          ? store.get(k + 1) // x doesn't change when you move downward
          : store.get(k - 1) + 1; // x increases by 1 when you move rightward

      let y = x - k;

      // diagonal moves
      while (x < a.length && y < b.length && a[x] === b[y]) {
        x += 1;
        y += 1;
      }

      store.set(k, x); // we only care about storing x values

      if (x >= a.length && y >= b.length) {
        return store.getSnapshot();
      }
    }
  }

  return store.getSnapshot();
};
