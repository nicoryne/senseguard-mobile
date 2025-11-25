import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { COLORS } from '../../lib/colors';
import { FONTS } from '../../lib/fonts';

interface GaitAsymmetryWidgetProps {
  leftFootLoad?: number; // Percentage 0-100
  rightFootLoad?: number; // Percentage 0-100
  asymmetryPercent?: number; // Absolute difference
  fallRisk?: 'low' | 'medium' | 'high';
  symmetryScore?: number; // 0-100
}

const GaitAsymmetryWidget: React.FC<GaitAsymmetryWidgetProps> = ({
  leftFootLoad = 45,
  rightFootLoad = 62,
  asymmetryPercent = 17,
  fallRisk = 'medium',
  symmetryScore = 83,
}) => {
  const getFallRiskColor = () => {
    switch (fallRisk) {
      case 'high':
        return COLORS.error;
      case 'medium':
        return COLORS.warning;
      default:
        return COLORS.success;
    }
  };

  const getFallRiskLabel = () => {
    switch (fallRisk) {
      case 'high':
        return 'High Risk';
      case 'medium':
        return 'Moderate Risk';
      default:
        return 'Low Risk';
    }
  };

  const riskColor = getFallRiskColor();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Ionicons name="walk" size={20} color={COLORS.primary} />
          <Text style={styles.title}>Gait Asymmetry</Text>
        </View>
        <View style={[styles.riskBadge, { backgroundColor: `${riskColor}15` }]}>
          <View style={[styles.riskDot, { backgroundColor: riskColor }]} />
          <Text style={[styles.riskText, { color: riskColor }]}>
            {getFallRiskLabel()}
          </Text>
        </View>
      </View>

      <View style={styles.comparisonContainer}>
        {/* Left Foot */}
        <View style={styles.footColumn}>
          <Text style={styles.footLabel}>Left</Text>
          <View style={styles.barContainer}>
            <View style={styles.barBackground}>
              <View
                style={[
                  styles.barFill,
                  styles.barLeft,
                  { height: `${leftFootLoad}%` },
                ]}
              />
            </View>
          </View>
          <Text style={styles.percentage}>{leftFootLoad}%</Text>
        </View>

        {/* Asymmetry Indicator */}
        <View style={styles.centerColumn}>
          <View style={styles.asymmetryCircle}>
            <Text style={styles.asymmetryValue}>{asymmetryPercent}%</Text>
            <Text style={styles.asymmetryLabel}>Asymmetry</Text>
          </View>
          <View style={styles.symmetryScore}>
            <Text style={styles.symmetryLabel}>Symmetry</Text>
            <Text style={styles.symmetryValue}>{symmetryScore}%</Text>
          </View>
        </View>

        {/* Right Foot */}
        <View style={styles.footColumn}>
          <Text style={styles.footLabel}>Right</Text>
          <View style={styles.barContainer}>
            <View style={styles.barBackground}>
              <View
                style={[
                  styles.barFill,
                  styles.barRight,
                  { height: `${rightFootLoad}%` },
                ]}
              />
            </View>
          </View>
          <Text style={styles.percentage}>{rightFootLoad}%</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Ionicons name="information-circle-outline" size={16} color={COLORS.neutral.medium} />
        <Text style={styles.footerText}>
          AI detects subtle left-right deviations to flag fall risk before it happens
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
  riskBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
  },
  riskDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  riskText: {
    ...FONTS.caption,
    fontWeight: '600',
  },
  comparisonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  footColumn: {
    flex: 1,
    alignItems: 'center',
  },
  footLabel: {
    ...FONTS.bodySmall,
    color: COLORS.neutral.medium,
    marginBottom: 8,
    fontWeight: '600',
  },
  barContainer: {
    width: '100%',
    height: 120,
    justifyContent: 'flex-end',
  },
  barBackground: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.surface.secondary,
    borderRadius: 8,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  barFill: {
    width: '100%',
    borderRadius: 8,
  },
  barLeft: {
    backgroundColor: COLORS.primary,
  },
  barRight: {
    backgroundColor: COLORS.accent,
  },
  percentage: {
    ...FONTS.h3,
    color: COLORS.neutral.dark,
    marginTop: 8,
    fontWeight: '700',
  },
  centerColumn: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  asymmetryCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.surface.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: COLORS.warning,
  },
  asymmetryValue: {
    ...FONTS.h3,
    color: COLORS.warning,
    fontWeight: '700',
  },
  asymmetryLabel: {
    ...FONTS.caption,
    color: COLORS.neutral.medium,
    marginTop: 2,
  },
  symmetryScore: {
    alignItems: 'center',
  },
  symmetryLabel: {
    ...FONTS.caption,
    color: COLORS.neutral.medium,
    marginBottom: 4,
  },
  symmetryValue: {
    ...FONTS.body,
    color: COLORS.success,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.surface.tertiary,
  },
  footerText: {
    ...FONTS.caption,
    color: COLORS.neutral.medium,
    flex: 1,
    lineHeight: 16,
  },
});

export default GaitAsymmetryWidget;

