export interface PressureSummary {
  max: number;
  avg: number;
}

export interface PressureReading {
  id: string;
  timestamp: string;
  left: number[];
  right: number[];
  summary: PressureSummary;
}

export interface GaitMetric {
  id: string;
  label: string;
  score: number;
}

export interface ActivityMetric {
  id: string;
  day: string;
  steps: number;
  compliance: number;
}

export interface RehabSession {
  id: string;
  title: string;
  duration: number;
  completed: boolean;
  focusArea: string;
}

export interface AlertItem {
  id: string;
  patientName: string;
  message: string;
  severity: 'info' | 'warning' | 'critical';
  time: string;
}



