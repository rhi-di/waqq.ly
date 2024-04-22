import boto3
import json

def lambda_handler(event, context):
    
    # define the functions used to perform the CRUD operations

    operation = event['operation']
    tableName = event['tableName']
    
    dynamo = boto3.resource('dynamodb').Table(tableName)
    


    def ddb_create(x):
        dynamo.put_item(**x)

    def ddb_read(x):
        return dynamo.get_item(**x)
    
    def ddb_readall(x):
        return dynamo.scan()
        
    def ddb_update(x):
        dynamo.update_item(**x)
        
    def ddb_delete(x):
        dynamo.delete_item(**x)

    def echo(x):
        return x
        
    operations = {
        'create': ddb_create,
        'read': ddb_read,
        'update': ddb_update,
        'delete': ddb_delete,
        'echo': echo,
        'getAll': ddb_readall,
    }

    if operation in operations:
        return operations[operation](event.get('payload'))
    else:
        raise ValueError('Unrecognized operation "{}"'.format(operation))