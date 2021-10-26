import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";

export function getDdbDocument() : DynamoDBDocument {
    const dbClient = new DynamoDBClient({
        endpoint: 'http://host.docker.internal:8000/',
    });
    const dynamoDBDocument = DynamoDBDocument.from(dbClient);
    return dynamoDBDocument;
}