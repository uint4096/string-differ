export const greaterThan = (a: number | undefined, b: number | undefined) => {
  if (b == null) {
    return true;
  }

  if (a == null) {
    return false;
  }

  return a > b;
};
