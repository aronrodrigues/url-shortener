import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as apigw from '@aws-cdk/aws-apigateway';

export class ApiStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const linksTable = new dynamodb.Table(this, 'links', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
    });

    const shortenUrlLambda = new lambda.Function(this, 'ShortenUrlLambda', {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'shorten-url.handler',
      environment: {
        hash: 'sha1',
        truncateAt: '8',
        linksTableName: linksTable.tableName,
      },
    });

    linksTable.grantWriteData(shortenUrlLambda);

    const loadUrlLambda = new lambda.Function(this, 'LoadUrlLambda', {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'load-url.handler',
      environment: {
        linksTableName: linksTable.tableName,
      },
    });

    linksTable.grantReadData(loadUrlLambda);

    const restApi = new apigw.RestApi(this, 'RestApi');
    restApi.root.addMethod('ANY');

    const linksApiResource = restApi.root.addResource('links');
    linksApiResource.addResource('{id}')
      .addMethod('GET', new apigw.LambdaIntegration(loadUrlLambda));
    linksApiResource.addMethod(
      'PUT',
      new apigw.LambdaIntegration(shortenUrlLambda)
    );


  }
}
