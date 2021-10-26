export function calculateWinner(squares: string[]): string | null {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i]
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a]
        }
    }
    return null
}

export function convertPositionsToSquaresArray(item: any): string[] {
    const { topLeft, topMiddle, topRight,
        middleLeft, middleMiddle, middleRight,
        bottomLeft, bottomMiddle, bottomRight
    } = item;
    return [topLeft, topMiddle, topRight,
        middleLeft, middleMiddle, middleRight,
        bottomLeft, bottomMiddle, bottomRight].map(x => x === undefined ? null : x);
}

export function selectSquare(position: string, squares: string[], symbol: string): string[] {
    const positions: any = {
        topLeft: 0,
        topMiddle: 1,
        topRight: 2,
        middleLeft: 3,
        middleMiddle: 4,
        middleRight: 5,
        bottomLeft: 6,
        bottomMiddle: 7,
        bottomRight: 8
    };

    const squareIndex = positions[position as string];
    const newSquares = [...squares];
    newSquares[squareIndex] = symbol;
    return newSquares;
}