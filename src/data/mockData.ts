import { CaregiverProfile, PatientSummary, UserProfile } from '../types/user';
import {
  ActivityMetric,
  AlertItem,
  GaitMetric,
  PressureReading,
  RehabSession,
} from '../types/sensor';
import { ConnectionRequest, ReportEntry } from '../types/session';

export const patientUser: UserProfile = {
  id: 'patient-001',
  name: 'Jordan Miles',
  email: 'patient@senseguard.dev',
  role: 'patient',
  location: 'Austin, TX',
};

export const caregiverUser: UserProfile = {
  id: 'caregiver-001',
  name: 'Dr. Lina Moss',
  email: 'caregiver@senseguard.dev',
  role: 'caregiver',
  location: 'Chicago, IL',
};

export const mockPatients: PatientSummary[] = [
  {
    ...patientUser,
    status: 'active',
    maxPressure: 487,
    avgPressure: 285,
    riskLevel: 'low',
  },
  {
    id: 'patient-002',
    name: 'Ava Patel',
    email: 'ava.patel@senseguard.dev',
    role: 'patient',
    location: 'Denver, CO',
    status: 'active',
    maxPressure: 520,
    avgPressure: 302,
    riskLevel: 'medium',
  },
  {
    id: 'patient-003',
    name: 'Marcus Nguyen',
    email: 'marcus.nguyen@senseguard.dev',
    role: 'patient',
    location: 'Seattle, WA',
    status: 'inactive',
    maxPressure: 350,
    avgPressure: 200,
    riskLevel: 'low',
  },
];

export const mockAlerts: AlertItem[] = [
  {
    id: 'alert-001',
    patientName: 'Ava Patel',
    message: 'High pressure detected at heel',
    severity: 'warning',
    time: '2h ago',
  },
  {
    id: 'alert-002',
    patientName: 'Jordan Miles',
    message: 'Missed rehabilitation session',
    severity: 'info',
    time: '4h ago',
  },
];

export const mockPressureReadings: PressureReading[] = [
  {
    id: 'pr-001',
    timestamp: new Date().toISOString(),
    left: [120, 180, 240, 300, 260, 200],
    right: [140, 210, 260, 320, 280, 220],
    summary: { max: 510, avg: 295 },
  },
  {
    id: 'pr-002',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    left: [110, 170, 230, 280, 250, 210],
    right: [130, 200, 250, 300, 270, 230],
    summary: { max: 487, avg: 275 },
  },
];

export const mockGaitMetrics: GaitMetric[] = [
  { id: 'gm-1', label: 'Stride Symmetry', score: 86 },
  { id: 'gm-2', label: 'Stance Stability', score: 78 },
  { id: 'gm-3', label: 'Cadence Control', score: 90 },
  { id: 'gm-4', label: 'Toe-Off Power', score: 72 },
];

export const mockActivityData: ActivityMetric[] = [
  { id: 'act-1', day: 'Mon', steps: 7200, compliance: 92 },
  { id: 'act-2', day: 'Tue', steps: 6800, compliance: 85 },
  { id: 'act-3', day: 'Wed', steps: 8100, compliance: 94 },
  { id: 'act-4', day: 'Thu', steps: 5400, compliance: 66 },
  { id: 'act-5', day: 'Fri', steps: 9000, compliance: 98 },
  { id: 'act-6', day: 'Sat', steps: 6400, compliance: 76 },
  { id: 'act-7', day: 'Sun', steps: 4000, compliance: 51 },
];

export const mockRehabSessions: RehabSession[] = [
  {
    id: 'rehab-001',
    title: 'Ankle Mobility',
    duration: 12,
    completed: true,
    focusArea: 'Mobility',
  },
  {
    id: 'rehab-002',
    title: 'Toe Flex Exercises',
    duration: 8,
    completed: false,
    focusArea: 'Strength',
  },
  {
    id: 'rehab-003',
    title: 'Balance Board Session',
    duration: 15,
    completed: false,
    focusArea: 'Stability',
  },
];

export const mockConnectionRequests: ConnectionRequest[] = [
  {
    id: 'conn-001',
    caregiverName: 'Dr. Lina Moss',
    patientName: 'Jordan Miles',
    status: 'pending',
  },
  {
    id: 'conn-002',
    caregiverName: 'Dr. Samuel Ortiz',
    patientName: 'Ava Patel',
    status: 'approved',
  },
];

export const mockReports: ReportEntry[] = [
  {
    id: 'report-001',
    title: 'Weekly Gait Overview',
    createdAt: 'Nov 18, 2025',
    summary: 'Improved cadence consistency, moderate heel pressure spikes.',
  },
  {
    id: 'report-002',
    title: 'Pressure & Risk Summary',
    createdAt: 'Nov 11, 2025',
    summary: 'Average plantar pressure within safe range, continue rehab.',
  },
];

export const caregiverProfile: CaregiverProfile = {
  ...caregiverUser,
  specialization: 'Diabetic Foot Care',
  patientsManaged: mockPatients.length,
};

