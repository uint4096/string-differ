type DiffOptions = "characters" | "size";
type DiffConfig = { [k in DiffOptions]?: number };

const identity = (str: string) => str;

const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomSelection = (sampleSize: number, numInt: number) => {
  const indexes = Array.from({ length: sampleSize }, (_, i) => i);

  const res: Array<number> = [];

  for (let i = 0; i < numInt; i++) {
    const idx = Math.floor(Math.random() * indexes.length);

    const elem = indexes.splice(idx, 1);
    res.push(elem[0]);
  }

  return res;
};

const applyDiff = (degree: number, remove: boolean) => (str: string) => {
  if (degree < 0 || degree > 100) {
    throw new Error("[Diff Creator] degree must be a number between 0 and 100");
  }

  const numChars = Math.floor((str.length * degree) / 100);
  const selection = randomSelection(str.length, numChars);

  let diffStr = "",
    i = 0;

  while (i < str.length) {
    diffStr += selection.includes(i)
      ? remove
        ? ""
        : String.fromCharCode(randomInt(32, 126))
      : str[i];
    i += 1;
  }

  return diffStr;
};

export const createDiff = (str: string, config: DiffConfig) => {
  const diffLength = config.size
    ? applyDiff(config.size, true)
    : identity;

  const diffCharacters = config.characters
    ? applyDiff(config.characters, false)
    : identity;

  return diffCharacters(diffLength(str));
};
