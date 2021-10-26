https://docs.aws.amazon.com/cdk/latest/guide/serverless_example.html
https://docs.aws.amazon.com/cdk/api/latest/docs/aws-lambda-nodejs-readme.html
https://docs.aws.amazon.com/cdk/latest/guide/sam.html
cdk synth --no-staging > template.yaml
sam-beta-cdk local start-api

docker run -p 8000:8000 amazon/dynamodb-local

aws dynamodb create-table \
    --table-name games \
    --attribute-definitions \
        AttributeName=gameId,AttributeType=S \
    --key-schema AttributeName=gameId,KeyType=HASH \
    --billing-mode PAY_PER_REQUEST \
    --endpoint-url http://localhost:8000

aws dynamodb scan --table-name games --endpoint-url http://localhost:8000

