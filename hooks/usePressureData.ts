import { useMemo } from 'react';

import { mockPressureReadings } from '../lib/mock-data';
import { PressureReading } from '../types/sensor';

export const usePressureData = () => {
  const latest = useMemo<PressureReading | null>(() => {
    if (!mockPressureReadings.length) {
      return null;
    }
    return mockPressureReadings[0];
  }, []);

  return {
    latest,
    history: mockPressureReadings,
  };
};



