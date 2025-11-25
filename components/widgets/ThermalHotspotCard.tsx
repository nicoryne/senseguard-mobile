import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { COLORS } from '../../lib/colors';
import { FONTS } from '../../lib/fonts';
import ThermalChart from '../charts/ThermalChart';

interface Hotspot {
  location: string;
  temperature: number;
  baseline: number;
  severity: 'low' | 'moderate' | 'high' | 'critical';
}

interface ThermalHotspotCardProps {
  leftFootTemp?: number;
  rightFootTemp?: number;
  hotspots?: Hotspot[];
  baselineTemp?: number;
}

const ThermalHotspotCard: React.FC<ThermalHotspotCardProps> = ({
  leftFootTemp = 32.5,
  rightFootTemp = 33.2,
  hotspots = [
    {
      location: 'Ball of foot',
      temperature: 34.8,
      baseline: 32.5,
      severity: 'high',
    },
  ],
  baselineTemp = 32.5,
}) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return COLORS.error;
      case 'high':
        return COLORS.warning;
      case 'moderate':
        return '#FBBF24';
      default:
        return COLORS.success;
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'alert-circle';
      case 'high':
        return 'warning';
      case 'moderate':
        return 'information-circle';
      default:
        return 'checkmark-circle';
    }
  };

  const tempDeviation = (temp: number) => temp - baselineTemp;
  const hasHotspots = hotspots && hotspots.length > 0;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Ionicons name="thermometer" size={20} color={COLORS.error} />
          <Text style={styles.title}>Heat & Pressure</Text>
        </View>
        {hasHotspots && (
          <View style={styles.alertBadge}>
            <Ionicons name="flame" size={16} color={COLORS.error} />
            <Text style={styles.alertText}>{hotspots.length} Hotspot{hotspots.length !== 1 ? 's' : ''}</Text>
          </View>
        )}
      </View>

      {/* Temperature Readings */}
      <View style={styles.tempContainer}>
        <View style={styles.tempItem}>
          <Text style={styles.tempLabel}>Left Foot</Text>
          <View style={styles.tempValueContainer}>
            <Text style={styles.tempValue}>{leftFootTemp.toFixed(1)}°C</Text>
            <View
              style={[
                styles.tempIndicator,
                tempDeviation(leftFootTemp) > 1
                  ? { backgroundColor: COLORS.warning }
                  : { backgroundColor: COLORS.success },
              ]}
            />
          </View>
          {tempDeviation(leftFootTemp) > 1 && (
            <Text style={styles.tempDeviation}>
              +{tempDeviation(leftFootTemp).toFixed(1)}°C from baseline
            </Text>
          )}
        </View>

        <View style={styles.tempItem}>
          <Text style={styles.tempLabel}>Right Foot</Text>
          <View style={styles.tempValueContainer}>
            <Text style={styles.tempValue}>{rightFootTemp.toFixed(1)}°C</Text>
            <View
              style={[
                styles.tempIndicator,
                tempDeviation(rightFootTemp) > 1
                  ? { backgroundColor: COLORS.warning }
                  : { backgroundColor: COLORS.success },
              ]}
            />
          </View>
          {tempDeviation(rightFootTemp) > 1 && (
            <Text style={styles.tempDeviation}>
              +{tempDeviation(rightFootTemp).toFixed(1)}°C from baseline
            </Text>
          )}
        </View>
      </View>

      {/* Thermal Chart */}
      <View style={styles.chartContainer}>
        <ThermalChart />
      </View>

      {/* Hotspots List */}
      {hasHotspots && (
        <View style={styles.hotspotsContainer}>
          <Text style={styles.hotspotsTitle}>Detected Hotspots</Text>
          {hotspots.map((hotspot, index) => {
            const severityColor = getSeverityColor(hotspot.severity);
            return (
              <View key={index} style={styles.hotspotItem}>
                <View style={[styles.hotspotIcon, { backgroundColor: `${severityColor}15` }]}>
                  <Ionicons
                    name={getSeverityIcon(hotspot.severity) as any}
                    size={20}
                    color={severityColor}
                  />
                </View>
                <View style={styles.hotspotContent}>
                  <Text style={styles.hotspotLocation}>{hotspot.location}</Text>
                  <Text style={styles.hotspotTemp}>
                    {hotspot.temperature.toFixed(1)}°C (baseline: {hotspot.baseline.toFixed(1)}°C)
                  </Text>
                  <Text style={[styles.hotspotWarning, { color: severityColor }]}>
                    ⚠️ Invisible warning sign of forming ulcer
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      )}

      <View style={styles.footer}>
        <Ionicons name="information-circle-outline" size={16} color={COLORS.neutral.medium} />
        <Text style={styles.footerText}>
          Sensors detect friction spikes and temperature rises that don't match baseline
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
    borderLeftColor: COLORS.error,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
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
  alertBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${COLORS.error}15`,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
  },
  alertText: {
    ...FONTS.caption,
    color: COLORS.error,
    fontWeight: '600',
  },
  tempContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  tempItem: {
    flex: 1,
  },
  tempLabel: {
    ...FONTS.bodySmall,
    color: COLORS.neutral.medium,
    marginBottom: 8,
  },
  tempValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tempValue: {
    ...FONTS.h3,
    color: COLORS.neutral.dark,
    fontWeight: '700',
  },
  tempIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  tempDeviation: {
    ...FONTS.caption,
    color: COLORS.warning,
    marginTop: 4,
  },
  chartContainer: {
    marginBottom: 16,
  },
  hotspotsContainer: {
    marginBottom: 16,
  },
  hotspotsTitle: {
    ...FONTS.body,
    color: COLORS.neutral.dark,
    fontWeight: '600',
    marginBottom: 12,
  },
  hotspotItem: {
    flexDirection: 'row',
    gap: 12,
    padding: 12,
    backgroundColor: COLORS.surface.secondary,
    borderRadius: 12,
    marginBottom: 8,
  },
  hotspotIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hotspotContent: {
    flex: 1,
  },
  hotspotLocation: {
    ...FONTS.body,
    color: COLORS.neutral.dark,
    fontWeight: '600',
    marginBottom: 4,
  },
  hotspotTemp: {
    ...FONTS.bodySmall,
    color: COLORS.neutral.medium,
    marginBottom: 4,
  },
  hotspotWarning: {
    ...FONTS.caption,
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

export default ThermalHotspotCard;

