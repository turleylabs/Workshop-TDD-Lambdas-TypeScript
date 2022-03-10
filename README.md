# Prereqs
1. Install cdk `npm install -g aws-cdk`

1. Install [SAM beta](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-cdk-getting-started.html#serverless-cdk-getting-started-prerequisites)


## Install on Linux for code-server image
First install docker


# Build and run lambdas
```
cdk synth --no-staging > template.yaml
sudo sam-beta-cdk local start-api
```

# Useful links
https://docs.aws.amazon.com/cdk/latest/guide/serverless_example.html
https://docs.aws.amazon.com/cdk/api/latest/docs/aws-lambda-nodejs-readme.html
https://docs.aws.amazon.com/cdk/latest/guide/sam.html

# Run dynamodb locally
```
docker run -it -d --rm -p 8000:8000 amazon/dynamodb-local
docker run -p 8000:8000 amazon/dynamodb-local
docker inspect <container_id> | grep IPAddress
aws dynamodb create-table \
    --table-name games \
    --attribute-definitions \
        AttributeName=gameId,AttributeType=S \
    --key-schema AttributeName=gameId,KeyType=HASH \
    --billing-mode PAY_PER_REQUEST \
    --endpoint-url http://localhost:8000
aws dynamodb scan --table-name games --endpoint-url http://localhost:8000
```

aws dynamodb create-table \
    --table-name games \
    --attribute-definitions \
        AttributeName=gameId,AttributeType=S \
    --key-schema AttributeName=gameId,KeyType=HASH \
    --billing-mode PAY_PER_REQUEST \
    --endpoint-url http://172.17.0.2:8000
aws dynamodb scan --table-name games --endpoint-url http://172.17.0.2:8000


# Run S3 locally
```
docker run -p 9000:9000 \
  -p 9001:9001 \
  -e "MINIO_ACCESS_KEY=accesskey" \
  -e "MINIO_SECRET_KEY=secretkey" \
  --console-address ":9001" \
  minio/minio server /data
AWS_ACCESS_KEY_ID=minioadmin AWS_SECRET_ACCESS_KEY=minioadmin aws --endpoint-url http://localhost:9000 s3 ls
```
