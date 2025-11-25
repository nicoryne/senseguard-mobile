export interface ConnectionRequest {
  id: string;
  caregiverName: string;
  patientName: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface ReportEntry {
  id: string;
  title: string;
  createdAt: string;
  summary: string;
}

