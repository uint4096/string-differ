import { CharTransforms, LevenshteinMatrix, RangeTransforms, ResultTypes } from "../../utils/types";
import { CharOperationsHelper } from "../helpers/Char";
import { RangeOperationsHelper } from "../helpers/Range";

export function getOperations (
    type: ResultTypes, 
    matrix: LevenshteinMatrix,
    s1: string,
    s2: string
): ReturnType<CharTransforms['getOperations']> | ReturnType<RangeTransforms['getOperations']> {
    switch (type) {
        case 'Range': {
            return createOperations('Range', RangeOperationsHelper(s2));
        }
        case 'Char': {
            return createOperations('Char', CharOperationsHelper());
        }
        default: {
            throw new Error('Operation type not supported!');
        }
    }

    function createOperations(type: 'Range', helper: RangeTransforms): ReturnType<RangeTransforms['getOperations']>;
    function createOperations(type: 'Char', helper: CharTransforms): ReturnType<CharTransforms['getOperations']>;

    function createOperations (
        type: ResultTypes,
        helper: CharTransforms | RangeTransforms
    ) {
        let i = s2.length, j = s1.length;

        const retainOp = (index: number) => helper.addOperation('retain', index);
        const insertOp = (index: number) => type === 'Char'
            ? (helper as CharTransforms).addOperation('insert', s2[index])
            : (helper as RangeTransforms).addOperation('insert', index);
        const deleteOp = (index: number) => helper.addOperation('delete', index);

        while (i > 0 && j > 0) {
            const minVal = Math.min(matrix[i-1][j-1],
                matrix[i][j-1],
                matrix[i-1][j]);

            if (minVal === matrix[i-1][j-1]) {
                if (matrix[i][j] === matrix[i-1][j-1]) {
                    retainOp(j-1);
                } else {
                    insertOp(i-1);
                    deleteOp(j-1);
                }
                i = i-1;
                j = j-1;

            } else if (minVal === matrix[i][j-1]) {
                deleteOp(j-1);
                j = j-1;
            } else if (minVal === matrix[i-1][j]) {
                insertOp(i-1);
                i = i-1;
            }
        }

        if (j === 0 && i > 0) {
            while(i > 0) {
                insertOp(i-1);
                i--;
            }
        }

        if (i === 0 && j > 0) {
            while(j > 0) {
                deleteOp(j-1);
                j--;
            }
        }

        return helper.getOperations().reverse();
    }
}


