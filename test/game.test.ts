import { convertPositionsToSquaresArray } from "../lib/squares";

const item = {
      gameId: '1234',
      hostId: 'steve',
      opponentId: 'joe',
      currentTurn: 'steve',
  };

it('convert no positions to squares', () => {
    const squares = convertPositionsToSquaresArray(item);

    expect(squares).toEqual(Array(9).fill(null));
});

it('convert topleft to squares', () => {
    const topLeftItem = {
      ...item,
      topLeft: 'X'
    };
    const squares = convertPositionsToSquaresArray(topLeftItem);

    expect(squares).toEqual(['X', null, null, null, null, null, null, null, null]);
});

it('convert bottomRight to squares', () => {
    const bottomRightItem = {
      ...item,
      bottomRight: 'X'
    };
    const squares = convertPositionsToSquaresArray(bottomRightItem);

    expect(squares).toEqual([null, null, null, null, null, null, null, null, 'X']);
});

it('convert all positions to squares', () => {
    const allPositionsItem = {
      ...item,
      topLeft: 'X',
      topMiddle: 'X', 
      topRight: 'X', 
      middleLeft: 'X', 
      middleMiddle: 'X', 
      middleRight: 'X',
      bottomLeft: 'X', 
      bottomMiddle: 'X', 
      bottomRight: 'X'
    };
    const squares = convertPositionsToSquaresArray(allPositionsItem);

    expect(squares).toEqual(['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X']);
});

