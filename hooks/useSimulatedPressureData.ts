import { useState, useEffect, useRef } from 'react';
import { PressureReading } from '@/types/sensor';

// Simulate dynamic pressure readings
export const useSimulatedPressureData = (isActive: boolean = true) => {
  const [pressureData, setPressureData] = useState<PressureReading>({
    id: 'sim-001',
    timestamp: new Date().toISOString(),
    left: [120, 180, 240, 300, 260, 200],
    right: [140, 210, 260, 320, 280, 220],
    summary: { max: 510, avg: 295 },
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeRef = useRef(0);
  const baseLeftRef = useRef([120, 180, 240, 300, 260, 200]);
  const baseRightRef = useRef([140, 210, 260, 320, 280, 220]);

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

      // Simulate walking pattern with pressure variations
      const walkCycle = Math.sin(timeRef.current * 0.2) * 0.3 + 0.7; // 0.4 to 1.0
      
      // Simulate occasional pressure spikes (friction spike simulation)
      // Every ~25 seconds, simulate increased pressure on ball of foot
      const spikeChance = timeRef.current % 50;
      let leftPressures = [...baseLeftRef.current];
      let rightPressures = [...baseRightRef.current];

      // Apply walking cycle variation
      leftPressures = leftPressures.map((p, i) => {
        const variation = (Math.random() - 0.5) * 20;
        return Math.max(0, Math.round((p * walkCycle) + variation));
      });
      rightPressures = rightPressures.map((p, i) => {
        const variation = (Math.random() - 0.5) * 20;
        return Math.max(0, Math.round((p * walkCycle) + variation));
      });

      // Simulate pressure spike on forefoot (index 3 and 4) for hotspot
      if (spikeChance > 45 && spikeChance < 50) {
        rightPressures[3] = Math.min(450, rightPressures[3] + 80 + Math.random() * 40);
        rightPressures[4] = Math.min(450, rightPressures[4] + 60 + Math.random() * 30);
      }

      // Calculate summary
      const allPressures = [...leftPressures, ...rightPressures];
      const max = Math.max(...allPressures);
      const avg = allPressures.reduce((a, b) => a + b, 0) / allPressures.length;

      setPressureData({
        id: 'sim-001',
        timestamp: new Date().toISOString(),
        left: leftPressures,
        right: rightPressures,
        summary: { max: Math.round(max), avg: Math.round(avg) },
      });
    }, 1000); // Update every second

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive]);

  return pressureData;
};

