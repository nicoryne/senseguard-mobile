import { PatientSummary } from './user';

export interface CaregiverPatient extends PatientSummary {
  notes?: string;
}

