# Waqq.ly

# Dependencies

1. AWS Account Required
2. Set up 2 DynamoDB Tables, called waqqlydog and waqqlywalker, both with the primaryKey 'id'
3. Create a new AWS Lambda function, with python 3.12, copying the contents of ./aws/lambda/waqqlyCRUD.py into the lambda function. Also create the needed AWS Lambda User Policy and Role, with full lambda and dynamodb accesses. Make sure the policy grant's access to the 2 databases you just created, specified by ARN.
4. Create a new AWS API Gateway, specifically the REST API gateway, and under it, create a Resource called DynamoDBManager. Under this, create POST and OPTIONS methods, and configure any necessary CORS settings here. Deploy the API Gateway.
5. Return to the lambda, and add the API gateway you jsut created as a trigger for it.
6. Fork this repository on github
7. Edit the AWS_API_GATEWAY and AWS_API_GATEAWY2 variables in the manage functions in the js folder to match the new API Gateway deployed
8. Set up a new AWS Amplify Web hosting, linking it to the forked Github Repo with the integration, and selecting the main branch.
9. Deploy the webpage.
