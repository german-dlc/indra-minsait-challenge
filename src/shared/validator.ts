export interface AppointmentRequest {
  insuredId: string;
  scheduleId: number;
  countryISO: 'PE' | 'CL';
}

export function validateAppointmentInput(input: any): AppointmentRequest {
  const { insuredId, scheduleId, countryISO } = input;

  if (typeof insuredId !== 'string' || insuredId.trim() === '') throw new Error('insuredId must be a non-empty string');
  if (typeof scheduleId !== 'number' || isNaN(scheduleId)) throw new Error('scheduleId must be a valid number');
  if (typeof countryISO !== 'string' || !['PE', 'CL'].includes(countryISO)) throw new Error('countryISO must be either "PE" or "CL"');

  return { insuredId, scheduleId, countryISO } as AppointmentRequest;
}
