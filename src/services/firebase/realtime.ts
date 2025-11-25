import { mockPressureReadings } from '../../data/mockData';
import { PressureReading } from '../../types/sensor';

type Listener = (data: PressureReading[]) => void;

const listeners = new Set<Listener>();

export const subscribeToLivePressure = (listener: Listener) => {
  listeners.add(listener);
  listener(mockPressureReadings);
  return () => listeners.delete(listener);
};

