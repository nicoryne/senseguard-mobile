import { useMemo } from 'react';

import { mockActivityData, mockGaitMetrics } from '../lib/mock-data';

export const useGaitData = () => {
  const metrics = useMemo(() => mockGaitMetrics, []);
  const activity = useMemo(() => mockActivityData, []);

  return { metrics, activity };
};



