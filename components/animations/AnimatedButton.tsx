import React from 'react';
import { Pressable, PressableProps, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { DESIGN_TOKENS } from '../../lib/design-tokens';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface AnimatedButtonProps extends PressableProps {
  children: React.ReactNode;
  scaleValue?: number;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  scaleValue = 0.95,
  style,
  onPressIn,
  onPressOut,
  ...props
}) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const handlePressIn = (e: any) => {
    scale.value = withSpring(scaleValue, {
      damping: 15,
      stiffness: 300,
    });
    opacity.value = withTiming(0.8, {
      duration: DESIGN_TOKENS.animation.fast,
    });
    onPressIn?.(e);
  };

  const handlePressOut = (e: any) => {
    scale.value = withSpring(1, {
      damping: 15,
      stiffness: 300,
    });
    opacity.value = withTiming(1, {
      duration: DESIGN_TOKENS.animation.fast,
    });
    onPressOut?.(e);
  };

  return (
    <AnimatedPressable
      style={[animatedStyle, style]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      {...props}
    >
      {children}
    </AnimatedPressable>
  );
};

export default AnimatedButton;

