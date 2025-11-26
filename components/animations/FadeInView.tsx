import React, { useEffect } from 'react';
import { View, ViewProps } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeInLeft,
  FadeInRight,
} from 'react-native-reanimated';

import { DESIGN_TOKENS } from '../../lib/design-tokens';

interface FadeInViewProps extends ViewProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  distance?: number;
}

const FadeInView: React.FC<FadeInViewProps> = ({
  children,
  delay = 0,
  duration = DESIGN_TOKENS.animation.normal,
  direction = 'fade',
  distance = 20,
  style,
  ...props
}) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(direction === 'up' ? distance : direction === 'down' ? -distance : 0);
  const translateX = useSharedValue(direction === 'left' ? distance : direction === 'right' ? -distance : 0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration });
    translateY.value = withTiming(0, { duration });
    translateX.value = withTiming(0, { duration });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateY: translateY.value },
      { translateX: translateX.value },
    ],
  }));

  const enteringAnimation = (() => {
    switch (direction) {
      case 'up':
        return FadeInUp.delay(delay).duration(duration);
      case 'down':
        return FadeInDown.delay(delay).duration(duration);
      case 'left':
        return FadeInLeft.delay(delay).duration(duration);
      case 'right':
        return FadeInRight.delay(delay).duration(duration);
      default:
        return FadeIn.delay(delay).duration(duration);
    }
  })();

  return (
    <Animated.View
      entering={enteringAnimation}
      style={[animatedStyle, style]}
      {...props}
    >
      {children}
    </Animated.View>
  );
};

export default FadeInView;

