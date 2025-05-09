import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { randomUUID } from "crypto";

const isOffline = process.env.IS_OFFLINE;

const client = new DynamoDBClient({
  region: isOffline ? 'localhost' : 'us-east-1',
  endpoint: isOffline ? 'http://localhost:8000' : undefined,
});

export async function saveAppointment(input: {
  insuredId: string;
  scheduleId: number;
  countryISO: string;
}) {
  const appointmentId = randomUUID();

  await client.send(
    new PutItemCommand({
      TableName: process.env.DYNAMODB_TABLE!,
      Item: {
        insuredId: { S: input.insuredId },
        appointmentId: { S: appointmentId },
        scheduleId: { N: input.scheduleId.toString() },
        countryISO: { S: input.countryISO },
        status: { S: "pending" },
        createdAt: { S: new Date().toISOString() },
      },
    })
  );

  return 0;
}
