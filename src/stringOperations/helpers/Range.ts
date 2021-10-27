import { OperationContainer, Operations, RangeOperations, RangeTransforms } from "../../utils/types";

export const RangeOperationsHelper = (s2: string): RangeTransforms => {

    const retainOps: Array<OperationContainer> = [];
    const deleteOps: Array<OperationContainer> = [];
    const insertOps: Array<OperationContainer> = [];
    const operations: Array<RangeOperations<Operations, number>> = [];

    const pushOperations = (queue: Array<OperationContainer>, type: Operations) => {
        if (queue.length > 0) {
            const startIndex = queue[0].index;
            const currentindex = queue[queue.length - 1].index;

            switch(type) {
                case 'insert': {
                    operations.push({
                        type: 'insert',
                        value: s2.slice(currentindex, startIndex + 1),
                    });
                    break;
                }
                case 'delete': {
                    operations.push({
                        type: 'delete',
                        startIndex: currentindex,
                        endIndex: startIndex
                    });
                    break;
                }
                case 'retain': {
                    operations.push({
                        type: 'retain',
                        startIndex: currentindex,
                        endIndex: startIndex
                    });
                }
                break;
            }
        }
    }

    const addOperation = (type: Operations, index: number) => {
        if (type === 'insert') {
            if (insertOps.length === 0) {
                pushOperations(deleteOps, 'delete');
                pushOperations(retainOps, 'retain');

                deleteOps.length = 0;
                retainOps.length = 0;
            }

            insertOps.push({ type, index });

        } else if (type === 'delete') {
            if (deleteOps.length === 0) {
                pushOperations(insertOps, 'insert');
                pushOperations(retainOps, 'retain');

                insertOps.length = 0;
                retainOps.length = 0;
            }

            deleteOps.push({ type, index });
        } else if (type === 'retain') {
            if (retainOps.length === 0) {
                pushOperations(insertOps, 'insert');
                pushOperations(deleteOps, 'delete');

                insertOps.length = 0;
                deleteOps.length = 0;
            }

            retainOps.push({ type, index });
        }
    }

    const getOperations = (): typeof operations => {
        pushOperations(insertOps, 'insert');
        pushOperations(deleteOps, 'delete');
        pushOperations(retainOps, 'retain');

        return operations.reverse();
    }

    return { addOperation, getOperations }
}
