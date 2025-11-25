import { useMemo } from 'react';

import { mockActivityData, mockGaitMetrics } from '../data/mockData';
import { ActivityMetric, GaitMetric } from '../types/sensor';

export const useGaitData = () => {
  const metrics = useMemo<GaitMetric[]>(() => mockGaitMetrics, []);
  const activity = useMemo<ActivityMetric[]>(() => mockActivityData, []);

  return {
    metrics,
    activity,
  };
};

