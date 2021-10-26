import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { getDdbDocument } from './dynamoDb';
import { formatGameState } from "./game";

export async function handler(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
    if (!event.pathParameters) {
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

    const result = formatGameState(getResponse.Item!);
    return {
        statusCode: 200,
        body: JSON.stringify(result),
    };
}
