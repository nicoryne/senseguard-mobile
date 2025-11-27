import { useState, useEffect, useRef } from 'react';
import { SensorNotification } from '@/components/ui/NotificationBanner';

interface UseSensorNotificationsProps {
  temperature: { leftFoot: number; rightFoot: number; baselineLeft: number; baselineRight: number };
  pressure: { max: number; avg: number; left: number[]; right: number[] };
  vptActive: boolean;
  vptIntensity: number;
  gaitAsymmetry?: number; // 0-100, higher = more asymmetry
}

export const useSensorNotifications = ({
  temperature,
  pressure,
  vptActive,
  vptIntensity,
  gaitAsymmetry = 0,
}: UseSensorNotificationsProps) => {
  const [currentNotification, setCurrentNotification] = useState<SensorNotification | null>(null);
  const [notificationQueue, setNotificationQueue] = useState<SensorNotification[]>([]);
  const lastVPTNotificationRef = useRef<number>(0);
  const lastHotspotNotificationRef = useRef<number>(0);
  const lastGaitNotificationRef = useRef<number>(0);
  const lastVPTIntensityRef = useRef<number>(0);

  // Check for VPT sensor activation (when intensity changes or becomes active)
  useEffect(() => {
    if (vptActive && vptIntensity > 0) {
      const now = Date.now();
      const intensityChanged = lastVPTIntensityRef.current !== vptIntensity;
      
      // Notify when VPT is first activated or when intensity changes significantly
      if (intensityChanged && (now - lastVPTNotificationRef.current > 2000)) {
        const notification: SensorNotification = {
          id: `vpt-${now}`,
          type: 'vpt',
          message: `VPT sensor activated at ${vptIntensity}% intensity. The insole sent a micro-vibration to your sole. Did you feel it?`,
          severity: 'info',
          timestamp: new Date(),
        };
        addNotification(notification);
        lastVPTNotificationRef.current = now;
        lastVPTIntensityRef.current = vptIntensity;
      }
    } else {
      lastVPTIntensityRef.current = 0;
    }
  }, [vptActive, vptIntensity]);

  // Check for hotspot (temperature + pressure spike)
  useEffect(() => {
    const tempDiff = Math.abs(temperature.rightFoot - temperature.baselineRight);
    const pressureSpike = pressure.right[3] > 380 || pressure.right[4] > 360; // Forefoot pressure zones

    if (tempDiff > 1.2 && pressureSpike) {
      const now = Date.now();
      // Only notify if it's been at least 5 seconds since last hotspot notification
      if (now - lastHotspotNotificationRef.current > 5000) {
        const notification: SensorNotification = {
          id: `hotspot-${now}`,
          type: 'hotspot',
          message: `Hotspot detected! Temperature rise (${tempDiff.toFixed(1)}°C) and pressure spike detected on right foot. Potential ulcer formation.`,
          severity: 'warning',
          timestamp: new Date(),
        };
        addNotification(notification);
        lastHotspotNotificationRef.current = now;
      }
    }
  }, [temperature, pressure]);

  // Check for gait asymmetry (fall risk)
  useEffect(() => {
    if (gaitAsymmetry > 25) {
      const now = Date.now();
      // Only notify if it's been at least 8 seconds since last gait notification
      if (now - lastGaitNotificationRef.current > 8000) {
        const severity: 'warning' | 'critical' = gaitAsymmetry > 50 ? 'critical' : 'warning';
        const notification: SensorNotification = {
          id: `gait-${now}`,
          type: 'fall-risk',
          message: `Gait asymmetry detected (${gaitAsymmetry.toFixed(0)}%). Increased fall risk identified.`,
          severity,
          timestamp: new Date(),
        };
        addNotification(notification);
        lastGaitNotificationRef.current = now;
      }
    }
  }, [gaitAsymmetry]);

  // Check for high temperature alone
  useEffect(() => {
    const leftTempDiff = Math.abs(temperature.leftFoot - temperature.baselineLeft);
    const rightTempDiff = Math.abs(temperature.rightFoot - temperature.baselineRight);
    const maxDiff = Math.max(leftTempDiff, rightTempDiff);

    if (maxDiff > 1.5 && maxDiff < 2.0) {
      const foot = leftTempDiff > rightTempDiff ? 'left' : 'right';
      const notification: SensorNotification = {
        id: `temp-${Date.now()}`,
        type: 'temperature',
        message: `Elevated temperature detected on ${foot} foot (${maxDiff.toFixed(1)}°C above baseline). Monitor for inflammation.`,
        severity: 'warning',
        timestamp: new Date(),
      };
      addNotification(notification);
    }
  }, [temperature]);

  // Check for high pressure alone
  useEffect(() => {
    if (pressure.max > 450) {
      const notification: SensorNotification = {
        id: `pressure-${Date.now()}`,
        type: 'pressure',
        message: `High pressure detected (${pressure.max} kPa). Consider adjusting weight distribution.`,
        severity: 'warning',
        timestamp: new Date(),
      };
      addNotification(notification);
    }
  }, [pressure.max]);

  const addNotification = (notification: SensorNotification) => {
    if (!currentNotification) {
      setCurrentNotification(notification);
    } else {
      setNotificationQueue((prev) => [...prev, notification]);
    }
  };

  const dismissNotification = () => {
    setCurrentNotification(null);
    // Show next notification in queue after a brief delay
    setTimeout(() => {
      setNotificationQueue((prev) => {
        if (prev.length > 0) {
          const next = prev[0];
          setCurrentNotification(next);
          return prev.slice(1);
        }
        return prev;
      });
    }, 300);
  };

  // Manual trigger functions for demo purposes
  const triggerVPTNotification = () => {
    const notification: SensorNotification = {
      id: `vpt-manual-${Date.now()}`,
      type: 'vpt',
      message: `VPT sensor activated at ${vptIntensity || 50}% intensity. The insole sent a micro-vibration to your sole. Did you feel it?`,
      severity: 'info',
      timestamp: new Date(),
    };
    addNotification(notification);
  };

  const triggerHotspotNotification = () => {
    const tempDiff = Math.abs(temperature.rightFoot - temperature.baselineRight);
    const notification: SensorNotification = {
      id: `hotspot-manual-${Date.now()}`,
      type: 'hotspot',
      message: `Hotspot detected! Temperature rise (${tempDiff.toFixed(1)}°C) and pressure spike detected on right foot. Potential ulcer formation.`,
      severity: 'warning',
      timestamp: new Date(),
    };
    addNotification(notification);
  };

  const triggerGaitNotification = () => {
    const severity: 'warning' | 'critical' = gaitAsymmetry > 50 ? 'critical' : 'warning';
    const notification: SensorNotification = {
      id: `gait-manual-${Date.now()}`,
      type: 'fall-risk',
      message: `Gait asymmetry detected (${gaitAsymmetry.toFixed(0)}%). Increased fall risk identified.`,
      severity,
      timestamp: new Date(),
    };
    addNotification(notification);
  };

  const triggerTemperatureNotification = () => {
    const leftTempDiff = Math.abs(temperature.leftFoot - temperature.baselineLeft);
    const rightTempDiff = Math.abs(temperature.rightFoot - temperature.baselineRight);
    const maxDiff = Math.max(leftTempDiff, rightTempDiff);
    const foot = leftTempDiff > rightTempDiff ? 'left' : 'right';
    const notification: SensorNotification = {
      id: `temp-manual-${Date.now()}`,
      type: 'temperature',
      message: `Elevated temperature detected on ${foot} foot (${maxDiff.toFixed(1)}°C above baseline). Monitor for inflammation.`,
      severity: 'warning',
      timestamp: new Date(),
    };
    addNotification(notification);
  };

  const triggerPressureNotification = () => {
    const notification: SensorNotification = {
      id: `pressure-manual-${Date.now()}`,
      type: 'pressure',
      message: `High pressure detected (${pressure.max} kPa). Consider adjusting weight distribution.`,
      severity: 'warning',
      timestamp: new Date(),
    };
    addNotification(notification);
  };

  return {
    currentNotification,
    dismissNotification,
    triggerVPTNotification,
    triggerHotspotNotification,
    triggerGaitNotification,
    triggerTemperatureNotification,
    triggerPressureNotification,
  };
};

