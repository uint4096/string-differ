import { LevenshteinMatrix } from "../../utils/types";

export function Levenshtein (s1: string, s2: string): LevenshteinMatrix {

    const initializeMatrix = (l1: number, l2: number) => {
        const m: LevenshteinMatrix = []
        for (let i=0; i<l2 + 1; i++) {
            m[i] = [];
            for (let j=0; j < l1 + 1; j++) {
                if (i === 0) {
                    m[i].push(j);
                } else if (j === 0) {
                    m[i][j] = i;
                }
            }
        }

        return m;
    }

    const createVisualization = (matrix: LevenshteinMatrix) => {
        for (let i=0; i<s2.length; i++) {
            for (let j=0; j<s1.length; j++) {
                if (s2[i] === s1[j]) {
                    matrix[i+1][j+1] = matrix[i][j];
                } else {
                    const minVal = Math.min(matrix[i][j] + 1,
                        matrix[i+1][j] + 1,
                        matrix[i][j+1] + 1
                    );

                    matrix[i+1][j+1] = minVal;
                }
            }
        }

        return matrix;
    }

    return createVisualization(initializeMatrix(s1.length, s2.length));
}
