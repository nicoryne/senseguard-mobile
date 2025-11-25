import { useMemo } from 'react';

import {
  mockAlerts,
  mockConnectionRequests,
  mockPatients,
  mockReports,
} from '../lib/mock-data';

export const useCaregiverData = () => {
  const patients = useMemo(() => mockPatients, []);
  const alerts = useMemo(() => mockAlerts, []);
  const requests = useMemo(() => mockConnectionRequests, []);
  const reports = useMemo(() => mockReports, []);

  return {
    patients,
    alerts,
    requests,
    reports,
  };
};



