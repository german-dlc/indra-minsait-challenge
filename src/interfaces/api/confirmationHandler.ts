import { SQSEvent } from "aws-lambda";
import { markAppointmentAsCompleted } from "../../infra/dynamodb/updateAppointmentStatus";

export const handler = async (event: SQSEvent) => {
  for (const record of event.Records) {
    const body = JSON.parse(record.body);
    const { appointmentId, insuredId } = body;

    await markAppointmentAsCompleted(appointmentId, insuredId);
  }

  return { statusCode: 200 };
};
