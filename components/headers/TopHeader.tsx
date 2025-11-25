import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Button from '../ui/Button';
import Logo from '../ui/Logo';
import { COLORS } from '../../lib/colors';
import { FONTS } from '../../lib/fonts';

interface Props {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onActionPress?: () => void;
  showLogo?: boolean;
  backgroundType?: 'light' | 'dark';
}

const TopHeader: React.FC<Props> = ({
  title,
  subtitle,
  actionLabel,
  onActionPress,
  showLogo = false,
  backgroundType = 'light',
}) => {
  const isDark = backgroundType === 'dark';
  const logoVariant = isDark ? 'transparent' : 'default';
  const titleColor = isDark ? COLORS.neutral.lightest : COLORS.neutral.dark;
  const subtitleColor = isDark ? 'rgba(255, 255, 255, 0.7)' : COLORS.neutral.medium;

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <View style={styles.leftSection}>
        {showLogo && (
          <View style={styles.logoContainer}>
            <Logo size={40} variant={logoVariant} />
          </View>
        )}
        <View>
          <Text style={[styles.title, { color: titleColor }]}>{title}</Text>
          {subtitle ? <Text style={[styles.subtitle, { color: subtitleColor }]}>{subtitle}</Text> : null}
        </View>
      </View>
      {actionLabel && onActionPress ? (
        <Button title={actionLabel} onPress={onActionPress} variant="outline" />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingTop: 24,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  containerDark: {
    backgroundColor: COLORS.primary,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  logoContainer: {
    marginRight: 4,
  },
  title: {
    ...FONTS.h2,
  },
  subtitle: {
    ...FONTS.bodySmall,
    marginTop: 4,
  },
});

export default TopHeader;



