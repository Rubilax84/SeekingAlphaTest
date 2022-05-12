import {Binary} from "../model";


export function getRandomBinary(): Binary {
    return Math.round(Math.random()) >= 0.5 ? 1 : 0
}

export function getRandomBinaryMatrix(size: number = 8): Binary[][] {
    return Array(size)
        .fill(Array(size).fill(0))
        .map((row: Binary[]) => row.map(_ => getRandomBinary()));
}

