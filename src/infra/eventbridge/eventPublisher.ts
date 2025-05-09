import { EventBridgeClient, PutEventsCommand } from "@aws-sdk/client-eventbridge";

const client = new EventBridgeClient({});

export async function publishConfirmationEvent(event: any) {
  await client.send(
    new PutEventsCommand({
      Entries: [
        {
          Source: "appointment.processor",
          DetailType: "AppointmentConfirmed",
          Detail: JSON.stringify(event),
          EventBusName: "default",
        },
      ],
    })
  );
}
