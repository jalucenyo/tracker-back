import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from '@aws-sdk/util-dynamodb';
import { v4 as uuid } from 'uuid';

const ddbClient = process.env.AWS_SAM_LOCAL ?
    new DynamoDBClient({ endpoint: 'http://dynamodb:8000' }) :
    new DynamoDBClient();
const tableName = process.env.LOCATION_LOG_TABLE;

export const locationPersistHandler = async (event, context) => {

    console.log(JSON.stringify(event));

    const document = {
        TableName: tableName,
        Item: marshall({
            id: uuid(),
            raw: "",
            serialNumber: "",
            datetime: "",
            latitude: "",
            longitude: "",
            quality: "",
            speed: ""
        })
    };

    console.log(`Save location in database: ${JSON.stringify(document)}`)
    await ddbClient.send(new PutItemCommand(document));

    // event.Records.forEach((record) => {
    //     console.log(JSON.stringify(record));
    // });

};
