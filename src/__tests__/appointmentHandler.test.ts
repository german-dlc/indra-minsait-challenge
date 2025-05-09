import { handler } from "../interfaces/api/postAppointment";
import * as repository from "../infra/dynamodb/appointmentRepository";
import * as snsService from "../infra/sns/snsPublisher";

jest.mock("../infra/dynamodb/appointmentRepository");
jest.mock("../infra/sns/snsPublisher");

const mockSaveAppointment = repository.saveAppointment as jest.Mock;
const mockPublishToSNS = snsService.publishToSNS as jest.Mock;

describe("POST /appointments", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("retorna 400 si faltan campos", async () => {
    const event = {
      body: JSON.stringify({ insuredId: "00001", scheduleId: 1 }), // falta countryISO
    };

    const response = await handler(event as any);
    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.body).message).toBe("countryISO inválido");
  });

  it("retorna 400 si countryISO es inválido", async () => {
    const event = {
      body: JSON.stringify({ insuredId: "00001", scheduleId: 1, countryISO: "BR" }),
    };

    const response = await handler(event as any);
    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.body).message).toBe("countryISO inválido");
  });

  it("guarda en DynamoDB y publica en SNS si es válido", async () => {
    mockSaveAppointment.mockResolvedValue(0);
    mockPublishToSNS.mockResolvedValue(true);

    const event = {
      body: JSON.stringify({ insuredId: "00001", scheduleId: 1, countryISO: "PE" }),
    };

    const response = await handler(event as any);

    expect(response.statusCode).toBe(202);
    expect(mockSaveAppointment).toHaveBeenCalled();
    expect(mockPublishToSNS).toHaveBeenCalledWith(expect.objectContaining({
      insuredId: "00001",
      scheduleId: 1,
      countryISO: "PE",
      appointmentId: 0,
    }), "PE");
  });
});
