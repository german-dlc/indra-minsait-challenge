import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({});

export async function markAppointmentAsCompleted(
  appointmentId: string,
  insuredId: string
) {
  await client.send(
    new UpdateItemCommand({
      TableName: process.env.DYNAMODB_TABLE!,
      Key: {
        insuredId: { S: insuredId },
        appointmentId: { S: appointmentId },
      },
      UpdateExpression: "SET #status = :status, updatedAt = :now",
      ExpressionAttributeNames: {
        "#status": "status",
      },
      ExpressionAttributeValues: {
        ":status": { S: "completed" },
        ":now": { S: new Date().toISOString() },
      },
    })
  );
}
