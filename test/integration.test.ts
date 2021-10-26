import axios from 'axios';
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";

describe('Lambda Integration', () => {
    beforeEach(async () => {
        const item = {
            gameId: '1234',
            hostId: 'steve',
            opponentId: 'joe',
            currentTurn: 'steve',
            status: 'active',
        };

        const dbClient = new DynamoDBClient({
            endpoint: 'http://127.0.0.1:8000/',
        });
        const dynamoDBDocument = DynamoDBDocument.from(dbClient);
        await dynamoDBDocument.delete({
            Key: { gameId: item.gameId },
            TableName: "games",
        });

        await dynamoDBDocument.put({
            Item: { ...item },
            TableName: "games",
        });

        const getResponse = await dynamoDBDocument.get({
            Key: { gameId: item.gameId },
            TableName: "games",
        });
        expect(getResponse.Item).toBeDefined();
    });

    test("create a new game by taking a turn and query the game state", async () => {
        const takeTurnResponse = await axios.post("http://localhost:3000/1234", {
            params: { position: "topLeft", playerId: 'steve' }
        });

        expect(takeTurnResponse.status).toEqual(200);
        expect(takeTurnResponse.data).toEqual(`Turn successful`);    

        const gameStatusResponse = await axios.get("http://localhost:3000/1234");
        expect(gameStatusResponse.status).toEqual(200);
        expect(gameStatusResponse.data).toEqual({
            gameId: '1234',
            hostId: 'steve',
            opponentId: 'joe',
            turnSymbol: 'O',
            squares: ['X', null, null, null, null, null, null, null, null],
            status: 'active',
        });

        await axios.post("http://localhost:3000/1234", {
            params: { position: "middleLeft", playerId: 'joe' }
        });
        await axios.post("http://localhost:3000/1234", {
            params: { position: "topMiddle", playerId: 'steve' }
        });
        await axios.post("http://localhost:3000/1234", {
            params: { position: "middleMiddle", playerId: 'joe' }
        });
        await axios.post("http://localhost:3000/1234", {
            params: { position: "topRight", playerId: 'steve' }
        });
        const endGameResponse = await axios.get("http://localhost:3000/1234");
        expect(endGameResponse.data).toEqual({
            gameId: '1234',
            hostId: 'steve',
            opponentId: 'joe',
            turnSymbol: 'O',
            squares: ['X', 'X', 'X', 'O', 'O', null, null, null, null],
            status: 'winner',
        });
    }, 10000);
});