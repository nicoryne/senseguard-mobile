import React from 'react';
import {
  ActivityIndicator,
  GestureResponderEvent,
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { COLORS } from '../../lib/colors';
import { FONTS } from '../../lib/fonts';
import { DESIGN_TOKENS } from '../../lib/design-tokens';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type Variant = 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
type Size = 'small' | 'medium' | 'large';

interface ButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled,
  loading,
  icon,
  fullWidth = false,
}) => {
  const isDisabled = disabled || loading;
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const handlePressIn = () => {
    if (!isDisabled) {
      scale.value = withSpring(0.96, {
        damping: 15,
        stiffness: 300,
      });
      opacity.value = withTiming(0.85, {
        duration: DESIGN_TOKENS.animation.fast,
      });
    }
  };

  const handlePressOut = () => {
    if (!isDisabled) {
      scale.value = withSpring(1, {
        damping: 15,
        stiffness: 300,
      });
      opacity.value = withTiming(1, {
        duration: DESIGN_TOKENS.animation.fast,
      });
    }
  };

  const handlePress = (event: GestureResponderEvent) => {
    if (!isDisabled && !loading) {
      onPress(event);
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { height: 40, paddingHorizontal: 16, fontSize: 14 };
      case 'large':
        return { height: 56, paddingHorizontal: 24, fontSize: 18 };
      default:
        return { height: 52, paddingHorizontal: 20, fontSize: 16 };
    }
  };

  const sizeStyles = getSizeStyles();

  const renderContent = () => {
    if (loading) {
      return (
        <ActivityIndicator
          color={variant === 'outline' || variant === 'ghost' ? COLORS.primary : '#FFFFFF'}
          size="small"
        />
      );
    }

    return (
      <>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <Text
          style={[
            styles.text,
            { fontSize: sizeStyles.fontSize },
            variant === 'outline' && styles.textOutline,
            variant === 'ghost' && styles.textGhost,
            variant === 'danger' && styles.textDanger,
          ]}
        >
          {title}
        </Text>
      </>
    );
  };

  const buttonContent = (
    <View style={[styles.content, { gap: icon ? 8 : 0 }]}>
      {renderContent()}
    </View>
  );

  if (variant === 'primary' || variant === 'secondary') {
    const gradientColors =
      variant === 'primary'
        ? DESIGN_TOKENS.colors.primary.gradient
        : DESIGN_TOKENS.colors.accent.gradient;

    return (
      <AnimatedPressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        disabled={isDisabled}
        style={[
          styles.container,
          fullWidth && styles.fullWidth,
          isDisabled && styles.disabled,
          animatedStyle,
        ]}
      >
        <LinearGradient
          colors={isDisabled ? ['#9CA3AF', '#9CA3AF'] : gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[
            styles.gradient,
            {
              height: sizeStyles.height,
              paddingHorizontal: sizeStyles.paddingHorizontal,
              borderRadius: DESIGN_TOKENS.radius.lg,
            },
            DESIGN_TOKENS.shadows.md,
          ]}
        >
          {buttonContent}
        </LinearGradient>
      </AnimatedPressable>
    );
  }

  return (
    <AnimatedPressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      disabled={isDisabled}
      style={[
        styles.base,
        styles[variant],
        {
          height: sizeStyles.height,
          paddingHorizontal: sizeStyles.paddingHorizontal,
          borderRadius: DESIGN_TOKENS.radius.lg,
        },
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
        (variant === 'primary' || variant === 'danger') && DESIGN_TOKENS.shadows.md,
        animatedStyle,
      ]}
    >
      {buttonContent}
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  gradient: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: 0,
  },
  primary: {
    backgroundColor: COLORS.primary,
  },
  secondary: {
    backgroundColor: COLORS.accent,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  danger: {
    backgroundColor: COLORS.error,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  disabled: {
    opacity: 0.5,
  },
  fullWidth: {
    width: '100%',
  },
  text: {
    ...FONTS.button,
    color: COLORS.neutral.lightest,
    fontWeight: '600',
  },
  textOutline: {
    color: COLORS.primary,
  },
  textGhost: {
    color: COLORS.primary,
  },
  textDanger: {
    color: COLORS.neutral.lightest,
  },
});

export default Button;



