const Store = (maxSize: number) => {
  const xCoordinates: Array<number> = [];
  const traces: Array<Array<number>> = [];

  const getIdx = (index: number) => (index < 0 ? maxSize + index : index);

  return {
    set: (index: number, value: number) => {
      xCoordinates[getIdx(index)] = value;
    },

    get: (index: number) => xCoordinates[getIdx(index)],

    snapshot: () => traces.push([...xCoordinates]),

    getSnapshot: () => traces,
  };
};
