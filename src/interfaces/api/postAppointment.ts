import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { validateAppointmentInput } from "../../shared/validator";
import { saveAppointment } from "../../infra/dynamodb/appointmentRepository";
import { publishToSNS } from "../../infra/sns/snsPublisher";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const body = JSON.parse(event.body || "{}");
    const input = validateAppointmentInput(body);

    const appointmentId = await saveAppointment(input);

    await publishToSNS({ ...input, appointmentId }, input.countryISO);

    return {
      statusCode: 202,
      body: JSON.stringify({
        message: "Agendamiento en proceso",
        appointmentId,
      }),
    };
  } catch (err: any) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: err.message }),
    };
  }
};
