import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Slider } from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons';

import { COLORS } from '../../lib/colors';
import { FONTS } from '../../lib/fonts';

interface RehabVibrationControlProps {
  intensity?: number; // 0-100
  frequency?: number; // Hz
  onIntensityChange?: (value: number) => void;
  onFrequencyChange?: (value: number) => void;
  onStartSession?: () => void;
  isActive?: boolean;
}

const RehabVibrationControl: React.FC<RehabVibrationControlProps> = ({
  intensity = 50,
  frequency = 50,
  onIntensityChange,
  onFrequencyChange,
  onStartSession,
  isActive = false,
}) => {
  const [localIntensity, setLocalIntensity] = useState(intensity);
  const [localFrequency, setLocalFrequency] = useState(frequency);

  const handleIntensityChange = (value: number) => {
    setLocalIntensity(value);
    if (onIntensityChange) {
      onIntensityChange(value);
    }
  };

  const handleFrequencyChange = (value: number) => {
    setLocalFrequency(value);
    if (onFrequencyChange) {
      onFrequencyChange(value);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Ionicons name="settings" size={20} color={COLORS.primary} />
          <Text style={styles.title}>Rehabilitative Vibration</Text>
        </View>
        {isActive && (
          <View style={styles.activeBadge}>
            <View style={styles.activeDot} />
            <Text style={styles.activeText}>Active</Text>
          </View>
        )}
      </View>

      <Text style={styles.description}>
        Personalized microvibrations replace lost nerve feedback for safer walking
      </Text>

      {/* Intensity Control */}
      <View style={styles.controlSection}>
        <View style={styles.controlHeader}>
          <Text style={styles.controlLabel}>Intensity</Text>
          <Text style={styles.controlValue}>{Math.round(localIntensity)}%</Text>
        </View>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={100}
          value={localIntensity}
          onValueChange={handleIntensityChange}
          minimumTrackTintColor={COLORS.primary}
          maximumTrackTintColor={COLORS.surface.secondary}
          thumbTintColor={COLORS.primary}
        />
        <View style={styles.sliderLabels}>
          <Text style={styles.sliderLabel}>Low</Text>
          <Text style={styles.sliderLabel}>Medium</Text>
          <Text style={styles.sliderLabel}>High</Text>
        </View>
      </View>

      {/* Frequency Control */}
      <View style={styles.controlSection}>
        <View style={styles.controlHeader}>
          <Text style={styles.controlLabel}>Frequency</Text>
          <Text style={styles.controlValue}>{Math.round(localFrequency)} Hz</Text>
        </View>
        <Slider
          style={styles.slider}
          minimumValue={10}
          maximumValue={100}
          value={localFrequency}
          onValueChange={handleFrequencyChange}
          minimumTrackTintColor={COLORS.accent}
          maximumTrackTintColor={COLORS.surface.secondary}
          thumbTintColor={COLORS.accent}
        />
        <View style={styles.sliderLabels}>
          <Text style={styles.sliderLabel}>10 Hz</Text>
          <Text style={styles.sliderLabel}>55 Hz</Text>
          <Text style={styles.sliderLabel}>100 Hz</Text>
        </View>
      </View>

      {/* Session Controls */}
      <View style={styles.sessionContainer}>
        <Pressable
          style={[styles.sessionButton, isActive && styles.sessionButtonStop]}
          onPress={onStartSession}
        >
          <Ionicons
            name={isActive ? 'stop-circle' : 'play-circle'}
            size={24}
            color={COLORS.neutral.lightest}
          />
          <Text style={styles.sessionButtonText}>
            {isActive ? 'Stop Session' : 'Start Rehab Session'}
          </Text>
        </Pressable>
      </View>

      {/* Info */}
      <View style={styles.infoContainer}>
        <Ionicons name="information-circle-outline" size={16} color={COLORS.neutral.medium} />
        <Text style={styles.infoText}>
          Based on your gait and pressure data, the insole generates personalized
          rehabilitative vibrations to act as peripheral signals
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface.background,
    borderRadius: 16,
    padding: 20,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.accent,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    ...FONTS.h3,
    color: COLORS.neutral.dark,
  },
  activeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${COLORS.success}15`,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
  },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.success,
  },
  activeText: {
    ...FONTS.caption,
    color: COLORS.success,
    fontWeight: '600',
  },
  description: {
    ...FONTS.bodySmall,
    color: COLORS.neutral.medium,
    marginBottom: 20,
    lineHeight: 20,
  },
  controlSection: {
    marginBottom: 24,
  },
  controlHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  controlLabel: {
    ...FONTS.body,
    color: COLORS.neutral.dark,
    fontWeight: '600',
  },
  controlValue: {
    ...FONTS.h3,
    color: COLORS.primary,
    fontWeight: '700',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  sliderLabel: {
    ...FONTS.caption,
    color: COLORS.neutral.medium,
  },
  sessionContainer: {
    marginBottom: 16,
  },
  sessionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    gap: 8,
  },
  sessionButtonStop: {
    backgroundColor: COLORS.error,
  },
  sessionButtonText: {
    ...FONTS.body,
    color: COLORS.neutral.lightest,
    fontWeight: '600',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.surface.tertiary,
  },
  infoText: {
    ...FONTS.caption,
    color: COLORS.neutral.medium,
    flex: 1,
    lineHeight: 16,
  },
});

export default RehabVibrationControl;

