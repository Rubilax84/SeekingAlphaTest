type Binary = 1 | 0;

export function getRandomBinary(): Binary {
    return Math.round(Math.random()) >= 0.5 ? 1 : 0
}

export function getRandomBinaryMatrix(size: number = 5): Binary[][] {
    return Array(size)
        .fill(Array(5).fill(0))
        .map((row: Binary[]) => row.map(_ => getRandomBinary()));
}
