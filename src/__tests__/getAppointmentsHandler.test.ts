import { handler } from "../interfaces/api/getAppointments";
import * as repository from "../infra/dynamodb/getAppointmentsByInsuredId";

jest.mock("../infra/dynamodb/getAppointmentsByInsuredId");

const mockGetAppointments = repository.getAppointmentsByInsuredId as jest.Mock;

describe("GET /appointments/{insuredId}", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("retorna 400 si insuredId no está en el path", async () => {
    const event = { pathParameters: {} };

    const response = await handler(event as any);
    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.body).message).toBe("insuredId es requerido");
  });

  it("retorna 200 y una lista vacía si no hay citas", async () => {
    mockGetAppointments.mockResolvedValue([]);

    const event = { pathParameters: { insuredId: "00001" } };
    const response = await handler(event as any);

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toEqual([]);
  });

  it("retorna 200 y lista de citas si existen registros", async () => {
    const fakeAppointments = [
      {
        appointmentId: "uuid-123",
        scheduleId: 101,
        status: "pending",
        countryISO: "CL",
        createdAt: "2024-04-01T10:00:00Z",
        updatedAt: "2024-04-01T10:00:00Z",
      },
    ];

    mockGetAppointments.mockResolvedValue(fakeAppointments);

    const event = { pathParameters: { insuredId: "00001" } };
    const response = await handler(event as any);

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toEqual(fakeAppointments);
    expect(mockGetAppointments).toHaveBeenCalledWith("00001");
  });
});
