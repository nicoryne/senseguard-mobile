import { useMemo } from 'react';

import { mockPressureReadings } from '../data/mockData';
import { PressureReading } from '../types/sensor';

export const usePressureData = () => {
  const latest = useMemo<PressureReading | null>(() => {
    if (!mockPressureReadings.length) {
      return null;
    }
    return mockPressureReadings[0];
  }, []);

  const history = useMemo(() => mockPressureReadings, []);

  return {
    latest,
    history,
  };
};

