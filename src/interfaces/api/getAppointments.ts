import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { getAppointmentsByInsuredId } from "../../infra/dynamodb/getAppointmentsByInsuredId";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const insuredId = event.pathParameters?.insuredId;

  if (!insuredId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "insuredId es requerido" }),
    };
  }

  const appointments = await getAppointmentsByInsuredId(insuredId);

  return {
    statusCode: 200,
    body: JSON.stringify(appointments),
  };
};
