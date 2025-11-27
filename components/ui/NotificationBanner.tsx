import { View, Text, Animated, TouchableOpacity } from 'react-native';
import { useEffect, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';

export interface SensorNotification {
  id: string;
  type: 'gait' | 'temperature' | 'pressure' | 'vpt' | 'hotspot' | 'fall-risk';
  message: string;
  severity: 'info' | 'warning' | 'critical';
  timestamp: Date;
}

interface NotificationBannerProps {
  notification: SensorNotification | null;
  onDismiss: () => void;
  autoHideDuration?: number;
}

export default function NotificationBanner({
  notification,
  onDismiss,
  autoHideDuration = 5000,
}: NotificationBannerProps) {
  const slideAnim = useRef(new Animated.Value(-100)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (notification) {
      // Slide in
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
          tension: 50,
          friction: 8,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Auto hide after duration
      const timer = setTimeout(() => {
        handleDismiss();
      }, autoHideDuration);

      return () => clearTimeout(timer);
    } else {
      handleDismiss();
    }
  }, [notification]);

  const handleDismiss = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDismiss();
    });
  };

  if (!notification) return null;

  const getIcon = () => {
    switch (notification.type) {
      case 'gait':
        return 'footsteps';
      case 'temperature':
        return 'thermometer';
      case 'pressure':
        return 'speedometer';
      case 'vpt':
        return 'pulse';
      case 'hotspot':
        return 'flame';
      case 'fall-risk':
        return 'warning';
      default:
        return 'notifications';
    }
  };

  const getColor = () => {
    switch (notification.severity) {
      case 'critical':
        return '#EF4444';
      case 'warning':
        return '#F59E0B';
      case 'info':
        return '#4982BB';
      default:
        return '#6B7280';
    }
  };

  const getBackgroundColor = () => {
    switch (notification.severity) {
      case 'critical':
        return '#FEE2E2';
      case 'warning':
        return '#FEF3C7';
      case 'info':
        return '#DBEAFE';
      default:
        return '#F3F4F6';
    }
  };

  return (
    <Animated.View
      style={{
        transform: [{ translateY: slideAnim }],
        opacity: opacityAnim,
        width: '100%',
      }}
    >
      <View
        style={{
          backgroundColor: getBackgroundColor(),
          borderBottomWidth: 2,
          borderBottomColor: getColor(),
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderRadius: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 5,
        }}
      >
        <View className="flex-row items-center">
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: `${getColor()}20`,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 12,
            }}
          >
            <Ionicons name={getIcon() as any} size={20} color={getColor()} />
          </View>
          <View className="flex-1">
            <Text
              className="text-sm font-semibold"
              style={{ color: getColor(), fontFamily: 'Inter' }}
            >
              {notification.severity === 'critical'
                ? 'Critical Alert'
                : notification.severity === 'warning'
                ? 'Warning'
                : 'Sensor Alert'}
            </Text>
            <Text
              className="text-sm mt-1"
              style={{ color: '#2A2D34', fontFamily: 'Roboto' }}
            >
              {notification.message}
            </Text>
          </View>
          <TouchableOpacity onPress={handleDismiss} className="ml-2">
            <Ionicons name="close" size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
}

