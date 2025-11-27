import { useState, useEffect, useRef } from 'react';

interface TemperatureData {
  leftFoot: number;
  rightFoot: number;
  baselineLeft: number;
  baselineRight: number;
}

// Simulate temperature readings with realistic variations
export const useTemperatureData = (isActive: boolean = true) => {
  const [temperature, setTemperature] = useState<TemperatureData>({
    leftFoot: 32.5,
    rightFoot: 32.8,
    baselineLeft: 32.5,
    baselineRight: 32.8,
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeRef = useRef(0);

  useEffect(() => {
    if (!isActive) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      timeRef.current += 1;

      // Simulate normal temperature variations (±0.3°C)
      const baseVariation = (Math.sin(timeRef.current * 0.1) * 0.3);
      
      // Simulate occasional temperature spikes (hotspot simulation)
      // Every ~30 seconds, simulate a potential hotspot on one foot
      const hotspotChance = timeRef.current % 60;
      let leftTemp = temperature.baselineLeft + baseVariation;
      let rightTemp = temperature.baselineRight + baseVariation;

      if (hotspotChance > 55 && hotspotChance < 60) {
        // Simulate hotspot on right foot (ball of foot)
        rightTemp += 1.5 + Math.random() * 0.5; // 1.5-2.0°C increase
      }

      // Add small random noise
      leftTemp += (Math.random() - 0.5) * 0.2;
      rightTemp += (Math.random() - 0.5) * 0.2;

      setTemperature((prev) => ({
        ...prev,
        leftFoot: Math.round(leftTemp * 10) / 10,
        rightFoot: Math.round(rightTemp * 10) / 10,
      }));
    }, 1000); // Update every second

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, temperature.baselineLeft, temperature.baselineRight]);

  return temperature;
};

