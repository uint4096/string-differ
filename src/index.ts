import { Levenshtein } from "./stringOperations/algos/Levenshtein";
import { getOperations } from "./stringOperations/algos/Operations";
import { fromCharOperations } from "./stringTransformation/fromCharOperations";
import { fromRangeOperations } from "./stringTransformation/fromRangeOperations";
import {
    CharOperationsGroup,
    Operands,
    Operations,
    RangeOperations,
    ResultTypes
} from "./utils/types";

export function getTransformSteps (
    resultType: 'Char',
    { s1, s2 }: Operands
): Array<CharOperationsGroup>;

export function getTransformSteps (
    resultType: 'Range',
    { s1, s2 }: Operands
): Array<RangeOperations<Operations>>;

export function getTransformSteps (
    resultType: ResultTypes,
    { s1, s2 }: Operands
) {
    switch (resultType) {
        case 'Range': {
            return getOperations('Range', Levenshtein(s1, s2), s1, s2);
        }
        case 'Char': {
            return getOperations('Char', Levenshtein(s1, s2), s1, s2);
        }
        default: {
            throw new Error('Operation type not supported!');
        }
    }
}


export function transformString (
    operationType: 'Char',
    initialString: string,
    operations: Array<CharOperationsGroup>,
): string;

export function transformString (
    operationType: 'Range',
    initialString: string,
    operations:  Array<RangeOperations<Operations>>,
): string;

export function transformString (
    operationType: ResultTypes,
    baseString: string,
    operations:  Array<RangeOperations<Operations>> | Array<CharOperationsGroup>,
): string {
    switch (operationType) {
        case 'Char': {
            return fromCharOperations(operations as Array<CharOperationsGroup>,
                baseString);
        }
        case 'Range': {
            return fromRangeOperations(operations as Array<RangeOperations<Operations>>,
                baseString);
        }
    }
}
