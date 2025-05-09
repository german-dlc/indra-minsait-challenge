import { getConnection } from "./db";

export async function saveAppointmentToRDS({
  appointmentId,
  insuredId,
  scheduleId,
  countryISO,
}: {
  appointmentId: string;
  insuredId: string;
  scheduleId: number;
  countryISO: string;
}) {
  const conn = await getConnection();

  await conn.execute(
    `INSERT INTO appointments (appointment_id, insured_id, schedule_id, country_iso, status, created_at)
     VALUES (?, ?, ?, ?, ?, NOW())`,
    [appointmentId, insuredId, scheduleId, countryISO, "confirmed"]
  );

  await conn.end();
}
