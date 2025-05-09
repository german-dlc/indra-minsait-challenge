import { DynamoDBClient, QueryCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({});

export async function getAppointmentsByInsuredId(insuredId: string) {
  const response = await client.send(
    new QueryCommand({
      TableName: process.env.DYNAMODB_TABLE!,
      KeyConditionExpression: "insuredId = :insuredId",
      ExpressionAttributeValues: {
        ":insuredId": { S: insuredId },
      },
    })
  );

  return response.Items?.map((item) => ({
    appointmentId: item.appointmentId?.S,
    scheduleId: Number(item.scheduleId?.N),
    status: item.status?.S,
    countryISO: item.countryISO?.S,
    createdAt: item.createdAt?.S,
    updatedAt: item.updatedAt?.S,
  })) || [];
}
