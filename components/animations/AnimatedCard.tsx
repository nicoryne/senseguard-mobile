import React, { useEffect } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  FadeInDown,
  FadeInUp,
} from 'react-native-reanimated';

import { DESIGN_TOKENS } from '../../lib/design-tokens';

interface AnimatedCardProps {
  children: React.ReactNode;
  delay?: number;
  style?: ViewStyle;
  direction?: 'up' | 'down';
  onPress?: () => void;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  delay = 0,
  style,
  direction = 'up',
  onPress,
}) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, {
      duration: DESIGN_TOKENS.animation.normal,
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const handlePressIn = () => {
    if (onPress) {
      scale.value = withSpring(0.98, {
        damping: 15,
        stiffness: 300,
      });
    }
  };

  const handlePressOut = () => {
    if (onPress) {
      scale.value = withSpring(1, {
        damping: 15,
        stiffness: 300,
      });
    }
  };

  const enteringAnimation = direction === 'up' ? FadeInUp : FadeInDown;

  return (
    <Animated.View
      entering={enteringAnimation.delay(delay).duration(DESIGN_TOKENS.animation.normal)}
      style={[styles.container, animatedStyle, style]}
      onTouchStart={handlePressIn}
      onTouchEnd={handlePressOut}
    >
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    // Container styles handled by children
  },
});

export default AnimatedCard;

