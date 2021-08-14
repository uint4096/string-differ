import { CharOperationsGroup } from "../utils/types";

export const fromCharOperations = (
    operations: Array<CharOperationsGroup>,
    baseString: string
) => {
    return operations.reduce((acc, op) => {
        if (op.type === 'insert') {
            acc += op.value;
        } else if (op.type === 'retain') {
            acc += baseString[op.value];
        }

        return acc;
    }, '');
};
