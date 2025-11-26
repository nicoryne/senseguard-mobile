import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { COLORS } from '../../lib/colors';
import { FONTS } from '../../lib/fonts';
import { DESIGN_TOKENS } from '../../lib/design-tokens';

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon?: React.ComponentProps<typeof Ionicons>['name'];
  color?: 'primary' | 'accent' | 'success' | 'warning' | 'error';
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string;
  subtitle?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  unit,
  icon = 'stats-chart',
  color = 'primary',
  trend,
  trendValue,
  subtitle,
}) => {
  const colorConfig = {
    primary: {
      main: COLORS.primary,
      light: DESIGN_TOKENS.colors.primary.light,
      gradient: DESIGN_TOKENS.colors.primary.gradient,
      bg: 'rgba(73, 130, 187, 0.08)',
    },
    accent: {
      main: COLORS.accent,
      light: DESIGN_TOKENS.colors.accent.light,
      gradient: DESIGN_TOKENS.colors.accent.gradient,
      bg: 'rgba(231, 163, 141, 0.08)',
    },
    success: {
      main: COLORS.success,
      light: DESIGN_TOKENS.colors.success.light,
      gradient: DESIGN_TOKENS.colors.success.gradient,
      bg: 'rgba(16, 185, 129, 0.08)',
    },
    warning: {
      main: COLORS.warning,
      light: DESIGN_TOKENS.colors.warning.light,
      gradient: DESIGN_TOKENS.colors.warning.gradient,
      bg: 'rgba(245, 158, 11, 0.08)',
    },
    error: {
      main: COLORS.error,
      light: DESIGN_TOKENS.colors.error.light,
      gradient: DESIGN_TOKENS.colors.error.gradient,
      bg: 'rgba(239, 68, 68, 0.08)',
    },
  };

  const config = colorConfig[color];

  return (
    <Animated.View
      entering={FadeInDown.duration(DESIGN_TOKENS.animation.normal)}
      style={[styles.card, DESIGN_TOKENS.shadows.md]}
    >
      <LinearGradient
        colors={[config.bg, 'transparent']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <View style={[styles.iconContainer, { backgroundColor: config.bg }]}>
            <Ionicons name={icon} size={22} color={config.main} />
          </View>
          <Text style={styles.title}>{title}</Text>
        </View>

        <View style={styles.valueContainer}>
          <Text style={[styles.value, { color: config.main }]}>
            {value}
            {unit && <Text style={styles.unit}> {unit}</Text>}
          </Text>
          {trend && trendValue && (
            <View style={styles.trendContainer}>
              <Ionicons
                name={trend === 'up' ? 'trending-up' : trend === 'down' ? 'trending-down' : 'remove'}
                size={16}
                color={trend === 'up' ? COLORS.success : trend === 'down' ? COLORS.error : COLORS.neutral.medium}
              />
              <Text
                style={[
                  styles.trendText,
                  {
                    color:
                      trend === 'up'
                        ? COLORS.success
                        : trend === 'down'
                        ? COLORS.error
                        : COLORS.neutral.medium,
                  },
                ]}
              >
                {trendValue}
              </Text>
            </View>
          )}
        </View>

        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: COLORS.surface.background,
    borderRadius: DESIGN_TOKENS.radius.xl,
    padding: DESIGN_TOKENS.spacing.base,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.surface.tertiary,
  },
  gradient: {
    borderRadius: DESIGN_TOKENS.radius.xl,
    padding: DESIGN_TOKENS.spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: DESIGN_TOKENS.spacing.md,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: DESIGN_TOKENS.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: DESIGN_TOKENS.spacing.sm,
  },
  title: {
    ...FONTS.bodySmall,
    color: COLORS.neutral.medium,
    fontWeight: '600',
    flex: 1,
  },
  valueContainer: {
    marginBottom: DESIGN_TOKENS.spacing.xs,
  },
  value: {
    ...FONTS.h2,
    fontWeight: '700',
    marginBottom: DESIGN_TOKENS.spacing.xs,
  },
  unit: {
    ...FONTS.bodySmall,
    color: COLORS.neutral.medium,
    fontWeight: '400',
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  trendText: {
    ...FONTS.caption,
    fontWeight: '600',
  },
  subtitle: {
    ...FONTS.caption,
    color: COLORS.neutral.medium,
    marginTop: DESIGN_TOKENS.spacing.xs,
  },
});

export default MetricCard;



