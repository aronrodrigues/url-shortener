# URL Shortener

### How to deplopy
1. Create an AWS user with the following permissions
    1. API Gateway / Full access / All resources
    1. API Gateway V2 / Full access / All resources
    1. CloudFormation / Full access / All resources
    1. DynamoDB / Full access / All resources
    1. IAM / Full access / All resources
    1. Lambda / Full access / All resources
    1. S3 / Full access / All resources
1. The user must have programatic access (AccessKey/Secret)
1. Install node/npm https://nodejs.org/en/download/
1. Install the aws-cli https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html
1. Install the cdk-cli https://docs.aws.amazon.com/cdk/latest/guide/work-with-cdk-typescript.html
1. Run ```aws configure``` and set the credentias of the user created above.
1. Run ```cdk bootstrap```
1. Navigate to the root of the project and run the following commands
    ```
    cd api
    npm install
    npm run deploy
    ```
1. After the deploy is complete the system will output the api endpoint, copy this value to the 
    ```
    ApiStack.RestApiEndpoint0551178A = https://this.is.an.example/prod/
    ```
1. Copy the value of ApiStack.RestApiEndpoint into the key apin.endopoint of the file app/src/environments.ts
1. Build the website:
    ```
    npm run build-website
    npm run deploy
    ```

### Things to improve
* Unit test API
* Integration test
* Accept custom ids
* Improve ID generation
    * Collision handling/retries
* 301 Browser redirect
* Validate inputs in the API side
* Ease deployment (automaticaly update endpoint)
    * Automate the deployment.
* Create a CDK Role
* Throtling/retries
* API authentication
* No public bucket
