import { SQSEvent } from "aws-lambda";
import { saveAppointmentToRDS } from "../../infra/mysql/appointmentRepository";
import { publishConfirmationEvent } from "../../infra/eventbridge/eventPublisher";

export const handler = async (event: SQSEvent) => {
  for (const record of event.Records) {
    const body = JSON.parse(record.body);
    const { appointmentId, insuredId, scheduleId, countryISO } = body;

    await saveAppointmentToRDS({ appointmentId, insuredId, scheduleId, countryISO });
    await publishConfirmationEvent(body);
  }

  return { statusCode: 200 };
};
