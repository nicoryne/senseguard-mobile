export type UserRole = 'patient' | 'caregiver';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  location?: string;
}

export interface PatientSummary extends UserProfile {
  status: 'active' | 'inactive';
  maxPressure: number;
  avgPressure: number;
  riskLevel: 'low' | 'medium' | 'high';
}

export interface CaregiverProfile extends UserProfile {
  specialization?: string;
  patientsManaged?: number;
}

