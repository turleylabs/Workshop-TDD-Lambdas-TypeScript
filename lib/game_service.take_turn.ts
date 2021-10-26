import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { updateGame } from './game';
import { getDdbDocument } from './dynamoDb';

export async function handler(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
    const params = JSON.parse(event.body ? event.body : '{ "params": {}}').params;

    if (!event.pathParameters || !params.position || !params.playerId) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: 'Missing parameters',
            }),
        };
    }

    const dynamoDBDocument = getDdbDocument();
    const getResponse = await dynamoDBDocument.get({ Key: { gameId: event.pathParameters.id}, 
        TableName: "games"});

    const game = getResponse.Item!;
    const item = updateGame(game, params);

    await dynamoDBDocument.put({ Item: item, TableName: "games" });
    
    return {
        statusCode: 200,
        body: 'Turn successful'
    };
}
