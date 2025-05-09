import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";

const sns = new SNSClient({});

export async function publishToSNS(message: object, countryISO: string) {
  await sns.send(
    new PublishCommand({
      TopicArn: process.env.SNS_TOPIC_ARN!,
      Message: JSON.stringify(message),
      MessageAttributes: {
        countryISO: {
          DataType: "String",
          StringValue: countryISO,
        },
      },
    })
  );
}
