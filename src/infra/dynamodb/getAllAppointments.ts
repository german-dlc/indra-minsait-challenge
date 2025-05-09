import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({});

export async function getAllAppointments() {
  try {
    const result = await client.send(
      new ScanCommand({
        TableName: process.env.DYNAMODB_TABLE!,
      })
    );

    return result.Items || [];
  } catch (error) {
    console.error("Error fetching appointments:", error);
    throw new Error("Failed to fetch appointments");
  }
}