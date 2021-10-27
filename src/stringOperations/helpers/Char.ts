import { CharOperationsGroup, CharTransforms } from "../../utils/types";

export const CharOperationsHelper = (): CharTransforms => {
    const operations: Array<CharOperationsGroup> = [];

    function addOperation (type: 'insert', value: string): void;
    function addOperation (type: 'delete' | 'retain', value: number): void;

    function addOperation (type: any, value: any): void {
        if (type && value !== undefined) {
            operations.push({ type, value });
        }
    };

    function getOperations (): typeof operations {
        return operations.reverse();
    };

    return { addOperation, getOperations };
}
