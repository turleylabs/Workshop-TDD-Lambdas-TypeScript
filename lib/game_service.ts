import * as core from '@aws-cdk/core';
import * as apigateway from "@aws-cdk/aws-apigateway";
import * as lambda from "@aws-cdk/aws-lambda-nodejs";

export class GameService extends core.Construct {
    constructor(scope: core.Construct, id: string) {
        super(scope, id);

        const gameState = new lambda.NodejsFunction(this, 'game_state');
        const takeTurn = new lambda.NodejsFunction(this, 'take_turn');

        const api = new apigateway.RestApi(this, "game-api", {
            restApiName: "Game Service",
            description: "This service serves tic tac toe."
        });

        const getGamesIntegration = new apigateway.LambdaIntegration(gameState, {
            requestTemplates: { "application/json": '{ "statusCode": "200" }' }
        });        
        api.root.addMethod("GET", getGamesIntegration);

        const game = api.root.addResource("{id}");
        const getGameIntegration = new apigateway.LambdaIntegration(gameState);
        game.addMethod("GET", getGameIntegration); // GET /{id}
        const postGameIntegration = new apigateway.LambdaIntegration(takeTurn);
        game.addMethod("POST", postGameIntegration); // POST /{id}
    }
}