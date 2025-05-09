import { APIGatewayProxyResult } from "aws-lambda";
import { getAllAppointments } from "../../infra/dynamodb/getAllAppointments";

export const handler = async (): Promise<APIGatewayProxyResult> => {
  try {
    const appointments = await getAllAppointments();
    return {
      statusCode: 200,
      body: JSON.stringify(appointments),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to fetch appointments" }),
    };
  }
};
