import {
  mockAlerts,
  mockConnectionRequests,
  mockPatients,
  mockPressureReadings,
  mockReports,
} from '../../data/mockData';
import { PressureReading } from '../../types/sensor';
import { PatientSummary, UserProfile } from '../../types/user';

export const getUserProfile = async (userId: string): Promise<UserProfile | undefined> => {
  return mockPatients.find((patient) => patient.id === userId);
};

export const getPressureHistory = async (_userId: string): Promise<PressureReading[]> => {
  return mockPressureReadings;
};

export const getPatientList = async (): Promise<PatientSummary[]> => {
  return mockPatients;
};

export const getAlerts = async () => mockAlerts;

export const getConnectionRequests = async () => mockConnectionRequests;

export const getReports = async () => mockReports;

