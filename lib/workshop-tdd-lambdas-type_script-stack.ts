import * as cdk from '@aws-cdk/core';
import { GameService } from './game_service';

export class WorkshopTddLambdasTypeScriptStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        new GameService(this, 'GameService');
    }
}
