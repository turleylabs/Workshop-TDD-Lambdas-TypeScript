import { selectSquare, convertPositionsToSquaresArray, calculateWinner } from './squares';

export function updateGame(game: any, params: any) {
    let status = game.status;
    const symbol = params.playerId === game.hostId ? 'X' : 'O';
    const squares = convertPositionsToSquaresArray(game);
    const newSquares = selectSquare(params.position as string, squares, symbol);
    if (calculateWinner(newSquares)) {
        status = 'winner';
    }
    const nextTurn = params.playerId === game.hostId ? game.opponentId : game.hostId;

    const item = {
        ...game,
        status,
        currentTurn: nextTurn,
        [params.position]: symbol,
    };
    return item;
}


export function formatGameState(game : any) : any {
    const squares = convertPositionsToSquaresArray(game);
    const {gameId, hostId, opponentId, status, currentTurn} = game;
    const turnSymbol = currentTurn === hostId ? 'X' : 'O';

    return {
        gameId, 
        hostId, 
        opponentId, 
        status,
        turnSymbol: turnSymbol,
        squares: squares,
    };
}