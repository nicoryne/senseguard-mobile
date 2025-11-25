import { mockPressureReadings } from '../data/mockData';

export const fetchLatestPressure = async () => mockPressureReadings[0];

export const fetchPressureHistory = async () => mockPressureReadings;

