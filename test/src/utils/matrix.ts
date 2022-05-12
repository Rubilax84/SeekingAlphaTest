import {Binary} from "../model";


function getNeighboursList(matrix: Binary[][], targetRow: number, targetCell: number): Binary[] {
    const neighbours: Binary[] = [];

    for (let row = Math.max(0, targetRow - 1); row <= Math.min(targetRow + 1, matrix.length - 1); row++) {
        for (let cell = Math.max(0, targetCell - 1); cell <= Math.min(targetCell + 1, matrix[0].length - 1); cell++) {
            if (row !== targetRow || cell !== targetCell) {
                neighbours.push(matrix[row][cell]);
            }
        }
    }

    return neighbours;
}

export function getNextMatrixState(matrix: Binary[][]): Binary[][] {

    const newMatrix: Binary[][] = [];

    for (let row = 0; row < matrix.length; row++) {
        const cells = matrix[row];
        newMatrix.push([...matrix[row]]);

        for (let cell = 0; cell < cells.length; cell++) {
            const value = cells[cell];

            newMatrix[row][cell] = value;

            const neighbours = getNeighboursList(matrix, row, cell);
            const aliveNeighbours = neighbours.filter(v => !!v);

            if (value) {
                // Any live cell with fewer than two live neighbours dies (underpopulation).
                // Any live cell with more than three live neighbours dies (overcrowding).
                if (aliveNeighbours.length < 2 || aliveNeighbours.length > 3) {
                    newMatrix[row][cell] = 0;
                }
            } else {
                // Any dead cell with exactly three live neighbours becomes a live cell (reproduction).
                newMatrix[row][cell] = aliveNeighbours.length === 3 ? 1 : 0;
            }
        }
    }

    // console.log(matrix, newMatrix);

    return newMatrix;
}
