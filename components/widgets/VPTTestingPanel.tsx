import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { COLORS } from '../../lib/colors';
import { FONTS } from '../../lib/fonts';

interface VPTTestingPanelProps {
  currentVPT?: number; // Vibration Perception Threshold score
  lastTestDate?: Date;
  onTestPress?: () => void;
  isTesting?: boolean;
  nerveHealthScore?: number; // 0-100
}

const VPTTestingPanel: React.FC<VPTTestingPanelProps> = ({
  currentVPT = 12.5,
  lastTestDate,
  onTestPress,
  isTesting = false,
  nerveHealthScore = 75,
}) => {
  const [testInProgress, setTestInProgress] = useState(false);

  const handleTest = () => {
    setTestInProgress(true);
    if (onTestPress) {
      onTestPress();
    }
    // Simulate test duration
    setTimeout(() => {
      setTestInProgress(false);
    }, 3000);
  };

  const getNerveHealthColor = (score: number) => {
    if (score >= 80) return COLORS.success;
    if (score >= 60) return COLORS.warning;
    return COLORS.error;
  };

  const getNerveHealthLabel = (score: number) => {
    if (score >= 80) return 'Good';
    if (score >= 60) return 'Moderate';
    return 'Poor';
  };

  const healthColor = getNerveHealthColor(nerveHealthScore);
  const healthLabel = getNerveHealthLabel(nerveHealthScore);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Ionicons name="pulse" size={20} color={COLORS.primary} />
          <Text style={styles.title}>Nerve Test (VPT)</Text>
        </View>
        <View style={[styles.healthBadge, { backgroundColor: `${healthColor}15` }]}>
          <View style={[styles.healthDot, { backgroundColor: healthColor }]} />
          <Text style={[styles.healthText, { color: healthColor }]}>{healthLabel}</Text>
        </View>
      </View>

      {/* VPT Score Display */}
      <View style={styles.scoreContainer}>
        <View style={styles.scoreCircle}>
          <Text style={styles.scoreValue}>{currentVPT.toFixed(1)}</Text>
          <Text style={styles.scoreUnit}>VPT</Text>
        </View>
        <View style={styles.scoreInfo}>
          <Text style={styles.scoreLabel}>Current Threshold</Text>
          <Text style={styles.scoreDescription}>
            Lower values indicate better nerve function
          </Text>
          {lastTestDate && (
            <Text style={styles.lastTest}>
              Last test: {lastTestDate.toLocaleDateString()}
            </Text>
          )}
        </View>
      </View>

      {/* Nerve Health Progress */}
      <View style={styles.healthContainer}>
        <View style={styles.healthHeader}>
          <Text style={styles.healthLabel}>Nerve Health Score</Text>
          <Text style={[styles.healthValue, { color: healthColor }]}>
            {nerveHealthScore}%
          </Text>
        </View>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${nerveHealthScore}%`, backgroundColor: healthColor },
            ]}
          />
        </View>
      </View>

      {/* Test Button */}
      <Pressable
        style={[styles.testButton, (testInProgress || isTesting) && styles.testButtonActive]}
        onPress={handleTest}
        disabled={testInProgress || isTesting}
      >
        {testInProgress || isTesting ? (
          <>
            <ActivityIndicator size="small" color={COLORS.neutral.lightest} />
            <Text style={styles.testButtonText}>Testing in progress...</Text>
          </>
        ) : (
          <>
            <Ionicons name="radio-button-on" size={24} color={COLORS.neutral.lightest} />
            <Text style={styles.testButtonText}>Run VPT Test</Text>
          </>
        )}
      </Pressable>

      <View style={styles.infoContainer}>
        <Ionicons name="information-circle-outline" size={16} color={COLORS.neutral.medium} />
        <Text style={styles.infoText}>
          The insole sends micro-vibrations to test your Vibration Perception Threshold,
          tracking neuropathy progression daily
        </Text>
      </View>

      {/* Daily Tracking Indicator */}
      <View style={styles.trackingContainer}>
        <Ionicons name="calendar-outline" size={16} color={COLORS.primary} />
        <Text style={styles.trackingText}>
          Daily nerve health logging active
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
    borderLeftColor: COLORS.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
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
  healthBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
  },
  healthDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  healthText: {
    ...FONTS.caption,
    fontWeight: '600',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 16,
  },
  scoreCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.surface.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: COLORS.primary,
  },
  scoreValue: {
    ...FONTS.h2,
    color: COLORS.primary,
    fontWeight: '700',
  },
  scoreUnit: {
    ...FONTS.caption,
    color: COLORS.neutral.medium,
    marginTop: 4,
  },
  scoreInfo: {
    flex: 1,
  },
  scoreLabel: {
    ...FONTS.body,
    color: COLORS.neutral.dark,
    fontWeight: '600',
    marginBottom: 4,
  },
  scoreDescription: {
    ...FONTS.bodySmall,
    color: COLORS.neutral.medium,
    marginBottom: 8,
  },
  lastTest: {
    ...FONTS.caption,
    color: COLORS.neutral.medium,
  },
  healthContainer: {
    marginBottom: 20,
  },
  healthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  healthLabel: {
    ...FONTS.bodySmall,
    color: COLORS.neutral.medium,
  },
  healthValue: {
    ...FONTS.h3,
    fontWeight: '700',
  },
  progressBar: {
    height: 8,
    backgroundColor: COLORS.surface.secondary,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  testButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    gap: 8,
    marginBottom: 16,
  },
  testButtonActive: {
    opacity: 0.7,
  },
  testButtonText: {
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
    marginBottom: 12,
  },
  infoText: {
    ...FONTS.caption,
    color: COLORS.neutral.medium,
    flex: 1,
    lineHeight: 16,
  },
  trackingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    backgroundColor: `${COLORS.primary}10`,
    borderRadius: 8,
  },
  trackingText: {
    ...FONTS.bodySmall,
    color: COLORS.primary,
    fontWeight: '600',
  },
});

export default VPTTestingPanel;

